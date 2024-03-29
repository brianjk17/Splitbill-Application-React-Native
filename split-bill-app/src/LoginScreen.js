import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

// import {ArrowLeftIcon} from 'react-native-heroicons/solid'
// import { themeColors } from '../theme'

import { useNavigation } from '@react-navigation/native'

import { supabase } from '../supabase-service'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CheckBox } from 'react-native-elements'
import CryptoJS from 'react-native-crypto-js';


    //UPDATE
    // async function updatePassword() {
    //   if (inputPassword === inputConfPassword) {
    //       const { error } = await supabase
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

// Function to store login status
const storeLoginStatus = async (isLoggedIn) => {
  try {
    await AsyncStorage.setItem('isLoggedIn', isLoggedIn.toString());
    await AsyncStorage.setItem('user_id', user_id);
    console.log('Login status stored successfully.');
  } catch (error) {
    console.log('Error storing login status: ', error);
  }
};

// Function to retrieve login status
const getLoginStatuss = async () => {
  try {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn !== null) {
      console.log('User login status:', isLoggedIn);
      return isLoggedIn === 'true'; // Convert string value to boolean
    } else {
      console.log('Login status not found.');
      return false; // Default value if login status is not found
    }
  } catch (error) {
    console.log('Error retrieving login status: ', error);
    return false; // Default value in case of error
  }
};

// Example usage
const checkLogin = async () => {
  const isLoggedIn = await getLoginStatuss();
  if (isLoggedIn) {
    console.log('User is logged in.');
    // Perform actions for logged-in user
  } else {
    console.log('User is not logged in.');
    // Perform actions for logged-out user
  }
};
    
    // // Storing login status
    // storeLoginStatus(true);

    // // Retrieving and checking login status
    // checkLogin();

//LOGOUT
// const storeLoginStatus = async (isLoggedIn) => {
//   try {
//       await AsyncStorage.setItem('isLoggedIn', isLoggedIn.toString());
//       console.log('Login status stored successfully.');
//   } catch (error) {
//       console.log('Error storing login status: ', error);
//   }
// };
// storeLoginStatus(false)

export default function LoginScreen() {
  const navigation = useNavigation();

  //LOGIN
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [user_id, setUser_id] = useState(0);
  const [user, setUser] = useState(null);

  const [name, setName] = useState('');

  const storeLoginStatus = async (isLoggedIn, user_id, name, phone) => {
    try {
      console.log("aaaaa:"+user_id)
      await AsyncStorage.setItem('isLoggedIn', isLoggedIn.toString());
      await AsyncStorage.setItem('user_id', user_id.toString());

      await AsyncStorage.setItem('name',name.toString())
      await AsyncStorage.setItem('phone', phone.toString())

      console.log("user_id:"+user_id)
      console.log("name:"+name.toString())
      console.log("phone:"+phone.toString())
      
      console.log('Login AsyncStorage stored successfully.');
      navigation.navigate('Nav') 
    } catch (error) {
      console.log('Error storing login status: ', error);
    }
  };

  function decrypt(password, key) {
    const decryptedBytes = CryptoJS.AES.decrypt(password, key);
    const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedPassword;
  }

  async function userLogin() {
    if(phone=="" || password==""){
      alert("Empty input(s) phone number or password")
      return
    }
    
    try {
      const { data, error } = await supabase
        .from('User')
        .select()
        .eq('phone', phone)
      if (data[0] === undefined) {
        console.log(error);
        alert('Phone Number not registered in the system');
      } 
      
      else if ((data?.length !== 0)&&decrypt(data[0].password, phone)===password) { //(data?.length !== 0)
        setUser_id(data[0].user_id);
        setName(data[0].name);
        console.log('Login success');
        storeLoginStatus(true, data[0].user_id, data[0].name, phone);
        console.log(user_id);                                                       // navigation.navigate('Nav') 
      } else {
        console.log(error);
        console.log(phone, password);
        alert('Incorrect password');
      }
    } catch (error) {
      console.log('Error storing login status: ', error);
    }
  }

  // useEffect(() => {
  //   if (user_id > 0) {
  //     storeLoginStatus(true);
  //   }
  // }, [user_id]);
  const [showPassword, setShowPassword] = useState(false);


  return (
    <KeyboardAvoidingView behavior="none" style={{ flex: 1 }}>

    <ScrollView className="flex-1 bg-stone-300" >
    <View className="flex-1 flex bg-zinc-100" style={{backgroundColor: '#171717'}}>
      <SafeAreaView  className="flex ">
        
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={()=> {
            setPhone('')
            setPassword('')
            navigation.goBack()}} 
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            {/* <ArrowLeftIcon size="20" color="black" /> */}
            <Text>Back</Text>
          </TouchableOpacity>
        </View>

        <View  className="flex-row justify-center">
          <Image source={require('../assets/moreimages/login.png')} 
          style={{width: 280, height: 200}} />
        </View>
      </SafeAreaView>


      {/* LOGIN FUNCTION UI */}
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 flex bg-stone-300 px-8 pt-7">
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Phone Number</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-2"
              keyboardType='numeric'
              value={phone}
              placeholder="Enter Phone Number"
              onChangeText={value=>setPhone(value)}
            />

            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry={!showPassword}
              value={password}
              placeholder='Enter Password'
              onChangeText={value=>setPassword(value)}
            />

            <CheckBox
              title="Show password"
              checked={showPassword}
              onPress={() => setShowPassword(!showPassword)}
            />
            {/* <TouchableOpacity className="flex items-end">
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity> */}
            <Text></Text>
            <TouchableOpacity 
              className="py-2 bg-yellow-400 rounded-xl "
              onPress={()=> userLogin()}
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

          <View className="flex-row justify-center mt-5 mb-10">
              <Text className="text-gray-500 font-semibold">
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={()=> {setPhone('')
                                              setPassword('')
                                              navigation.navigate('SignUp')
                                            }}
              >
                  <Text className="font-semibold text-yellow-500"> Sign Up</Text>
              </TouchableOpacity>
          </View>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
  
}