import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Parent from './src/normal/Parent';
import globalStyles from './globalstyle';
import Register from './src/userauth/register/Register';
const Stack = createStackNavigator();

const AppNavigator = ({user}) => {
  return (
    <NavigationContainer style={globalStyles.container}>
    <Stack.Navigator>
      <Stack.Screen name="register" component={ user ? Parent : Register} options={{ headerShown: false }}/>
      <Stack.Screen name="parent" component={Parent} options={{ headerShown: false }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
