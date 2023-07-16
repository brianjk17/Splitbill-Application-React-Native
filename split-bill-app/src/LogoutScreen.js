import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function LogoutScreen() {
  const navigation = useNavigation();
  async function logout(){
      //Clear Async Storage
      try {
        await AsyncStorage.multiRemove(['isLoggedIn', 'user_id', 'name', 'phone']);
        console.log('Data successfully deleted from AsyncStorage.');
      } catch (error) {
        console.log('Error deleting data from AsyncStorage:', error);
      }

      //direct to Welcome Screen
      navigation.navigate('Welcome')
  }

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={logout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
};
    
const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFE562',
      },
      button: {
        backgroundColor: '#343434',
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      },
});