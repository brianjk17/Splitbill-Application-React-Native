import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, SafeAreaView } from 'react-native';
import { supabase } from '../../../supabase-service';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchBar } from 'react-native-elements';


export default ContactCard = ({setIsLoading, loading}) => {

  //GET USER_ID FROM ASYNCSTORAGE
  // const [user_id, setUser_id] = useState(0);
  const [contacts, setContacts] = useState([])
  // const [contacts, update] = useState("")
  const [isLoading1, setIsLoading1] = useState(true);

  const handleSelect = (friendId,name,phone) => {
    console.log("card tapped")
    console.log("hah",isLoading1)
    let text='Do you want to delete '+name+"'s contact?\n"+phone;
    Alert.alert(
        'Confirmation',
        text,
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {setIsLoading(false)}
          },
          {
            text: 'Delete',
            onPress: () => {
              console.log("Delete User")
              setIsLoading1(!isLoading1)
              console.log(loading)
              deleteContact(friendId)
              fetchData()
            },
          },
        ],
        { cancelable: false }
      );
    console.log(loading)
    setIsLoading(!loading)
    fetchData()
  };

  const [currentPhone, setCurrentPhone] = useState('');
  const [currentUser_id, setCurrentUser_id] = useState('');

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

  async function deleteContact(friendId){
    setIsLoading(false)
    const { data:data1, error:error1 } = await supabase
      .from('Contacts')
      .delete()
      .eq('user_id', friendId)
      .eq('friend_id', currentUser_id);
    const { data:data2, error:error2 } = await supabase
      .from('Contacts')
      .delete()
      .eq('user_id', currentUser_id)
      .eq('friend_id', friendId );
    // console.log("deleteContact")
    // console.log(data1)
    // console.log(data2)
    if (error1||error2) {
      console.error('Error removing friend:', error1 || error2);
      alert("Delete failed, please try again")
    } else{
      setIsLoading(!loading)
      alert("Delete successful")
      await fetchData()
    }
    setIsLoading(!loading)
    await fetchData()
  }
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
          // return newData
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
  
  const fetchData = async () => {
    try {
      const isUser_id = await AsyncStorage.getItem('user_id');
      // const isUser_id = await AsyncStorage.getItem('isLoggedIn');
      console.log("isUser_id: "+isUser_id)
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
    newData= newData.sort((a, b) => a.User.name.localeCompare(b.User.name));

    setContacts(newData);
    setDisplayContact(newData)
    setIsLoading(false);
    } catch (error) {
      // console.log(isUser_id)
      console.log('Error retrieving login status: ', error);
      return false; // Default value in case of error
    }
  }
  useEffect(()=>{
    getUser_id()
    fetchData()
  },[loading])

  useEffect(()=>{
    getUser_id()
    fetchData()
  },[isLoading1])



  function Contactcard({data}){
    console.log(data)
    return(
      <ScrollView style={{ flex: 1 }}>
      {data.map((item) => (
        <React.Fragment key={item.User.user_id}>
          <TouchableOpacity style={styles.cardContainer} onPress={()=>handleSelect(item.User.user_id,item.User.name,item.User.phone)}>
            <View style={styles.circleContainer}>
              <Text style={styles.initial}>{item.User.name.charAt(0)}</Text>
            </View>
            <View style={styles.userInfoContainer}>
              <Text style={styles.name}>{item.User.name}</Text>
              <Text style={styles.phoneNumber}>{item.User.phone}</Text>
            </View>
          </TouchableOpacity>
        </React.Fragment>
      ))}
    </ScrollView>
    )
  }

  const [search, setSearch] = useState("")
  const [displayContact, setDisplayContact] = useState([])

  searchContactFunction = (text) => {
    setSearch(text)
    if(text.length===0){
      clearSearchFunction()
      return
    }
    const searchResult = contacts.filter(obj => {
      // console.log(obj.User.name)
      const userName = obj.User.name.toLowerCase();
      const search = text.toLowerCase();
      for (let i = 0; i < search.length; i++) {
        if (!userName.includes(search[i])) {
          return false;
        }
      }
      return true;
    });
    setDisplayContact(searchResult)
  };

  clearSearchFunction =()=>{
    setDisplayContact(contacts)
    setSearch('')
  }

  
  return (
            <View >
                <SafeAreaView>
                  {contacts.length===0 ?(<Text></Text>):
                  (<View style={{}}>
                    <SearchBar
                      lightTheme
                      round
                      searchIcon={{ size: 24 }}
                      onChangeText={(text) => searchContactFunction(text)}
                      // onClear={() => clearSearchFunction()}
                      placeholder="Search Here..."
                      value={search}
                    />
                  </View>
                  )}

                  <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 350 }}
                  >
                    {/* displayContact */}
                    <Contactcard data={displayContact}/>

                  </ScrollView>
                </SafeAreaView>
              </View>
  );
};
// Dev Tools Web UI has been removed. Learn more: https://blog.expo.dev/sunsetting-the-web-ui-for-expo-cli-ab12936d2206
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,

    borderWidth: 2,
    borderColor: '#A6A6A6',
    borderRadius: 30,
    // marginBottom: 10,
    marginVertical:6,
    backgroundColor: '#A6A6A6'
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
    // color: '#999',
  },
});
