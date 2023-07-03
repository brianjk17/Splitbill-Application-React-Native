import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../../../supabase-service';
import AsyncStorage from '@react-native-async-storage/async-storage'

//REMOVE CONTACT
//Somehow get the Contacts id and delete it 
async function removeFriend(userId, friendId) {
    const { data: userData, error: userError } = await supabase
      .from('friendship')
      .delete()
      .eq('user_id', userId)
      .eq('friend_id', friendId);
  
    const { data: friendData, error: friendError } = await supabase
      .from('friendship')
      .delete()
      .eq('user_id', friendId)
      .eq('friend_id', userId);
  
    if (userError || friendError) {
      console.error('Error removing friend:', userError || friendError);
      return false;
    }
  
    return true;
  }
/////////////////////////////////////////////////////////////////////////////

export default ContactCard = () => {
  // const [isSelected, setIsSelected] = useState(false);

  //GET USER_ID FROM ASYNCSTORAGE
  // const [user_id, setUser_id] = useState(0);

  //GET CONTACTS FROM SUPABASE
  const [contacts, setContacts] = useState([]);

  const handleSelect = () => {
    console.log("card tapped")
    //give option to delete
  };

  const getUser_id = async () => {
    try {
        const isUser_id = await AsyncStorage.getItem('user_id');
        // const isUser_id = await AsyncStorage.getItem('isLoggedIn');
        console.log("isUser_id: "+isUser_id)
        // setUser_id(isUser_id)
        return isUser_id
    } catch (error) {
        console.log('Error retrieving login status: ', error);
        return false; // Default value in case of error
    }
  };

  // GET CONTACT
  async function getContacts(userId) {
    userId=parseInt(userId)
    // console.log("asdfasdf"+userId)
    let newData=[]
    try {
      // const { data, error } = await supabase
      //   .from('Contacts')
      //   .select('friend_id')
      //   .eq('user_id', userId);
      
      const { data, error } = await supabase
        .from('Contacts')
        .select(`
          User!Contacts_friend_id_fkey(
          user_id,
          name,
          phone
          )  
        `)
        .eq('user_id', userId)
        
      if (error) {
        console.error('Error fetching contacts:', error);
      }else if(data===undefined||data.length===0){
      } 
      else {
        // newData = data.map(obj => obj.friend_id);
        newData = [...newData, ...data]
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }

    try {
      const { data, error } = await supabase
        .from('Contacts')
        .select(`
          User!Contacts_user_id_fkey(
          user_id,
          name,
          phone
          )  
        `)
        .eq('friend_id', userId)
        if (error) {
          console.error('Error fetching contacts:', error);
        }else if(data===undefined||data.length===0){
          return newData
        } 
        else {
          // newData = data.map(obj => obj.friend_id);
          newData = [...newData, ...data]
          console.log(newData)
          setContacts(newData);
          return newData

        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
      return newData
      // setContacts(newData);
  }
 

  // useEffect(() => {
  //   console.log("useEffect contacts");
  //   console.log(contacts);
  //   getContacts(user_id)
  // }, [contacts]);

  // useEffect(() => {
  //   if (user_id > 0) {
      
  //     getUser_id()
  //     console.log(user_id)
  //   }
  // }, [user_id]);

  // useEffect(()=>{
  //   console.log("user_id:"+user_id+"\ngetUser_id\ngetContacts")
  //   async function fetchData() {
  //     setUser_id(await getUser_id());
  //     console.log("useefek"+user_id)
  //     // setContacts(await getContacts(user_id));
  //     const fetchedContacts = await getContacts(user_id);
  //     setContacts(fetchedContacts);
  //     console.log("useefek"+contacts)
  //     //all CONTACTID is FETCHED
  //   }
  //   fetchData();
  // },[])

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const isUser_id = await AsyncStorage.getItem('user_id');
        // const isUser_id = await AsyncStorage.getItem('isLoggedIn');
        console.log("isUser_id: "+isUser_id)
        console.log(typeof(isUser_id))
        console.log(parseInt(isUser_id))

        // setUser_id(parseInt(isUser_id))

        let newData=[]

        const { data: firstData, error: firstError } = await supabase
        .from('Contacts')
        .select(`
          User!Contacts_friend_id_fkey(
          user_id,
          name,
          phone
          )  
        `)
        .eq('user_id', parseInt(isUser_id));

      if (firstError) {
        console.error('Error fetching 1st contacts:', firstError);
        return firstError;
      } else if (firstData === undefined || firstData.length === 0) {
        console.log("1st: " + firstData);
      } else {
        newData = [...newData, ...firstData];
      }

      console.log(newData);

      const { data: secondData, error: secondError } = await supabase
        .from('Contacts')
        .select(`
          User!Contacts_user_id_fkey(
          user_id,
          name,
          phone
          )  
        `)
        .eq('friend_id', parseInt(isUser_id));

      if (secondError) {
        console.error('Error fetching 2nd contacts:', secondError);
        return secondError;
      } else if (secondData === undefined || secondData.length === 0) {
        console.log("2nd: " + secondData);
      } else {
        newData = [...newData, ...secondData];
        console.log(newData);
      }
        setContacts(newData);
      } catch (error) {
        // console.log(isUser_id)
        console.log('Error retrieving login status: ', error);
        return false; // Default value in case of error
      }
    }
    fetchData()
    
    //LOADING SET DONE
  },[])

  // function contactcard(){
  //   return(
  //     <TouchableOpacity
  //     style={[styles.cardContainer]}//, isSelected && styles.selectedCard]}
  //     onPress={handleSelect}
  //   >
  //     <View style={styles.circleContainer}>
  //       <Text style={styles.initial}>{user.name.charAt(0)}</Text>
  //     </View>
  //     <View style={styles.userInfoContainer}>
  //       <Text style={styles.name}>{user.name}</Text>
  //       <Text style={styles.phoneNumber}>{user.phoneNumber}</Text>
  //     </View>
  //   </TouchableOpacity>
  // )}

  return (<>
    {contacts.map((item)=>(
      <TouchableOpacity
        key={item.User.user_id}
        style={[styles.cardContainer]}//, isSelected && styles.selectedCard]}
        onPress={handleSelect}
      >
        <View style={styles.circleContainer}>
          <Text style={styles.initial}>{item.User.name.charAt(0)}</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.name}>{item.User.name}</Text>
          <Text style={styles.phoneNumber}>{item.User.phone}</Text>
        </View>
      </TouchableOpacity>
    ))}
   </>);
};
// Dev Tools Web UI has been removed. Learn more: https://blog.expo.dev/sunsetting-the-web-ui-for-expo-cli-ab12936d2206
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedCard: {
    backgroundColor: '#f0f0f0',
  },
  circleContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  initial: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#999',
  },
});
