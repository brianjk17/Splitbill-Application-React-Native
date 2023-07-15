import React, { useEffect } from 'react'
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { supabase } from '../../../supabase-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddContactScreen({toggleAddModal,setIsLoading}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [friendUser_id, setFriendUser_id] = useState('');
  const [currentPhone, setCurrentPhone] = useState('');
  const [currentUser_id, setCurrentUser_id] = useState('');

  function handlePhoneInput(text){
    const filteredText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(filteredText)
  }

  const getUser_id = async () => {
    try {
        const currentPhone = await AsyncStorage.getItem('phone');
        const currentUser_id = await AsyncStorage.getItem('user_id');
        // console.log("getUser_id")
        // console.log(currentPhone)
        // console.log(currentUser_id)
        setCurrentPhone(currentPhone.toString())
        setCurrentUser_id(currentUser_id.toString())
        return 
    } catch (error) {
        console.log('Error retrieving login status: ', error);
        return false; // Default value in case of error
    }
  };

  async function handleSearch(){
    //CHECK IF PHONE NUMBER IS NOT HIS/HER OWN
    console.log('Searching for contact with phone number:', phoneNumber);

    if(phoneNumber.length<6){
      alert("Please input the correct phone number")
    } else if(phoneNumber===currentPhone){
      alert("You can't add yourself to your contacts")
    } else{
      try {
        const { data, error } = await supabase
          .from('User')
          .select()
          .eq('phone', phoneNumber);
    
        if (error) {
          console.error('Error searching for phone number:', error);
          return;
        }else if(data.length>0){
          console.log("ASDASDASDASDASD\n\n");
          console.log('Search results:', data);
          setFriendUser_id(data[0].user_id)
          //CHECK IF the user has added this user
          //else add into db
          console.log(data[0].user_id)
          let contactID=data[0].user_id
          console.log(contactID)

          const { data:contact1, error:errorcontact1 } = await supabase
            .from('Contacts')
            .select()
            .eq('user_id', BigInt(currentUser_id))
            .eq('friend_id', BigInt(friendUser_id))

          const { data:contact2, error:errorcontact2 } = await supabase
            .from('Contacts')
            .select()
            .eq('user_id', BigInt(friendUser_id))
            .eq('friend_id', BigInt(currentUser_id))
          if(errorcontact1||errorcontact2){
            console.log('Error searching contacts:', error);
            return;
          } else if(contact1.length>0||contact2.length>0){
            alert("Contact already been added")
          }else{
            confirmAddContact(data, contactID)
          }
        }else{
          alert("Phone Number not found")
        }
      } catch (error) {
        console.error('Error searching for phone number:', error.message);
        //ALERT
      }
    }
  };

  async function inputData(friend_id){
    console.log("inpuit datatattaat")
    console.log(currentUser_id,friendUser_id)
    console.log(friendUser_id)
    const { error } = await supabase
      .from('Contacts')
      .insert({
        user_id: parseInt(currentUser_id),
        friend_id: parseInt(friend_id),
      })
    if (error) {
        //error will throw here
        console.log("erererereor")
        console.log(error)
        // throw error;
        alert("Failed to add contact, please try again")
    }else{
        console.log("contact added")
        toggleAddModal()
    }
  }

  function confirmAddContact(data, friend_id){
    let text='Do you want to add '+data[0].name+"?\n"+data[0].phone;
    Alert.alert(
        'Confirmation',
        text,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Add',
            onPress: () => {
              console.log("Add User")
              //store to Contacts table
              inputData(friend_id)
            },
          },
        ],
        { cancelable: false }
      );
  }

  useEffect(()=>{
    getUser_id()
  },[])

  return (
    <View style={styles.container}>
        <Text>AddContactScreen</Text>   
        <Text style={styles.title}>Search contact by their phone number</Text>

        <View style={styles.inputContainer}>

        <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={phoneNumber}
            onChangeText={handlePhoneInput}
            keyboardType="numeric"
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        </View>

        <TouchableOpacity style={{borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20,}} 
        onPress={toggleAddModal} className="mt-5 w-40 bg-red-600 items-center" >
            <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    searchButton: {
      backgroundColor: 'blue',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  