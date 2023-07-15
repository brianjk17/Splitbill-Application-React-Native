import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'

export default function LogoutScreen() {
    function logout(){
        //Clear Async Storage
        //direct to Welcome Screen
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 350,
      },
      button: {
        backgroundColor: 'red',
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