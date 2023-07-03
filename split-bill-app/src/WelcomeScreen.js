import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect,useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function WelcomeScreen() {
    // const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const getLoginStatus = async () => {
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
        const checkLogin = async () => {
            try {
                const isLoggedIn = await getLoginStatus();
                if (isLoggedIn) {
                    console.log('User is logged in.');
                    //Perform actions for logged-in user
                    navigation.navigate('Nav')
                } else {
                    console.log('User is not logged in.');
                    // Perform actions for logged-out user
                }
            }catch (error) {
                console.log('Error retrieving data: ', error);
            } finally {
                setIsLoading(false);
            }   
        };
        checkLogin()
    },[])

    const navigation = useNavigation();
    if (isLoading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
        );
    }
    return (
        <SafeAreaView className="flex-1" style={{backgroundColor: '#171717'}}>
            <View className="flex-1 justify-around my-4">
                <Text 
                    className=" text-stone-300 font-bold text-4xl text-center">
                    Let's Start Splitting!
                </Text>
                <View className="flex-row justify-center">
                    <Image source={require("../assets/moreimages/welcome.png")}
                        style={{width: 350, height: 350}} />
                </View>
                <View className="space-y-4">
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('SignUp')}
                        className="py-3 bg-yellow-400 mx-7 rounded-xl">
                            <Text 
                                className="text-xl font-bold text-center text-gray-700"
                            >
                                Sign Up
                            </Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center">
                        <Text className="text-white font-semibold">Already have an account?</Text>
                        <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                            <Text className="font-semibold text-yellow-400"> Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}