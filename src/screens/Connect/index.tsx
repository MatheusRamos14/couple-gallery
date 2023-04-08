import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, ToastAndroid } from 'react-native';
import { useTheme } from 'styled-components/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Feather } from '@expo/vector-icons';
import * as Yup from 'yup';
import database from '@react-native-firebase/database';

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
    const { } = usePhoto();

    const theme = useTheme();

    async function handleCreateCouple() {
        try {
            const data = { userID };

            const createCoupleSchema = Yup.object({
                userID: Yup.string()
                    .required("O campo é obrigatório")
                    .not([user.user_id], "Não é permitido usar o seu próprio ID")
            })

            await createCoupleSchema.validate(data);

            // await handleUserRegister(data);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                console.log(error.message);
            } else {
                const err = error as any;
                console.log(err)
                if (err.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (err.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
            }
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
            const usersCouples = Object.entries(snapshot.val()).map(([key, value]) => {
                const couple = value as ICouple;
                couple.couple_id = key;
                return couple;
            });
            
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
                    />

                    <Button
                        disabled={waiting}
                        style={{ opacity: !waiting ? 1 : 0.6 }}
                        activeOpacity={0.7}
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
                                status={!waiting ? item.users.confirmed[user.user_id] as boolean | "" : false}
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