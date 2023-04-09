import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Keyboard, ToastAndroid } from 'react-native';
import { useTheme } from 'styled-components/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Feather } from '@expo/vector-icons';
import * as Yup from 'yup';
import database from '@react-native-firebase/database';
import { v4 as uuidv4 } from 'uuid';

import { usePhoto } from '../../hooks/usePhotos';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/Input';
import {
    Container,
    KeyboardAvoid,
    Form,
    Title,
    Copy,
    Strong,
    Button,
    Label,
    HistoryTitle,
    Empty,
} from './styles';
import { CoupleCard } from '../../components/CoupleCard';

export type ICouple = {
    users: {
        confirmed: any,
    },
    couple_id: string
}

export function Connect() {
    const [userID, setUserID] = useState('');
    const [couples, setCouples] = useState<ICouple[]>([]);
    const [waiting, setWaiting] = useState<boolean>(false);

    const { user } = useAuth();

    const theme = useTheme();

    async function validate() {
        try {
            const data = { userID };

            const createCoupleSchema = Yup.object({
                userID: Yup.string()
                    .required("O campo é obrigatório")
                    .not([user.user_id], "Não é permitido usar o seu próprio ID")
            })

            await createCoupleSchema.validate(data);

            const usersCollection = database().ref("users").child(userID);
            const userExists = (await usersCollection.once("value")).exists()
            if (!userExists) {
                Alert.alert("Ops", "Usuário não encontrado")
                return false;
            }

            const alreadyExists = couples.find(couple => {
                const IDS = Object.keys(couple.users.confirmed);

                console.log("IDS", IDS)
                return IDS.includes(userID)
            })
            if (alreadyExists) {
                Alert.alert("Ops", "Já existe uma solicitação para esse usuário")
                return false;
            }

            // await handleUserRegister(data);
            return true;
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                console.log(error.message);
            } else {
                const err = error as any;
                console.log(err)
            }
            return false
        }
    }

    async function handleCreateCouple() {
        try {
            const valid = await validate();
            if (!valid) return;

            const coupleID = uuidv4();
            const coupleCollection = database().ref('couples');

            await coupleCollection.update({
                [coupleID]: {
                    users: {
                        [user.user_id]: true,
                        [userID]: true,
                        confirmed: {
                            [user.user_id]: true,
                            [userID]: ""
                        }
                    }
                }
            })

            console.log("CRIADO")
        } catch (error) {
            const err = error as any;
            console.log(err)
        }
    }

    async function handleDeny(couple_id: string) {
        try {
            const coupleCollection = database().ref('couples').child(`${couple_id}/users/confirmed`);

            await coupleCollection.update({
                [user.user_id]: false                
            })
        } catch (error) {
            const err = error as any;
            console.log(err)
        }
    }

    async function handleAccept(couple_id: string) {
        try {
            const usersCollection = database().ref('users');
            const coupleCollection = database().ref('couples').child(`${couple_id}/users/confirmed`);

            const coupleIDS = Object.keys((await coupleCollection.once('value')).val());
            const coupleUserID = coupleIDS.find(id => id !== user.user_id);

            await coupleCollection.update({
                [user.user_id]: true                
            })

            await usersCollection.child(coupleUserID!)
            .update({ couple_id });

            await usersCollection.child(user.user_id!)
            .update({ couple_id });
        } catch (error) {
            const err = error as any;
            console.log(err)
        }
    }

    function handleCopy() {
        Clipboard.setString(user.user_id);
        ToastAndroid.showWithGravity(
            "Copiado para área de transferência",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        )
    }

    useEffect(() => {
        const coupleCollection = database().ref('couples')
        const couplesQuery = coupleCollection.orderByChild("users/" + user.user_id).equalTo(true);

        const onValue = couplesQuery.on('value', snapshot => {
            if (!(snapshot.exists())) return;

            const usersCouples = Object.entries(snapshot.val()).map(([key, value]) => {
                const couple = value as ICouple;
                couple.couple_id = key;
                return couple;
            });

            const hasConfirmed = usersCouples.find(couple => couple.users.confirmed[user.user_id] === true);
            if (hasConfirmed) setWaiting(true);
            else setWaiting(false);

            setCouples(usersCouples);
        })

        return () => {
            couplesQuery.off("value", onValue)
        };
    }, [])

    return (
        <KeyboardAvoid onPress={Keyboard.dismiss}>
            <Container>
                <Form>
                    <Title>
                        Seu ID:{'\n'}
                        <Copy onPress={handleCopy}>
                            <Strong>
                                {user.user_id}
                                {'  '}
                                <Feather
                                    name="copy"
                                    size={20}
                                />
                            </Strong>
                        </Copy>
                    </Title>
                    <Input
                        iconName='user'
                        placeholder='Cole aqui o ID do seu par'
                        value={userID}
                        onChangeText={setUserID}
                    />

                    <Button
                        disabled={waiting}
                        style={{ opacity: !waiting ? 1 : 0.6 }}
                        activeOpacity={0.7}
                        onPress={handleCreateCouple}
                    >
                        <Label>
                            Vincular
                        </Label>
                    </Button>


                    <HistoryTitle>
                        Solicitações
                    </HistoryTitle>

                    <FlatList
                        data={couples}
                        keyExtractor={item => item.couple_id}
                        renderItem={({ item }) => (
                            <CoupleCard
                                couple={item}
                                status={item.users.confirmed[user.user_id] as boolean | ""}
                                disabled={waiting}
                                handleDeny={handleDeny}
                                handleAccept={handleAccept}
                            />
                        )}
                        ListEmptyComponent={() => (
                            <Empty>
                                Nenhuma solicitação encontrada!
                            </Empty>
                        )}
                    />
                </Form>
            </Container>
        </KeyboardAvoid>
    )
}