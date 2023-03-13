import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { ConcertOne_400Regular } from '@expo-google-fonts/concert-one';
import { Modak_400Regular } from '@expo-google-fonts/modak';
import {
  useFonts,
  Sarabun_400Regular,
  Sarabun_600SemiBold,
  Sarabun_700Bold
} from '@expo-google-fonts/sarabun';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';

import { theme } from './src/styles/global/styles';
import { AuthRoute } from './src/routes/auth.route';
import { AuthProvider } from './src/hooks/useAuth';

export default function App() {
  const [fontsLoaded] = useFonts({
    ConcertOne_400Regular,
    Modak_400Regular,
    Sarabun_400Regular,
    Sarabun_600SemiBold,
    Sarabun_700Bold
  })

  useEffect(() => {
    async function loadFonts() {
      console.log("Load fonts executed", fontsLoaded)
      if (!fontsLoaded) await preventAutoHideAsync();
      else await hideAsync();
    }
    loadFonts();
  }, [fontsLoaded])

  if (!fontsLoaded) return <></>;

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar
          translucent
          backgroundColor="transparent"
        />
        <AuthProvider>
          <AuthRoute />
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}