import React, { useState } from 'react';
import { Switch, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';

import background from '../../assets/background.png';


import { useAuth } from '../../hooks/useAuth';
import { AuthStackProps } from '../../routes/auth.route';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import {
    Container,
    Form,
    Avatar,
    UserAvatar,
    SwitchContainer,
    Label,
    Strong,
    Button,
    ButtonLabel,
    KeyboardAvoid,
} from './styles';

type Props = AuthStackProps<'SignUp'>;

export function SignUp({ navigation }: Props) {
    const { handleUserRegister } = useAuth();

    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [accept, setAccept] = useState<boolean>(false);

    async function handleSignUp() {
        try {
            const data = { name, email, password, confirm, accept, image };

            const signUpSchema = Yup.object({
                accept: Yup.boolean().isTrue('Por favor, aceite os termos'),
                confirm: Yup.string().required('O campo confirmar senha é obrigatório').equals([password], 'As senhas não coincidem'),
                password: Yup.string().required('O campo senha é obrigatório').min(6, 'A senha deve conter pelo menos 6 caracteres'),
                email: Yup.string().required('O campo email é obrigatório').email('Por favor, insira um e-mail válido'),
                name: Yup.string().required('O campo nome é obrigatório')
            })

            await signUpSchema.validate(data);

            await handleUserRegister(data);
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

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (result.canceled) return;

        setImage(result.assets[0].uri);
    };

    const theme = useTheme();

    return (
        <Container
            source={background}
            resizeMode='cover'
        >
            <KeyboardAvoid onPress={Keyboard.dismiss}>
                <Form>
                    <Avatar onPress={pickImage}>
                        {image === '' ?
                            <Feather
                                name="camera"
                                size={64}
                                color={theme.colors.secondary_light}
                            /> :
                            <UserAvatar
                                source={{ uri: image }}
                            />
                    }
                    </Avatar>

                    <Input
                        iconName='user'
                        placeholder='Username'
                        autoCapitalize='sentences'
                        value={name}
                        onChangeText={setName}
                    />

                    <Input
                        iconName='mail'
                        placeholder='E-mail'
                        value={email}
                        onChangeText={setEmail}
                    />

                    <PasswordInput
                        iconName='lock'
                        placeholder='Password'
                        value={password}
                        onChangeText={setPassword}
                    />

                    <PasswordInput
                        iconName='lock'
                        placeholder='Confirm password'
                        value={confirm}
                        onChangeText={setConfirm}
                    />

                    <SwitchContainer>
                        <Switch
                            value={accept}
                            onValueChange={setAccept}
                            trackColor={{
                                false: theme.colors.secondary_light,
                                true: theme.colors.main
                            }}
                            thumbColor={accept ? theme.colors.secondary_light : theme.colors.shape}
                        />

                        <Label>
                            I accept {' '}
                            <Strong>
                                Terms of use
                            </Strong>
                        </Label>
                    </SwitchContainer>


                    <Button onPress={handleSignUp}>
                        <ButtonLabel>
                            REGISTER NOW
                        </ButtonLabel>
                    </Button>
                </Form>
            </KeyboardAvoid>
        </Container>
    )
}