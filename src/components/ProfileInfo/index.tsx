import React from 'react';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import {
    Container,
    Avatar,
    Photo,
    Content,
    Greetings,
    EditInfo,
} from './styles';
import { useAuth } from '../../hooks/useAuth';

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
    const { handleChangeAvatar } = useAuth();
    const theme = useTheme();

    const handleChangePicture = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.canceled) return;

        await handleChangeAvatar(result.assets[0].uri);
    }

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
                <Content onPress={handleChangePicture}>
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