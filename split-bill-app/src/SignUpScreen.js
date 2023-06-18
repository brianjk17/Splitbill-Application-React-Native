import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
// import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
    const navigation = useNavigation();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    
    return (
    <View className="flex-1 flex bg-white" style={{backgroundColor: '#171717'}}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
            <TouchableOpacity 
                onPress={()=> navigation.goBack()}
                className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
                <Text>Back</Text>
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center bottom-3">
            <Image source={require('../assets/moreimages/signup.png')} 
                style={{width: 170, height: 110}} />
        </View>
      </SafeAreaView>

      <View className="flex-1 bg-stone-300 px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
      >
        <View className="form space-y-0.5">
            <Text className="text-gray-700 ml-4">Full Name</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={name}
                placeholder='John Snow'
                onChangeText={value=>setName(value)}
            />
            
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={email}
                placeholder="john@gmail.com"
                onChangeText={value=>setEmail(value)}
            />

            <Text className="text-gray-700 ml-4">Phone Number</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={phone}
                placeholder="Phone Number"
                onChangeText={value=>setPhone(value)}
            />

            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                value={password}
                placeholder='Enter Password'
                onChangeText={value=>setPassword(value)}
            />
            
            <Text className="text-gray-700 ml-4">Confirm Password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                value={confpassword}
                placeholder='Enter Password'
                onChangeText={value=>setConfpassword(value)}
            />

            <TouchableOpacity 
                className="py-3 bg-yellow-400 rounded-xl"
                onPress={()=> navigation.navigate('Login')}
            >
                <Text className="font-xl font-bold text-center text-gray-700">
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
        {/* <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
        </Text>
        <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl" onPress={()=> navigation.navigate('Home')}>
                <Image source={require('../assets/icons/google.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/apple.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/facebook.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
        </View> */}
        <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                <Text className="font-semibold text-yellow-500"> Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
