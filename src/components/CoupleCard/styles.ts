import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface StatusProps {
    status: boolean | "";
}

interface ButtonProps {
    type: "confirm" | "deny"
}

export const Container = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.shape};
    

    border-width: 2px;
    border-radius: 50px;
    border-color: ${({ theme }) => `${theme.colors.shape_secondary}70`};

    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 12px;
    margin-bottom: 12px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.dark};

`;

export const Buttons = styled.View<StatusProps>`
    ${({ status }) => status === "" && css`
        width: 105px;
        justify-content: space-between;
    `}

    flex-direction: row;
    align-items: center;
`;

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})<ButtonProps>`
    width: 48px;
    height: 48px;
    background-color: ${({ theme, type }) => type === 'confirm' ? theme.colors.success : theme.colors.danger};
    border-radius: 24px;

    align-items: center;
    justify-content: center;
`;
