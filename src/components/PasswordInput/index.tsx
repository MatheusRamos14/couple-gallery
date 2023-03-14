import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import {
    Container,
    UserInput,
    ToggleVisibility
} from './styles';

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name']
}

export function PasswordInput({ iconName, ...rest }: Props) {
    const [visibility, setVisibility] = useState<boolean>(true);
    const theme = useTheme();

    function handleToggleVisibility() {
        setVisibility(previous => !previous);
    }

    return (
        <Container>
            <Feather
                name={iconName}
                size={24}
                color={theme.colors.shape}
            />
            <UserInput
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry={visibility}
                placeholderTextColor={theme.colors.shape}
                {...rest}
            />

            <ToggleVisibility onPress={handleToggleVisibility}>
                <Feather
                    name={visibility ? 'eye' : 'eye-off'}
                    size={24}
                    color={theme.colors.shape}
                />
            </ToggleVisibility>
        </Container>
    )
}