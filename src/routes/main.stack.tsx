import React from 'react';
import {
    createStackNavigator,
    StackNavigationProp
} from '@react-navigation/stack';

import { MainDrawer } from './main.drawer';
import { Connect } from '../screens/Connect';
import { usePhoto } from '../hooks/usePhotos';

type MainStack = {
    MainDrawer: undefined;
    Connect: undefined;
}

export interface MainStackProps<T extends keyof MainStack> {
    navigation: StackNavigationProp<MainStack, T>
}

const { Navigator, Screen } = createStackNavigator<MainStack>();

export function MainStack() {
    const { hasCouple } = usePhoto();

    if (!hasCouple) return <Connect />

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="MainDrawer" component={MainDrawer} />
            {/* <Screen name="Connect" component={Connect} /> */}
        </Navigator>
    )
}