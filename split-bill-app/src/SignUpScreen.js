import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabase-service';
import { CheckBox } from 'react-native-elements';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    function reset(){setName('')
    setPhone('')
    setPassword('')
    setConfpassword('')}
    // reset()

    // useEffect(()=>{
    //     setName('')
    //     setPhone('')
    //     setPassword('')
    //     setConfpassword('')
    // },[])
    
    var errors = "";

    async function checkAvailabilityPhone() {
        const { data, error } = await supabase
            .from('User')
            .select()
            .eq('phone', phone)

        if (phone===""||phone.length<=8||!Number.isInteger(parseInt(phone))){
            console.log("invalid phone input")
            errors+="invalid phone input"
        }
        else if
        (data?.length !== 0) {
            console.log(data?.length)
            console.log("sadf")
            errors="Phone Number Already Used!"
        }
        else if (error) {
            console.log(error)
            // throw error;
        } else {
            console.log("Phone good")
            return true
        }
        return false
    }

    async function checkPassword() {
        if(password===""||confpassword===""||password.length<=5){
            console.log("invalid password input or password too short")
            errors="invalid password input or password too short"
        } 
        else if(password!=confpassword){
            console.log("passwords different")
            errors="passwords different"
        }
        else {
            console.log("Password good")
            return true
        }
        return false
    }

    async function userRegister() {
        //check availability
        if(name.length<=1){
            errors+="Name empty\n"
            console.log(errors)
        }
        if (name===''||!await checkAvailabilityPhone() || !await checkPassword()) {
            console.log("invalid input(s)")
            alert(errors)
            errors=""
            return;
        }
        const { error } = await supabase.from("User").insert({
            name: name,
            // email: email,
            phone: phone,
            password: password
        })
        if (error) {
            //error will throw here
            console.log("erererereor")
            console.log(error)
            // throw error;
        }else{
            console.log("user added")
            reset()
            navigation.navigate('Login')
        }
    }
    
    return (
    <View className="flex-1 flex bg-white" style={{backgroundColor: '#171717'}}>
        
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
            <TouchableOpacity 
                onPress={()=> {
                    reset()
                    navigation.goBack()}}
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

      <View className="flex-1 bg-stone-300 px-8 pt-6"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
      >
        <View className="form space-y-0.5">
            <Text className="text-gray-700 ml-4">Full Name</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={name}
                placeholder='Enter Fullname'
                onChangeText={value=>setName(value)}
            />
            
            {/* <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={email}
                placeholder="john@gmail.com"
                onChangeText={value=>setEmail(value)}
            /> */}

            <Text className="text-gray-700 ml-4">Phone Number</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                keyboardType='numeric'
                value={phone}
                placeholder="Enter Phone Number"
                onChangeText={value=>setPhone(value)}
            />

            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
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
            
            <Text className="text-gray-700 ml-4">Confirm Password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry={!showPassword}
                value={confpassword}
                placeholder='Enter Password'
                onChangeText={value=>setConfpassword(value)}
            />
            

            <TouchableOpacity 
                className="py-5 bg-yellow-400 rounded-xl"
                onPress={()=>userRegister()}
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
            <TouchableOpacity onPress={()=> {
                reset()
                navigation.navigate('Login')}}>
                <Text className="font-semibold text-yellow-500"> Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
