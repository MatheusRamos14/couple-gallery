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
}

export function ProfileInfo({ photoURL, username }: Props) {
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

            <Content>
                <Greetings>
                    Hello{username && ', ' + username}!{'\n'}
                    <EditInfo>
                        Click to edit profile
                    </EditInfo>
                </Greetings>
            </Content>
        </Container>
    )
}