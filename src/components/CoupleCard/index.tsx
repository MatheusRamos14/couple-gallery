import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { ICouple } from '../../screens/Connect';
import {
    Container,
    Title,
    Buttons,
    Button
} from './styles';

interface Props {
    couple: ICouple;
    status: boolean | "";
    disabled: boolean;
    handleDeny: (couple_id: string) => Promise<void>;
    handleAccept: (couple_id: string) => Promise<void>;
}

export function CoupleCard({
    couple, 
    status, 
    disabled,
    handleDeny,
    handleAccept
}: Props) {
    const theme = useTheme();

    return (
        <Container style={{ elevation: 5 }}>
            <Title>
                {couple.couple_id}
            </Title>

            <Buttons status={status}>
                {(status === "" || status === true) && (
                    <Button
                        type="confirm"
                        disabled={disabled || !(status === "")}
                        style={{ opacity: (!disabled || status === "") ? 1 : 0.6 }}
                        onPress={() => { handleAccept(couple.couple_id) }}
                    >
                        <Feather
                            name="check"
                            size={24}
                            color={theme.colors.shape}
                        />
                    </Button>
                )}

                {(status === "" || status === false) && (
                    <Button
                        type="deny"
                        disabled={disabled || !(status === "")}
                        style={{ opacity: (!disabled || status === "")  ? 1 : 0.6 }}
                        onPress={() => { handleDeny(couple.couple_id) }}
                    >
                        <Feather
                            name="x"
                            size={24}
                            color={theme.colors.shape}
                        />
                    </Button>
                )}

            </Buttons>
        </Container>
    )
}