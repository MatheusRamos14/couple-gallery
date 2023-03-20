import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;    
    justify-content: space-evenly;
    
    margin-bottom: 16px;
`;

export const Avatar = styled.View`
    width: 82px;
    height: 82px;

    border-radius: 41px;
    border-color: ${({ theme }) => theme.colors.secondary_light};
    border-width: 2px;

    align-items: center;
    justify-content: center;
`;

export const Photo = styled.Image`
    width: 90%;
    height: 90%;
    border-radius: 41px;
`;

export const Content = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})``;

export const Greetings = styled.Text`
    color: ${({ theme }) => theme.colors.main};
    font-size: ${RFValue(12)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};

    text-align: center;
`;

export const EditInfo = styled.Text`
    color: ${({ theme }) => theme.colors.main};
    font-size: ${RFValue(10)}px;
    font-family: ${({ theme }) => theme.fonts.primary_700};
`;