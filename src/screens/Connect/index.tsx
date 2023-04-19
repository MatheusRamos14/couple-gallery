import React, { useState } from 'react';
import { FlatList, Keyboard, ToastAndroid } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Feather } from '@expo/vector-icons';

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

import { useCouple } from '../../hooks/useCouple';

export function Connect() {
    const [userID, setUserID] = useState('');

    const { user } = useAuth();
    const {
        couples,
        handleCreateCouple,
        handleAccept,
        handleDeny,
        waiting
    } = useCouple();    

    function handleCopy() {
        Clipboard.setString(user.user_id);
        ToastAndroid.showWithGravity(
            "Copiado para área de transferência",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        )
    }

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
                        onPress={() => handleCreateCouple(userID)}
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