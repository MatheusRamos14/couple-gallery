import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoute } from './src/routes/auth.route';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor="transparent"
      />
      <AuthRoute />
    </NavigationContainer>
  );
}