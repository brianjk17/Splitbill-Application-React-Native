// import { Text, View } from 'react-native'
import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons'


import HomeScreen from './screens/HomeScreen'
import BillScreen from './screens/BillScreen'
import ExpenseScreen from './screens/ExpenseScreen'
import ContactScreen from './screens/ContactScreen'
import LogoutScreen from './LogoutScreen'
import { Text, View } from 'react-native'


export default function NavScreen() {
  const Tab= createBottomTabNavigator();
  return (
      // <Tab.Navigator
      // // backBehavior="none"
      // screenOptions={{
      //   showLabel:false,
      //   style:{
      //     position:'absolute',
      //     bottom:25,
      //     left:20,
      //     right:20,
      //     elevation:0,
      //     borderRadius:15,
      //     height:90,
      //     backgroundColor:'#fffff'

      //   }
      // }}
      // // screenOptions={{
      // //   tabBarStyle: { position: 'absolute' },
      // // }}
      // > style={{backgroundColor: '#FFE562', }}
      
      <Tab.Navigator
        backBehavior="none"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            right: 20,
            left: 20,
            
            elevation: 6,
            borderRadius: 15,
            height: 80,
            backgroundColor: '#343434',
            
          },
        }}
      >
        
        <Tab.Screen 
          name="Home" component={HomeScreen}
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Entypo name="home" size={30} color={focused ? "#FFE562": "#A6A6A6"} />
                  <Text style={{fontSize: 12, color: "#A6A6A6"}}>HOME</Text>
            </View>
              )
            }
          }}
        />

        <Tab.Screen 
          name="Bills" component={BillScreen}
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <FontAwesome5 name="file-invoice" size={30} color={focused ? "#FFE562": "#A6A6A6"} />
                  <Text style={{fontSize: 12, color: "#A6A6A6"}}>BILLS</Text>
            </View>
              )
            }
          }}
        />

        {/* <Tab.Screen name="Bills" component={BillScreen}/> */}
        
        {/* <Tab.Screen 
          name="Transaction" 
          component={ExpenseScreen} 
           options={{
            tabBarIcon: ({focused})=>{
              return (
                <View
                 style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFE562",
                  width: Platform.OS == "ios" ? 50 : 70,
                  height: Platform.OS == "ios" ? 50 : 70,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 50,
                  borderWidth:2,
                  borderColor:"#343434",
                  
                 }}
                >
                  <Text style={{fontSize:30, alignContent:'center'}}>+</Text>
                </View>
              )
            }
           }}
        /> */}

        <Tab.Screen 
          name="Contacts" component={ContactScreen}
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <AntDesign name="contacts" size={30} color={focused ? "#FFE562": "#A6A6A6"} />
                  <Text style={{fontSize: 12, color: "#A6A6A6"}}>CONTACTS</Text>
            </View>
              )
            }
          }}
        />
        {/* <Tab.Screen name="Contact" component={ContactScreen}/> */}

        
        <Tab.Screen 
          name="Logout" component={LogoutScreen}
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <MaterialIcons name="logout" size={30} color={focused ? "#FFE562": "#A6A6A6"} />
                  <Text style={{fontSize: 12, color: "#A6A6A6"}}>LOGOUT</Text>
            </View>
              )
            }
          }}
        />

        {/* <Tab.Screen name="Log out" component={LogoutScreen}/> */}
      </Tab.Navigator>
  )
}