import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

export const Container = styled.ImageBackground`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.secondary_light};
`;

export const KeyboardWrapper = styled.TouchableWithoutFeedback`
    flex: 1;
`;

export const Header = styled.View`
    flex: 1;
    background-color: transparent;

    align-items: center;
    justify-content: center;

    padding-top: ${getStatusBarHeight()}px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${RFValue(28)}px;
`;

export const RegisterArea = styled.View`
    margin-top: 32px;
`;

export const RegisterText = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(14)}px;
`;

export const RegisterButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7,
})`
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 100px;

    align-self: center;
    align-items: center;
    justify-content: center;

    padding: 4px 20px;
    margin-top: 4px;
`;

export const RegisterLabel = styled.Text`
    color: ${({ theme }) => theme.colors.main};
    font-family: ${({ theme }) => theme.fonts.primary_600};
    font-size: ${RFValue(14)}px;
`;

export const Main = styled.View`
    flex: 1;
`;

export const Form = styled.KeyboardAvoidingView.attrs({
    contentContainerStyle: {
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        paddingHorizontal: 24,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        paddingTop: 12,
    }
})`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.shape};
    border-top-right-radius: 100px;
    border-top-left-radius: 100px;

    align-items: center;

    padding: 0 24px;
    padding-top: 40px;
`

export const SignInButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    background-color: ${({ theme }) => theme.colors.main};
    border-radius: 100px;

    align-self: center;
    align-items: center;
    justify-content: center;

    padding: 4px 20px;
    margin-top: 32px;
`;

export const SignInLabel = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.primary_600};
    font-size: ${RFValue(18)}px;

`;

export const ForgotPassword = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    align-items: center;
    justify-content: center;
`;

export const ForgotLabel = styled.Text`
    color: ${({ theme }) => theme.colors.main};
    font-family: ${({ theme }) => theme.fonts.primary_600};
    font-size: ${RFValue(14)}px;

    margin: 16px;
`;
