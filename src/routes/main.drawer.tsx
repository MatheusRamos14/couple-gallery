import React from "react";
import { useWindowDimensions } from "react-native";
import {
    createDrawerNavigator,
    DrawerNavigationProp
} from "@react-navigation/drawer";
import { useTheme } from "styled-components/native";

import { Feed } from "../screens/Feed";
import { Upload } from "../screens/Upload";

import { CustomDrawerContent } from "../components/CustomDrawer";

const { Navigator, Screen } = createDrawerNavigator();

export type MainDrawer = {
    Feed: undefined,
    Home: undefined;
}

export interface MainDrawerProps<T extends keyof MainDrawer> {
    navigation: DrawerNavigationProp<MainDrawer, T>
}

export function MainDrawer() {
    const { height } = useWindowDimensions();
    const theme = useTheme();

    return (
        <Navigator
            drawerContent={props => <CustomDrawerContent {...props}/>}
            useLegacyImplementation
            screenOptions={{
                drawerStyle: {
                    width: 240,
                    height: 0.48 * height,
                    backgroundColor: theme.colors.shape,
                    borderBottomRightRadius: 45,
                },
                headerShown: false
            }}
        >
            <Screen name="Feed" component={Feed} />
            <Screen name="Home" component={Upload} />
        </Navigator>
    )
}