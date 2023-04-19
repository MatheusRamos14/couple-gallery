import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.secondary_light};

    align-items: center;
    justify-content: center;

    padding: 0 8px;
`;

export const Form = styled.View`
    width: 100%;
    background-color: ${({ theme }) => `${theme.colors.shape}`};
    border-radius: 30px;

    padding: 0 24px;
    padding-bottom: 20px;
    padding-top: 12px;
`;

export const KeyboardAvoid = styled.TouchableWithoutFeedback`
    flex: 1;
`;

export const Title = styled.Text`
    text-align: center;

    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: #000;
`;

export const Copy = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`

`;

export const Strong = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.primary_600};
    color: ${({ theme }) => theme.colors.main};
`;

export const Button = styled(TouchableOpacity)`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.main};
    border-radius: 100px;

    align-items: center;
    justify-content: center;

    padding: 8px 0;
    margin-top: 28px;
`;

export const Label = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.primary_600};
    color: ${({ theme }) => theme.colors.shape};
`;

export const HistoryTitle = styled.Text`
    border-bottom-width: 0.5px;
    border-bottom-color: ${({ theme }) => theme.colors.shape_secondary};

    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.secondary_light};

    margin: 12px 0;
`;

export const Empty = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.shape_secondary};

    text-align: center;
`;