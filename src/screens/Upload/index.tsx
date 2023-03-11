import React from 'react';
import { Button } from 'react-native';
import database from '@react-native-firebase/database';
import { v4 as uuidV4 } from 'uuid';


import {
    Container,
} from './styles';

export function Upload() {
    async function handleSave() {
        try {
            const usersRef = database().ref('usuarios');

            const usuarios = [
                {
                    usuario_id: uuidV4(),
                    usuario_nome: 'Matheus Ramos',
                    usuario_email: 'matheusdasilvaramos10@gmail.com',
                    usuario_avatar: uuidV4(),
                    fotos: [
                        { foto_id: uuidV4(), foto_descricao: 'Amo esta foto.' },
                        { foto_id: uuidV4(), foto_descricao: 'Amo esta foto também.' }
                    ]
                },
                {
                    usuario_id: uuidV4(),
                    usuario_nome: 'Michele Costa',
                    usuario_email: 'peidodevaca4@gmail.com',
                    usuario_avatar: uuidV4(),
                    fotos: [
                        { foto_id: uuidV4(), foto_descricao: 'bla blum blum' },
                        { foto_id: uuidV4(), foto_descricao: 'cavalo manco' }
                    ]
                }
            ];

            await usersRef.set(usuarios);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <Button
                title="Salvar"
                onPress={handleSave}
            />
        </Container>
    )
}