import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { View,Text, StyleSheet } from "react-native"
import { supabase } from "../../supabase-service"

export default function HomeScreen(){
  
  const [currentName, setCurrentName] = useState('')
  const [currentPhone, setCurrentPhone] = useState('second')
  async function getData(){
    try {
        const currentPhoneNum = await AsyncStorage.getItem('phone');
        // const currentUser_id = await AsyncStorage.getItem('user_id');
        const currentUserName = await AsyncStorage.getItem('name');
        setCurrentPhone(currentPhoneNum.toString())
        // setCurrentUser_id(currentUser_id.toString())
        setCurrentName(currentUserName)
        return 
    } catch (error) {
        console.log('Error retrieving login status: ', error);
        return false; // Default value in case of error
    }
  }

  const [activeBills, setActiveBills] = useState(0)

  async function getBillData(){
    try {
      const { data, error} = await supabase
        .from('Bill')
        .select()
      if(error){
        console.log("error: ", error)
      } else{
        console.log("BILL DATA");
        // const currentPhone = await AsyncStorage.getItem('phone');
        let billIncluded = [];
        data.forEach((bill)=>{
          bill.members.forEach((member) => {
            if (member.User.phone === currentPhone&&bill.paid===false) {
              billIncluded.push(bill);
            }
          });
        })
        setActiveBills(billIncluded.length)

      }
    } catch (error) {
      console.log('Error storing login status: ', error);
    }
  }

  useEffect(()=>{
    getData()
    getBillData()
  },[])
  return(
    //Show number of active bills
    // show how much you owe
    //show how much people owe you
    <View style={{flex:1,alignItems: 'center',}}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Hello, {currentName}! </Text>
      </View>
      <Text></Text>
      <View style={styles.container}>
        <Text style={styles.greeting}>You have {activeBills} active bills</Text>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // marginHorizontal:40,
    width:300,
    alignItems: 'center',
    padding: 20,
    borderRadius:20,
    backgroundColor: "grey"
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});