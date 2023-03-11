import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Register } from '../screens/Register';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoute() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Register" component={Register} />
        </Navigator>
    )
}