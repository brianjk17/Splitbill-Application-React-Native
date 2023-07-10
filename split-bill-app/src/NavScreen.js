// import { Text, View } from 'react-native'
import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './screens/HomeScreen'
import BillScreen from './screens/BillScreen'
import ExpenseScreen from './screens/ExpenseScreen'
import ContactScreen from './screens/ContactScreen'
import MyComponent from './screens/testScreen'
import AddContactScreen from './screens/contacts-tab/AddContactScreen'

export default function NavScreen() {
  const Tab= createBottomTabNavigator();
  return (
      <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        tabBarStyle: { position: 'absolute' },
      }}
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Bills" component={BillScreen}/>
        {/* <Tab.Screen name="Add new bill" component={ExpenseScreen}/> */}
        <Tab.Screen name="AddContactScreen" component={AddContactScreen}/>
        <Tab.Screen name="Contact" component={ContactScreen}/>
        <Tab.Screen name="TESTING" component={MyComponent}/>
      </Tab.Navigator>
  )
}