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
}

export function CoupleCard({ couple, status }: Props) {
    const theme = useTheme();

    return (
        <Container style={{ elevation: 5 }}>
            <Title>
                {couple.couple_id}
            </Title>

            <Buttons status={status}>
                {status === "" && (
                    <Button type="confirm">
                        <Feather
                            name="check"
                            size={24}
                            color={theme.colors.shape}
                        />
                    </Button>
                )}

                <Button
                    type="deny"
                    disabled={!(status === "")}
                    style={{ opacity: status === "" ? 1 : 0.6 }}
                >
                    <Feather
                        name="x"
                        size={24}
                        color={theme.colors.shape}
                    />
                </Button>
            </Buttons>
        </Container>
    )
}