import React from 'react';
import {
    createStackNavigator,
    StackNavigationProp
} from '@react-navigation/stack';

import { Login } from '../screens/Login';
import { SignUp } from '../screens/SignUp';

type AuthStack = {
    SignUp: undefined,
    Login: undefined,
}

export interface AuthStackProps<T extends keyof AuthStack> {
    navigation: StackNavigationProp<AuthStack, T>
}

const { Navigator, Screen } = createStackNavigator<AuthStack>();

export function AuthRoute() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Login" component={Login} />
            <Screen name="SignUp" component={SignUp} />
        </Navigator>
    )
}