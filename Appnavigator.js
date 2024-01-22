import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Parent from './src/normal/Parent';
const Stack = createStackNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="parent" component={Parent} options={{ headerShown: false }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
