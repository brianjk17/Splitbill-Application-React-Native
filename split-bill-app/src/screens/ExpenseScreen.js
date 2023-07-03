import React, { useEffect,useState } from "react";
import { Modal,Text ,View ,TextInput, StyleSheet, Switch, ScrollView } from "react-native";
// import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'
import UserCard from "../components/UserCard";
import AddMembersModal from "../components/AddMembersModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../supabase-service";
import SwipeButtonScreen from "../components/SwipeButton";
// import { TextInput } from "@react-native-material/core";
import AddExpenseComponent from "../components/AddExpenses/AddExpenseComponent";


export default function ExpenseScreen(bill_id=1){
    const[showUserModal, setShowUserModal]=useState(false)

    // const[showExpenserModal, setShowExpenseModal]=useState(false)

    const[billName, setBillName]=useState("")
    
    const[billOwner, setBillOwner]=useState(0)
    
    const[selectedUsers, setSelectedUsers]=useState([
            // {User: Object{ id: 5, name: 'John Doe', phone: '1234567890'}},
            // { id: 2, name: 'Jane Smith', phone: '9876543210'},
            // { id: 3, name: 'Mike Johnson', phone: '5551234567'},
            // { id: 17, name: 'Keyrupan Brian Joseph', phone:"234567890"},
        ]
    )

    //For assigning the expenses for the users
    const[selectedUser, setSelectedUser]=useState([])
    const[selectedExpense, setSelectedExpense]=useState([])

    
    //dont change
    const[users, setUsers]=useState([])
    // const[selectedUserid, setSelectedUserid]=useState([{"user_id": 5, "chosen": false}]);
    
    const [expenses, setExpenses] = useState([]);
    // {"expenses":[
    //               {"name":"food A",
    //               "price":25,
    //               "members":[id1,id2,id3]},
    //               {"name":"food B",
    //               "price":30,
    //               "members":[id2,id4]},
    //             ]
    // }
    const [newId, setNewId] = useState(0);

    const addExpense = (expense) => {
      setExpenses([...expenses, expense]);
      setNewId(newId+1)
      console.log(expense)
    };

    const deleteExpense = (id) => {
      let updatedContacts = expenses.filter((item) => item.id !== id);
      setExpenses(updatedContacts);

      // const updatedExpenses = [...expenses];
      // updatedExpenses.splice(index, 1);
      // setExpenses(updatedExpenses);
    };

    const saveExpense = (id, newData) => {
      console.log("saveExpense")
      // console.log(expenses)
      // console.log(newData)
      const updatedExpenses = expenses.map((expense1) => {
        if (expense1.id === id) {
          return { ...expense1, ...newData }; // Merge the existing expense data with the new data
        }
        return expense1;
      });
    
      setExpenses(updatedExpenses);
    };
    

    // const[total, setTotal]=useState(0)

    function toggleUserModal(){
        console.log("toggleUserModal")
        console.log(showUserModal)
        setShowUserModal(!showUserModal);
    }

    const addSelectedUser = (user) => {
        console.log("addSelectedUser")

        console.log("user")
        console.log(user)
        console.log("selectedUsers")
        console.log(selectedUsers)
        console.log("Users")
        console.log(users)

        setSelectedUsers([...selectedUsers,user])
        // setSelectedUserid([...selectedUserid, {"user_id":user.User.user_id, "chosen": false}]);
        // console.log(selectedUserid)
        // setSelectedUsers([...selectedUserid,user])
        console.log(users)
        // let updatedContacts = users.filter((item) => {item.User.phone !== user.User.phone});
        // setUsers(updatedContacts);
        console.log("should be empty")

        console.log("user")
        console.log(user)
        console.log("selectedUsers")
        console.log(selectedUsers)
        console.log("Users")
        console.log(users)
    };
    
    const removeSelectedUser = async (user) => {
        console.log("removeSelectedUser")
        // console.log(userId)
        // setSelectedUserid((prevSelectedUsers) =>
        // prevSelectedUsers.filter((selectedUser) => selectedUser.id !== user.id));
        
        // const newArray=(selectedUserid.filter((item)=>item.user_id !== userId))
        // setSelectedUserid(newArray)
        // console.log(selectedUserid)
        console.log("user")
        console.log(user)
        console.log("selectedUsers")
        console.log(selectedUsers)
        console.log("Users")
        console.log(users)

        let updatedContacts = selectedUsers.filter((item) => item.User.phone !== user.User.phone);
        setSelectedUsers(updatedContacts);
        console.log(selectedUsers)
        //add the user back to the users from the selected
        // setUsers([...users,user])
        // setSelectedUsers([...selectedUsers,user])

        console.log("user")
        console.log(user)
        console.log("selectedUsers")
        console.log(selectedUsers)
        console.log("Users")
        console.log(users)
    };



    const [taxChecked, setTaxChecked] = useState(false);
    const [serviceChecked, setServiceChecked] = useState(false);
    const [discountsChecked, setDiscountsChecked] = useState(false);

    //IN PERCENTAGE
    //if 0 means not added
    const [taxValue, setTaxValue] = useState("");
    const [serviceValue, setServiceValue] = useState("");
    const [discountsValue, setDiscountsValue] = useState("");

    const OptionalInputs = () => {
    //   const [taxChecked, setTaxChecked] = useState(false);
    //   const [serviceChecked, setServiceChecked] = useState(false);
    //   const [discountsChecked, setDiscountsChecked] = useState(false);
    //   const [taxValue, setTaxValue] = useState("");
    //   const [serviceValue, setServiceValue] = useState("");
    //   const [discountsValue, setDiscountsValue] = useState("");
      const handleSwitchChange = (switchName, value) => {
        if (switchName === 'tax') {
          setTaxChecked(value);
          if (value) {
            // const inputValue = parseInt(prompt('Enter tax value:'));
            console.log("tax")
            console.log(value)
            // if (!isNaN(inputValue)) {
            //   setTaxValue(inputValue);
            // }
            // setServiceValue(parseInt(value))

          }else if (isNaN(value)){
            setTaxValue(0);
          } 
          else {
            setTaxValue(0);
          }
        } else if (switchName === 'service') {
          setServiceChecked(value);
          if (value) {
            // const inputValue = parseInt(prompt('Enter service value:'));
            console.log("serfice")
            console.log(value)
            // setServiceValue(parseInt(value))
            // if (!isNaN(inputValue)) {
            //   setServiceValue(inputValue);
            // }
          } else if (isNaN(value)){
            setTaxValue(0);
          } else {
            setServiceValue(0);
          }
        } else if (switchName === 'discounts') {
          setDiscountsChecked(value);
          if (value) {
            // const inputValue = parseInt(prompt('Enter discounts value:'));
            console.log("diskon")
            console.log(value)
            // if (!isNaN(value)) {
            //   setDiscountsValue(inputValue);
            // }
          } else {
            setDiscountsValue(0);
          }
        }
      };

      return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Switch
              value={taxChecked}
              onValueChange={(value) => handleSwitchChange('tax', value)}
            />
            <Text style={styles.label}>Tax (%)</Text>
            {taxChecked && (
              <TextInput
                style={styles.input}
                value={taxValue.toString()}
                onChangeText={(text) => setTaxValue(parseInt(text))}
                keyboardType="numeric"
              />
            )}
          </View>
    
          <View style={styles.inputContainer}>
            <Switch
              value={serviceChecked}
              onValueChange={(value) => handleSwitchChange('service', value)}
            />
            <Text style={styles.label}>Service (%)</Text>
            {serviceChecked && (
              <TextInput
                style={styles.input}
                value={serviceValue.toString()}
                onChangeText={(text) => setServiceValue(parseInt(text))}
                keyboardType="numeric"
              />
            )}
          </View>
    
          <View style={styles.inputContainer}>
            <Switch
              value={discountsChecked}
              onValueChange={(value) => handleSwitchChange('discounts', value)}
            />
            <Text style={styles.label}>Discounts (%)</Text>
            {discountsChecked && (
              <TextInput
                style={styles.input}
                value={discountsValue.toString()}
                onChangeText={(text) => setDiscountsValue(parseInt(text))}
                keyboardType="numeric"
              />
            )}
          </View>
        </View>
      );
    };

    //selectedUsers.filter((item) => { !selectedUserid.some((item2)=>item2.user_id===item.user_id)})
    useEffect(()=>{
        console.log("re-render")
        console.log(users)
        console.log(selectedUsers)
    },[selectedUsers])

    // useEffect(()=>{
    //     console.log("re-render")
    // },[users])

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
            setUsers(newData);
            } catch (error) {
              // console.log(isUser_id)
              console.log('Error retrieving login status: ', error);
              return false; // Default value in case of error
            }
        }
        fetchData()
        console.log("useefek")
        console.log(selectedUsers)
        // setSelectedUsers()
      },[])

    return(
        <ScrollView className={{ flex: 1, backgroundColor: 'gray-100' }}>

        <View className="flex-1 bg-stone-300 ">
            <Text>ExpenseScreen</Text>
            {/* Input Bill Name */}
            {/* <TextInput variant="outlined" label="Bill Name" style={{ margin: 16 }} onChangeText={value=>setBillName(value)} /> */}
            <View className="flex form space-y-0.5 px-3 pt-3">
                <Text className="text-gray-700 ml-4">Bill Name</Text>
                <TextInput
                    className="p-4 bg-white text-gray-700 rounded-2xl mb-3"
                    value={billName}
                    placeholder='Enter Bill Name'
                    onChangeText={value=>setBillName(value)}
                />
            </View>

            {/* Add User */}
            <Modal 
                animationType="slide" 
                visible={showUserModal} 
                onRequestClose={()=>toggleUserModal()}
                >
                    <AddMembersModal 
                        users={users}
                        // const filteredArray = selectedUsers.filter(
                        //      (item) => !selectedUsersid.includes(item.id));
                        selectedUsers={selectedUsers} 
                        closeModal={toggleUserModal}//done
                        addSelectedUser={addSelectedUser}
                        removeSelectedUser={removeSelectedUser}
                    />
            </Modal>
            <UserCard users={selectedUsers} toggleUserModal={toggleUserModal} />

            {/* ADD EXPENSE(s) */}
            <AddExpenseComponent 
              expenses={expenses}
              newId={newId} 
              addExpense={addExpense} 
              deleteExpense={deleteExpense} 
              saveExpense={saveExpense}/>
            
            {/* INPUT TAX */}
            {/* INPUT SERVICES */}
            {/* INPUT DISCOUNTS */}
            <OptionalInputs/>

            {/* Confirm BIll */}
            <View style={styles.bottom}>
                <SwipeButtonScreen />
            </View>
            

        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    label: {
      marginLeft: 10,
    },
    input: {
      marginLeft: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 5,
      width: 100,
    },
    bottom: {
        flex: 1,
        paddingBottom: 50,
    },
  });