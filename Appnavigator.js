import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Parent from './src/normal/Parent';
import globalStyles from './globalstyle';
import Register from './src/userauth/register/Register';
import { loginApi } from './src/service/apicalls';
import Otpverify from './src/userauth/otpverify/Otpverify';
import Login from './src/userauth/login/Login';
const Stack = createStackNavigator();

const AppNavigator = ({user}) => {
  console.log("user",user)
  return (
    <NavigationContainer style={globalStyles.container}>
    <Stack.Navigator>
      <Stack.Screen name="register" component={ user ? Parent : Register} options={{ headerShown: false }}/>
      <Stack.Screen name="login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="otpverify" component={Otpverify} options={{ headerShown: false }}/>
      <Stack.Screen name="parent" component={Parent} options={{ headerShown: false }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
