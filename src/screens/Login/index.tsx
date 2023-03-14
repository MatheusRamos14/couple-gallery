import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';

import background from '../../assets/background.png';
import Logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { AuthStackProps } from '../../routes/auth.route';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
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
    ForgotLabel
} from './styles';

type Props = AuthStackProps<'Login'>;

export function Login({ navigation }: Props) {
    const { handleUserSignIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleUserLogin() {
        try {
            const data = { email, password };
            const loginSchema = Yup.object({
                email: Yup.string()
                    .required('O campo e-mail é obrigatório')
                    .email('Por favor, insira um e-mail válido'),
                password: Yup.string()
                    .required('O campo senha é obrigatório')
                    .min(6, 'O campo senha deve ter pelo menos 6 caracteres')
            });

            await loginSchema.validate(data);

            await handleUserSignIn(data);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                console.log(error.message);
            } else {
                const err = error as any;
                console.log(err)
                if (err.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (err.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
            }

        }
    }

    function handleNavigateSignUp() {
        navigation.navigate('SignUp');
    }

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
                            <RegisterButton onPress={handleNavigateSignUp}>
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
                                value={email}
                                onChangeText={setEmail}
                            />

                            <PasswordInput
                                iconName="lock"
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                            />

                            <SignInButton onPress={handleUserLogin}>
                                <SignInLabel>
                                    Login
                                </SignInLabel>
                            </SignInButton>

                            <ForgotPassword>
                                <ForgotLabel>
                                    Forgot your password?
                                </ForgotLabel>
                            </ForgotPassword>
                        </Form>

                    </Main>
                </Main>
            </KeyboardWrapper>
        </Container >
    )
}