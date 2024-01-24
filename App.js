// App.js
import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import theme from './theme';
import Appnavigator from './Appnavigator';
import { UserProvider } from './src/userDetail/Userdetail';
import AnimatedSplash from './AnimatedBootSplash';

export default function App() {
  return (
    <UserProvider>
    <PaperProvider theme={theme}>
      {/* <Appnavigator /> */}
      <AnimatedSplash />
    </PaperProvider>
    </UserProvider>
  );
}
