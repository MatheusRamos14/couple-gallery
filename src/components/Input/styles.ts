import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.main};
    border-radius: 100px;

    flex-direction: row;
    align-items: center;

    margin-top: 16px;
    padding: 12px;
`;

export const UserInput = styled.TextInput`
    width: 100%;

    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(16)}px;

    margin-left: 8px;
`;