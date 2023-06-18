import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

// import {ArrowLeftIcon} from 'react-native-heroicons/solid'
// import { themeColors } from '../theme'

import { useNavigation } from '@react-navigation/native'
// import { TailwindProvider } from 'tailwindcss-react-native'

// import { supabase } from '../../supabase-service'

// export default function LoginScreen() {
// return(
//   <TailwindProvider>
//   <SafeAreaView>
//   <View  style={{ flex: 1, justifyContent: 'center' }}>
//     <Text>This is first</Text>
//   </View>
//   </SafeAreaView>
//   </TailwindProvider>

// )}

export default function LoginScreen() {

    //update password
    // async function updatePassword() {
    //   if (inputPassword === inputConfPassword) {
    //       const { error } = await supabaseAdmin
    //           .from('companies')
    //           .update({ Password: inputPassword })
    //           .eq('id', CompanyId)

    //       alert("Password Changed Successfully")
    //       navigate('/');
    //       if (error) {
    //           throw error;
    //       }
    //   } else {
    //       alert("Wrong Password")
    //   }
    // }

    const navigation = useNavigation();
    return (
      <View className="flex-1 flex bg-zinc-100" style={{backgroundColor: '#171717'}}>
        <SafeAreaView  className="flex ">
          <View className="flex-row justify-start">
            <TouchableOpacity onPress={()=> navigation.goBack()} 
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
              {/* <ArrowLeftIcon size="20" color="black" /> */}
              <Text>Back</Text>
            </TouchableOpacity>
          </View>

          <View  className="flex-row justify-center">
            <Image source={require('../assets/moreimages/login.png')} 
            style={{width: 200, height: 200}} />
          </View>
        </SafeAreaView>


        {/* LOGIN FUNCTION UI */}
        <View 
          style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
          className="flex-1 flex bg-stone-300 px-8 pt-7">
            <View className="form space-y-3">
              <Text className="text-gray-700 ml-4">Email Address</Text>
              <TextInput 
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="email"
                value="john@gmail.com" 
              />
              <Text className="text-gray-700 ml-4">Password</Text>
              <TextInput 
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                secureTextEntry
                placeholder="password"
                value="test12345" 
              />
              <TouchableOpacity className="flex items-end">
                <Text className="text-gray-700 mb-5">Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="py-3 bg-yellow-400 rounded-xl"
                onPress={()=> navigation.navigate('Home')}
                >
                  <Text 
                      className="text-xl font-bold text-center text-gray-700"
                  >
                          Login
                  </Text>
               </TouchableOpacity>
              
            </View>

            {/* <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
            <View className="flex-row justify-center space-x-12">
              <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/google.png')} className="w-10 h-10" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/apple.png')} className="w-10 h-10" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/facebook.png')} className="w-10 h-10" />
              </TouchableOpacity>
            </View> */}

            <View className="flex-row justify-center mt-7">
                <Text className="text-gray-500 font-semibold">
                    Don't have an account?
                </Text>
                <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                    <Text className="font-semibold text-yellow-500"> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }