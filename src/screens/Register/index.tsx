import React from 'react';

import {
    Container,
    Header,
    Logo,
    Title,
    RegisterArea,
    RegisterText,
    RegisterButton,
    RegisterLabel,
    Form,
    SignInButton,
    SignInLabel,
    ForgotPassword,
} from './styles';

export function Register() {
    return (
        <Container>
            <Header>
                <Logo />
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
            <Form>
                {/* <Input
                    iconName="mail"
                    placeholder="E-mail"
                /> */}

                {/* <Input
                    iconName="lock"
                    placeholder="Password"
                /> */}

                <SignInButton>
                    <SignInLabel>

                    </SignInLabel>
                </SignInButton>

                <ForgotPassword>
                    Forgot your password?
                </ForgotPassword>
            </Form>
        </Container>
    )
}