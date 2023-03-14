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
    flex: 1;

    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(16)}px;

    margin-left: 8px;
`;

export const ToggleVisibility = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    margin-right: 8px;
`;