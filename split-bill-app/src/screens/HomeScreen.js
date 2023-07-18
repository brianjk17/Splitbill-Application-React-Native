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
        getBillData()
        return 
    } catch (error) {
        console.log('Error retrieving login status: ', error);
        return false; // Default value in case of error
    }
    
  }

  const [activeBills, setActiveBills] = useState(0)
  const [bills, setBills] = useState([]);


  async function getBillData(){
    try {
      const { data, error} = await supabase
        .from('Bill')
        .select()
      // if(currentName.length===0){
      //     getData()
      //   } 
      if(bills.length===0){
       
        setBills([...bills, data]);
      }        
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

  useEffect(()=>{
    if(currentName.length===0){
          getData()
        } 
    getBillData()
  },[bills])

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {currentName}!</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>You have {activeBills} active bills</Text>
      </View>
      {/* <View style={styles.infoContainer}>
        <Text style={styles.infoText}>You owe: ${amountOwed}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>People owe you: ${amountOwedToYou}</Text>
      </View> */}
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    // color:"#947910"
  },
  infoContainer: {
    backgroundColor: '#d1d1d1',
    width: 300,
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    // color:"#947910"
  },
});
