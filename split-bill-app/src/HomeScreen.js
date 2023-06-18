import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'



function Firstscreen(){
  return(
    <View className="flex-1 items-center justify-center">
      <Text>This is first</Text>
    </View>
  )
}

function Secondscreen(){
  return(
    <View className="flex-1 items-center justify-center">
      <Text>This is second</Text>
    </View>
  )
}

const Tab= createBottomTabNavigator();

export default function HomeScreen() {
  return (
    // <NavigationContainer>
    // <SafeAreaView>
      <Tab.Navigator>
        
        <Tab.Screen name="First" component={Firstscreen}/>
        <Tab.Screen name="Second" component={Secondscreen}/>
      </Tab.Navigator>
      // {/* </SafeAreaView> */}
    // </NavigationContainer>
  )
}

// export default function HomeScreen() {
//   return (
//     <SafeAreaView>
//       <Text>Home Screen</Text>
//     </SafeAreaView>
//   )
// }