import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.ImageBackground`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.secondary_light};

    align-items: center;
    justify-content: center;

    padding: 0 20px;
`;

export const Form = styled.View`
    width: 100%;
    background-color: ${({ theme }) => `${theme.colors.secondary_light}95`};
    border-radius: 30px;

    padding: 24px;
    padding-top: 80px;
`;

export const Avatar = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    width: 128px;
    height: 128px;
    background-color: ${({ theme }) => theme.colors.shape};

    border-radius: 64px;
    border-width: 4px;
    border-color: ${({ theme }) => theme.colors.secondary_light};

    align-items: center;
    justify-content: center;

    position: absolute;
    align-self: center;
    top: -64px;
`;

export const UserAvatar = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 128px;
`;

export const SwitchContainer = styled.View`
    align-self: center;
    flex-direction: row;

    margin: 20px 0;
`;

export const Label = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(13)}px;
`;

export const Strong = styled.Text`
    color: ${({ theme }) => theme.colors.main};
    font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`    
    border-radius: 100px;
    background-color: ${({ theme }) => theme.colors.shape};

    align-self: center;
    align-items: center;
    justify-content: center;

    padding: 4px 54px;
`;

export const ButtonLabel = styled.Text`
    color: ${({ theme }) => theme.colors.main};
    font-family: ${({ theme }) => theme.fonts.primary_600};
    font-size: ${RFValue(14)}px;
`;

export const KeyboardAvoid = styled.TouchableWithoutFeedback`
    flex: 1;
`;