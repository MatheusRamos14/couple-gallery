import React from 'react';
import {
    createStackNavigator,
    StackNavigationProp
} from '@react-navigation/stack';

import { MainDrawer } from './main.drawer';
import { Connect } from '../screens/Connect';
import { CoupleProvider } from '../hooks/useCouple';
import { useAuth } from '../hooks/useAuth';

type MainStack = {
    MainDrawer: undefined;
    Connect: undefined;
}

export interface MainStackProps<T extends keyof MainStack> {
    navigation: StackNavigationProp<MainStack, T>
}

const { Navigator, Screen } = createStackNavigator<MainStack>();

export function MainStack() {
    const { hasCouple } = useAuth();

    if (!hasCouple) return (
        <CoupleProvider>
            <Connect />
        </CoupleProvider>
    )

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="MainDrawer" component={MainDrawer} />
            {/* <Screen name="Connect" component={Connect} /> */}
        </Navigator>
    )
}