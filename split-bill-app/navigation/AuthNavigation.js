import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from '../src/SignUpScreen';
import WelcomeScreen from '../src/WelcomeScreen';
import HomeScreen from '../src/HomeScreen';
import LoginScreen from '../src/LoginScreen';


const Stack = createNativeStackNavigator();


export function AuthNavigation() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
          <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}