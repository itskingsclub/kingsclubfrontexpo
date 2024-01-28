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
import Gametable from './src/components/gametable/Gametable';
import Test from './src/components/gametable/Test';
import Contest from './src/components/contest/Contest';
import Screenshot from './src/components/contest/Screenshot';
import Myprofile from './src/components/profile/Myprofile';
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
      <Stack.Screen name="test" component={Test} options={{ headerShown: false }}/>
      <Stack.Screen name="gametable" component={Gametable} options={{ headerShown: false }}/>
      <Stack.Screen name="contest" component={Contest} options={{ headerShown: false }}/>
      <Stack.Screen name="screenshot" component={Screenshot} options={{ headerShown: false }}/>
      <Stack.Screen name="myprofile" component={Myprofile} options={{ headerShown: false }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
