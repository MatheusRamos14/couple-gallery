import React from 'react';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import {
    Container,
    Avatar,
    Photo,
    Content,
    Greetings,
    EditInfo,
} from './styles';

interface Props {
    photoURL?: string;
    username: string;
    greetings?: boolean;
}

export function ProfileInfo({
    photoURL,
    username,
    greetings = true,
}: Props) {
    const theme = useTheme();

    return (
        <Container>
            <Avatar>
                {photoURL ? (
                    <Photo
                        source={{ uri: photoURL }}
                    />
                ) : (
                    <Feather
                        name="camera"
                        color={theme.colors.main}
                        size={32}
                    />
                )}
            </Avatar>

            {greetings && (
                <Content>
                    <Greetings>
                        Hello{username && ', ' + username}!{'\n'}
                        <EditInfo>
                            Click to edit profile
                        </EditInfo>
                    </Greetings>
                </Content>
            )}
        </Container>
    )
}