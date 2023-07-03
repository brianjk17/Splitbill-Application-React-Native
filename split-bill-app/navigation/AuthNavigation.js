import React, { useEffect } from 'react'
import { NavigationContainer, NavigationAction } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BackHandler } from 'react-native';
// import { NavigationActions } from 'react-navigation';

import SignUpScreen from '../src/SignUpScreen';
import WelcomeScreen from '../src/WelcomeScreen';
import NavScreen from '../src/NavScreen';
import LoginScreen from '../src/LoginScreen';


const Stack = createNativeStackNavigator();


export function AuthNavigation() {
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       return true; // Disable back button functionality
  //     }
  //   );

  //   return () => backHandler.remove();
  // }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Nav" options={{headerShown: false, headerLeft: null}} component={NavScreen} />
          <Stack.Screen name="Welcome" options={{headerShown: false,}} component={WelcomeScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
          {/* SETTINGS */}
        </Stack.Navigator>
      </NavigationContainer>
  )
}