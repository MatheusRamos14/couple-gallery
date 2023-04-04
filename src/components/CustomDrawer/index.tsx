import React from 'react';
import {
    DrawerContentScrollView,
    DrawerContentComponentProps,
    DrawerNavigationProp
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { useAuth } from '../../hooks/useAuth';
import { ProfileInfo } from '../ProfileInfo';
import { MainDrawer } from '../../routes/main.drawer';
import {
    Container,
    ItemContainer,
    ItemLabel,
} from './styles';

type Screens = keyof MainDrawer

export function CustomDrawerContent(props: DrawerContentComponentProps) {
    const theme = useTheme();
    const { user } = useAuth();

    const navigation = useNavigation<DrawerNavigationProp<MainDrawer>>();

    const handleDrawerItemClick = (screenName: Screens) => {
        navigation.navigate(screenName);
        props.navigation.closeDrawer();
    };

    return (
        <Container>
            <DrawerContentScrollView {...props}>
                <ProfileInfo
                    photoURL={user.usuario_avatar}
                    username={user.usuario_nome}                    
                />

                <ItemContainer
                    onPress={() => handleDrawerItemClick('Feed')}
                >
                    <Feather
                        name="home"
                        size={24}
                        color={theme.colors.secondary_light}
                    />
                    <ItemLabel>Feed</ItemLabel>
                </ItemContainer>
                <ItemContainer
                    onPress={() => handleDrawerItemClick('Home')}
                >
                    <Feather
                        name="search"
                        size={24}
                        color={theme.colors.secondary_light}
                    />
                    <ItemLabel>Home</ItemLabel>
                </ItemContainer>
            </DrawerContentScrollView>
        </Container>
    );
};