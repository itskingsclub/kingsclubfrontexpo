// App.js
import React, { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import theme from "./theme";
import { UserProvider } from "./src/userDetail/Userdetail";
import AnimatedSplash from "./AnimatedBootSplash";
import { useFonts } from "expo-font";
import { enableFreeze } from "react-native-screens";

enableFreeze(true);
export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
  });

  return (
    <UserProvider>
      <PaperProvider theme={theme}>
        <AnimatedSplash />
      </PaperProvider>
    </UserProvider>
  );
}
