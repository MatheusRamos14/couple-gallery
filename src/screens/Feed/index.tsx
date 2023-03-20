import React, { useState } from 'react';
import { Button, Image } from 'react-native';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';

import {
    Container,
} from './styles';
import { MainDrawerProps } from '../../routes/main.route';

type Props = MainDrawerProps<'Feed'>

export function Feed({ navigation }: Props) {
    const [image, setImage] = useState<string | null>(null);
    
    async function handleUserSavePhoto() {
        try {
            if (!image) return;
            console.log("Iniciando salvamento da foto")
            
            const reference = storage().ref('avatars/deefb2f1-e4cb-4809-84f4-35f94a78a106/avatar.png'); 
            await reference.putFile(image, { contentType: 'image' })

            console.log("Arquivo salvo!")
        } catch (error) {
            console.log(error)
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (result.canceled) return;

        setImage(result.assets[0].uri);
    };

    const handleGetPhoto = async () => {
        const reference = storage().ref('images/github.png'); 

        const url = await reference.getDownloadURL();

        console.log(url)
    }

    const handleListPhotos = async () => {
        const reference = storage().ref('images'); 

        const list = await reference.list()
        
        console.log(list.items);
    }

    return (
        <Container>
            <Button
                title='Recuperar lista'
                onPress={handleListPhotos}
            />

            <Button
                title='Recuperar foto'
                onPress={handleGetPhoto}
            />

            <Button
                title='Salvar foto'
                onPress={handleUserSavePhoto}
                disabled={image === null}
            />

            <Button
                title='Escolher foto'
                onPress={pickImage}
            />

            {image && <Image source={{ uri: image }} />}
        </Container>
    )
}