import React from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import {
    Container,
    UserInput,
} from './styles';

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name']
}

export function Input({ iconName, ...rest }: Props) {
    const theme = useTheme();
    
    return (
        <Container>
            <Feather
                name={iconName}
                size={24}
                color={theme.colors.shape}
            />
            <UserInput
                placeholderTextColor={theme.colors.shape}
                {...rest}
            />
        </Container>
    )
}