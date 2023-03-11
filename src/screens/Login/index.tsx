import React from 'react';
import { Keyboard } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import background from '../../assets/background.png';
import Logo from '../../assets/logo.svg';
import { Input } from '../../components/Input';
import {
    Container,
    KeyboardWrapper,
    Header,
    Title,
    RegisterArea,
    RegisterText,
    RegisterButton,
    RegisterLabel,
    Main,
    Form,
    SignInButton,
    SignInLabel,
    ForgotPassword,
} from './styles';

export function Login() {
    return (
        <Container
            source={background}
        >
            <KeyboardWrapper onPress={Keyboard.dismiss}>
                <Main>
                    <Header>
                        <Logo
                            width={RFValue(100)}
                            height={RFValue(78)}
                        />
                        <Title>
                            Couple Galery
                        </Title>

                        <RegisterArea>
                            <RegisterText>
                                Don't you have an account?
                            </RegisterText>
                            <RegisterButton>
                                <RegisterLabel>
                                    Sign Up
                                </RegisterLabel>
                            </RegisterButton>
                        </RegisterArea>
                    </Header>
                    <Main>
                        <Form
                            behavior='position'
                            keyboardVerticalOffset={220}
                        >
                            <Input
                                iconName="mail"
                                placeholder="E-mail"
                            />

                            <Input
                                iconName="lock"
                                placeholder="Password"
                            />

                            <SignInButton>
                                <SignInLabel>
                                    Login
                                </SignInLabel>
                            </SignInButton>

                            <ForgotPassword>
                                Forgot your password?
                            </ForgotPassword>
                        </Form>

                    </Main>
                </Main>
            </KeyboardWrapper>
        </Container >
    )
}