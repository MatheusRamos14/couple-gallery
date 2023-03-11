import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Feed } from '../screens/Feed';
import { Upload } from '../screens/Upload';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
    return (
        <Navigator>
            <Screen name="Feed" component={Feed} />
            <Screen name="Upload" component={Upload} />
        </Navigator>
    )
}