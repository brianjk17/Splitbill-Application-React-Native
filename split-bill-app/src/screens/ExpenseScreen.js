import React, { useEffect,useRef,useState } from "react";
import { Modal,Text ,View ,TextInput, StyleSheet, Switch, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
// import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'
import UserCard from "../components/UserCard";
import AddMembersModal from "../components/AddMembersModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../supabase-service";
import SwipeButtonScreen from "../components/SwipeButton";
// import { TextInput } from "@react-native-material/core";
import AddExpenseComponent from "../components/AddExpenses/AddExpenseComponent";
import { TouchableOpacity } from "react-native";
import EvenlySwipeButton from "../components/EvenlySwipeButton";
import SwitchSelector from "react-native-switch-selector";


export default function ExpenseScreen({toggleExpenseModal}){
  const[showUserModal, setShowUserModal]=useState(false)

  // const[showExpenserModal, setShowExpenseModal]=useState(false)

  const[billName, setBillName]=useState("")
  
  const[billOwner, setBillOwner]=useState(null)

  function clickSetBillOwner(){
    console.log("SET BILL OWNER")
    if(selectedUserPhone===null){
      console.log("selectedUserPhone is: ",selectedUserPhone)
      console.log("above should be null")
      return
    }
    setBillOwner(selectedUserPhone)
    console.log(billOwner)
  }

  const[selectedUsers, setSelectedUsers]=useState([
          // { id: 5, name: 'John Doe', phone: '1234567890'},
          // { id: 20, name: 'Jane Smith', phone: '9876543210'},
          // { id: 31, name: 'Mike Johnson', phone: '5551234567'},
          // { id: 17, name: 'Keyrupan Brian Joseph', phone:"234567890"},
      ]
  )


  //For assigning the expenses for the users
  const[selectedUserPhone, setSelectedUserPhone]=useState(null)
  // 018231871237
  function chooseUserPhone(userPhone){
    console.log("chooseUserPhone")
    console.log(userPhone)
    setSelectedUserPhone(userPhone)
  }

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

  function assignExpense(expenseId){
    console.log("assignExpense")
    if (selectedUserPhone===null){
      console.log("selectedUserPhone is: ",selectedUserPhone)
      console.log("above should be null")
      return
    }

    console.log(expenses)
    console.log(selectedUserPhone)

    const modifyExpenseMembers = expenses.find(expense => expense.id === expenseId);
    console.log(modifyExpenseMembers)
    if(modifyExpenseMembers&&modifyExpenseMembers.members.includes(selectedUserPhone)){
      console.log(selectedUserPhone, " is already in expense.id ",expenseId)
      //remove the phone from members
      const indexToRemove = modifyExpenseMembers.members.indexOf(selectedUserPhone);
      modifyExpenseMembers.members.splice(indexToRemove,1)
    }
    else if(modifyExpenseMembers){
      modifyExpenseMembers.members.push(selectedUserPhone)
      console.log(selectedUserPhone, " added into expense ",expenseId)
    }
    console.log("New Array")
    console.log(expenses)
    setExpenses([...expenses]);
  }

  function toggleCheckExpenses(){
    // each time the chooseUserPhone function is called
    // check all the user's expense cards and give check

    //rerenders when the expense is clicked
    //rerenders when the selecteduser changes
    //set all to !selected when selecteduser is null
  }

  //ADD Expense
  const [newId, setNewId] = useState(1);

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
  
  //ADD nonUsers/members
  const [prevMembersData, setPrevMembersData] = useState(
    [
      //  {
      //   "User":  {
      //     "name": "Gggv",
      //     "nonUserId": 1,
      //     "phone": "88888888",
      //   },
      // },
      //  {
      //   "User":  {
      //     "name": "Fhhhujjj",
      //     "nonUserId": 2,
      //     "phone": "333333333",
      //   },
      // },
    ]
  );
  const [nonUser, setNonUser] = useState([]);
  const [nonUserId, setNonUserId] = useState(1);

  function addMembers(){
    const newNonUserId = nonUserId + 1;
    console.log(nonUser)
    setNonUser((prevMembers) => [
      ...prevMembers,
      {User:{ nonUserId: nonUserId, name: "", phone: "" }},
    ]);
    setNonUserId(newNonUserId)
    console.log(nonUser)
  }

  const deleteMembers = (id) =>{
    // setMembers((members) => {
    //   const updatedMembers = members.filter((member) => member.User.nonUserId === id);
    //   return updatedMembers;
    // });
    console.log(id)
    const updatedMembers = nonUser.filter((member) => member.User.nonUserId !== id);
    console.log(updatedMembers)
    setNonUser(updatedMembers);
    console.log("nonUser")
    console.log(nonUser)

    //DELETE THE member in selectedUser
    // const index = selectedUsers.findIndex((member) => member.User.phone === phone);
    // if (index !== -1) {
    //   console.log('Object removed');
    //   // setMembers(updatedUsers);
    //   setSelectedUsers((prevArray) => {
    //     const newArray = [...prevArray];
    //     newArray.splice(index, 1);
    //     return newArray;
    //   });
    // } else {
    //   // Object not found
    //   console.log(phone, 'not found');
    // }
  }

  function checkUpdateMembers(updatedData){
    console.log("checkUpdateMembers")
    console.log(nonUser)
    console.log(updatedData.User.name)
    setNonUser((prevNonUser) => {
      return prevNonUser.map((member) => {
        if (member.User.nonUserId === updatedData.User.nonUserId) {
          return updatedData;
        }
        return member;
      });
    });
    // setNonUser(updatedMembers);
    console.log("checkUpdateMembers")
    console.log(nonUser)
  }

  async function verifyAllMembers(){
    // check if any of the nonusers have been modified or not //MODIFIED
    // check if the prevMembersData[] and the members[] have been deleted or not //DELETED
    
    function updateArrays(){
      // console.log("prevMembersData")
      // console.log(prevMembersData)

      // console.log("selectedusers")
      // console.log(selectedUsers)

      // console.log("nonUser")
      // console.log(nonUser)

      //REMOVE
      const removedObjects = prevMembersData.filter((obj1) => !nonUser.some((obj2) => obj2.User.nonUserId === obj1.User.nonUserId));
      console.log('Removed objects:', removedObjects);
      //remove the objects on the selected users
      //delete by the phone number
      // Get the nonUserids from dataArray2
      
      if(removedObjects.length>0){
        // const nonUseridsToRemove = removedObjects.map((item) => item.User.nonUserid);
        // console.log("nonUseridsToRemove")
        // console.log(nonUseridsToRemove)
        // // Remove objects from dataArray1 based on nonUserids
        // const updatedArray = selectedUsers.filter(
        //   (item) => !nonUseridsToRemove.includes(item.User.nonUserid)
        // );
        const modifiedUsers = selectedUsers.filter((user) => {
          return !removedObjects.some(
            (prevUser) =>
              prevUser.User.nonUserId === user.User.nonUserId
          )
        });
        setSelectedUsers(modifiedUsers)
      }else{
        console.log("Nothing removed")
        // toggleUserModal()
      }
      

      //ADD
      const addedObjects = nonUser.filter((obj2) => !prevMembersData.some((obj1) => obj1.User.nonUserId === obj2.User.nonUserId));
      console.log('Added objects:', addedObjects);
      //store the added objects on the selected users
      if(addedObjects.length>0){
        setSelectedUsers([...selectedUsers, ...addedObjects]);
        console.log('prevMembersData:', prevMembersData);
        console.log(selectedUsers)
      }else{
        console.log('Nothing added')
        // toggleUserModal()
      }
      

      // MODIFIED
      const modifiedObjects = nonUser.filter((obj1) => {
        const obj2 = prevMembersData.find(
          (obj2) => obj2.User.nonUserId === obj1.User.nonUserId);
          if (obj2) {
            // Compare the properties of the member object and prevMemberObj to check for modifications
            const isModified =
            obj1.User.name !== obj2.User.name ||
            obj1.User.phone !== obj2.User.phone;
        
            return isModified;
          }
          return false;
        // return obj2 && (obj1.User.name !== obj2.User.name || obj1.User.phone !== obj2.User.phone);
      });
      console.log('Modified objects:', modifiedObjects);

      if(modifiedObjects.length>0){
        const modifiedUsers = selectedUsers.map((user) => {
          const matchingNonUser = modifiedObjects.find(
            (nonUserObj) => nonUserObj.User.nonUserId === user.User.nonUserId
          );
        
          if (matchingNonUser) {
            return {
              User: {
                ...user.User,
                name: matchingNonUser.User.name,
                phone: matchingNonUser.User.phone,
              },
            };
          }
        
          return user;
        });
        setSelectedUsers(modifiedUsers)
      }else{
        console.log("Nothing Modified")
        // toggleUserModal()
      }

      // //update the modified to the selected users
      // const updatedArray1 = selectedUsers.map((obj1) => {
      //   const obj2 = modifiedObjects.find((obj) => obj.User.nonUserid === obj1.User.nonUserid);
      //   if (obj2) {
      //     return { User: { ...obj1.User, ...obj2.User } };
      //   }
      //   return obj1;
      // });
      
      // setSelectedUsers(updatedArray1)

      setPrevMembersData(nonUser)
      console.log(prevMembersData)
      console.log(nonUser)
      console.log("selectedUsers")
      console.log(selectedUsers)
    }

    
    // check if the phone numbers of the non members are unique from the DB //ADDED or MODIFIED
    async function verify(){
      const phoneNumbers = nonUser.map((item) => item.User.phone);
      console.log("call SUPABASE to verify phonenumbers")
      console.log(phoneNumbers)
      const { data, error } = await supabase
            .from('User')
            .select()
            .in('phone', phoneNumbers)
      console.log("verify")
      console.log(data?.length)
      console.log(data)

      if (error){
        console.log(error)
        return false
      } else if (data?.length === 0) {
        console.log("proceed")
        return data
      } else{
        return data
      }
    }
    
    if(JSON.stringify(prevMembersData) === JSON.stringify(nonUser)){
      console.log("No changes")
      console.log(prevMembersData)
      console.log(nonUser)
      // console.log(selectedUsers)
      toggleUserModal()
    }else{
      // updateArrays()
      console.log("HAH")
      console.log(nonUser===[])
      if(nonUser.length===0){
        console.log("No users")
        updateArrays()
        setPrevMembersData(nonUser)
        toggleUserModal()
        // onSaveNonUser()
      }

      console.log("verifyAllMembers")
      console.log(prevMembersData)
      console.log(nonUser)
      console.log(JSON.stringify(prevMembersData) === JSON.stringify(nonUser))

      for (const item of nonUser){
        const { name, phone } = item.User;
        console.log(name, phone)

        if(name.trim() !== '' && phone.length > 5){
          const isVerified = await verify();
          const currentPhone = await AsyncStorage.getItem('phone');
          

          console.log("isVerified")
          console.log(users)
          console.log(isVerified===false)

          const phoneNumberExists = selectedUsers.some(
            obj => obj.User.phone === phone
          );
          
          const phoneNumberContacts = users.some(
            obj => obj.User.phone === phone
          );

          //check if the used number is current user
          if(isVerified.length!==0 && isVerified[0].phone===currentPhone){
            alert(name+" This phone number is your phone number")
            break
          } 
          //check if the used number is in the nonmembers
          else if(isVerified!==null && phoneNumberExists){
            alert("This phone number is already in the list of bill members")
            break
          } 
          //check if the used number is in the contacts
          else if(isVerified!==null && phoneNumberContacts){
            alert("This phone number is in your contacts")
            break
          }
          else if(isVerified.length!==0){
            alert(name+"'s phone number is used\n"+phone)
            break
          } 

          //if the number is in the system but not in contacts, change the name and store the user data

          else{
            console.log("verified")
            updateArrays()
            setPrevMembersData(nonUser)
            toggleUserModal()
            return
          }
        }else{
          alert("Please check all inputs")
          return
        }
      }
      // if(nonUser.length===0){
      //   updateArrays()
      //   setPrevMembersData(nonUser)
      //   toggleUserModal()
      // }
      console.log("???")
    }
  }

  function toggleUserModal(){
      console.log("toggleUserModal")
      // console.log(showUserModal)
      setShowUserModal(!showUserModal);

      // console.log(nonUser)
      setNonUser(prevMembersData)
      console.log(nonUser)
  }

  const addSelectedUser = (user) => {
      console.log("addSelectedUser")

      // console.log("user")
      // console.log(user)
      // console.log("selectedUsers")
      // console.log(selectedUsers)
      // console.log("Users")
      // console.log(users)

      setSelectedUsers([...selectedUsers,user])
      // setSelectedUserid([...selectedUserid, {"user_id":user.User.user_id, "chosen": false}]);
      // console.log(selectedUserid)
      // setSelectedUsers([...selectedUserid,user])
      // console.log(users)
      // let updatedContacts = users.filter((item) => {item.User.phone !== user.User.phone});
      // setUsers(updatedContacts);
      // console.log("should be empty")

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
    let updatedContacts = selectedUsers.filter((item) => item.User.phone !== user.User.phone);
    setSelectedUsers(updatedContacts);
    console.log(selectedUsers)

    //reset selected user
    setSelectedUserPhone(null)
    // if removed user is the bill owner, set billowner to null
    if(billOwner===user.User.phone){
      setBillOwner(null)
    }


    //add the user back to the users from the selected
    // setUsers([...users,user])
    // setSelectedUsers([...selectedUsers,user])

    // console.log("user")
    // console.log(user)
    // console.log("selectedUsers")
    // console.log(selectedUsers)
    // console.log("Users")
    // console.log(users)

    //REMOVE THE USERS FROM THE EXPENSES
    const updatedExpenses = expenses.map(expense => {
      const updatedMembers = expense.members.filter(memberId => memberId !== user.User.phone);
      console.log(updatedMembers)
      return { ...expense, members: updatedMembers };
    });
    console.log(updatedExpenses)
    console.log("setExpenses")
    setExpenses(updatedExpenses)
    console.log(expenses)
  };
  //IN Number
  const [taxValueNumber, setTaxValueNumber] = useState("");
  const [serviceValueNumber, setServiceValueNumber] = useState("");
  const [discountsValueNumber, setDiscountsValueNumber] = useState("");

  // const [total, setTotal] = useState(0)
  function getTotal(){
    let totalBill=0
    expenses.forEach(expense=>{
      totalBill+=parseInt(expense.price)
    })
    return totalBill
  }
  const handleTaxInputNumberChange = (text) => {
    const filteredText = text.replace(/[^0-9.]/g, '');
    if (filteredText.startsWith('.')) {
      return;// Make sure only one decimal point exists
    }
    const decimalCount = filteredText.split('.').length - 1;
    if (decimalCount > 1) {
      return;
    }

    setTaxValueNumber(filteredText);
    setTaxValue((parseFloat(filteredText)/getTotal())*100)
  };

  const handleServiceInputNumberChange = (text) => {
    const filteredText = text.replace(/[^0-9.]/g, '');
    if (filteredText.startsWith('.')) {
      return;// Make sure only one decimal point exists
    }
    const decimalCount = filteredText.split('.').length - 1;
    if (decimalCount > 1) {
      return;
    }
    setServiceValueNumber(filteredText);
    setServiceValue((parseFloat(filteredText)/getTotal())*100)
  };

  const handleDiscountsInputNumberChange = (text) => {
    const filteredText = text.replace(/[^0-9.]/g, '');
    if (filteredText.startsWith('.')) {
      return;// Make sure only one decimal point exists
    }
    const decimalCount = filteredText.split('.').length - 1;
    if (decimalCount > 1) {
      return;
    }
    setDiscountsValueNumber(filteredText);
    setDiscountsValue((parseFloat(filteredText)/getTotal())*100)
  };

  
  //IN PERCENTAGE
  const [taxValue, setTaxValue] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [discountsValue, setDiscountsValue] = useState("");

  const handleTaxInputChange = (text) => {
    const filteredText = text.replace(/[^0-9.]/g, '');
    if (filteredText.startsWith('.')) {
      return;
    }
    const decimalCount = filteredText.split('.').length - 1;
    if (decimalCount > 1) {
      return;
    }
    setTaxValue(filteredText);
    // onValuesChange({ taxValue: filteredText, serviceValue, discountsValue });
  };

  const handleServiceInputChange = (text) => {
    const filteredText = text.replace(/[^0-9.]/g, '');

    if (filteredText.startsWith('.')) {
      return;
    }

    const decimalCount = filteredText.split('.').length - 1;
    if (decimalCount > 1) {
      return;
    }

    setServiceValue(filteredText);
    // onValuesChange({ taxValue, serviceValue: filteredText, discountsValue });
  };

  const handleDiscountsInputChange = (text) => {
    const filteredText = text.replace(/[^0-9.]/g, '');

    if (filteredText.startsWith('.')) {
      return;
    }

    const decimalCount = filteredText.split('.').length - 1;
    if (decimalCount > 1) {
      return;
    }

    setDiscountsValue(filteredText);
    // onValuesChange({ taxValue, serviceValue, discountsValue: filteredText });
  };
  


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

            //CHECK IF THE USER IS ALREADY IN THE STATE
            // IF YES THEN SKIP THIS QUERY
            // OR STORE DATA IN ASYNC STORAGE DURING LOGIN
            //const isUser_id = await AsyncStorage.getItem('user_id');

            if(selectedUsers.length===0){
              console.log("Current User Data");

              //GET ASYNC DATA
              try {
                const currentPhone = await AsyncStorage.getItem('phone');
                const currentUser_id = await AsyncStorage.getItem('user_id');
                const currentName = await AsyncStorage.getItem('name');
                const newFormat=(
                  {
                    User: 
                      {
                        user_id: currentUser_id,
                        name: currentName,
                        phone: currentPhone
                      }
                  }
                )
                setSelectedUsers(prevState => [...prevState, newFormat])
                console.log(selectedUsers)
              } catch (error) {
                  console.log('Error retrieving login status: ', error);
                  return; // Default value in case of error
              }
              
              // const { data: thirdData, error: thirdError } = await supabase
              //   .from('User')
              //   .select("user_id, name ,phone")
              //   .eq('user_id', isUser_id)
              // if (thirdError) {
              //   console.error('Error fetching 3rd current user:', thirdError);
              //   return thirdError;
              // } else if (thirdData === undefined || thirdData.length === 0) {
              //   console.log("3rd: " + thirdData);
              // } else {
              //   console.log("thirdData");
              //   console.log(thirdData[0]);
              //   const newFormat=(
              //     {
              //       User: 
              //         {
              //           user_id: thirdData[0].user_id,
              //           name: thirdData[0].name,
              //           phone: thirdData[0].phone
              //         }
              //     }
              //   )
              //   console.log(newFormat)
              //   //GET ASYNC DATA
              //   setSelectedUsers(prevState => [...prevState, newFormat])
              //   console.log(selectedUsers)
              //   console.log("selectedUsers")
              // }
            }
            console.log("thirdDataaaa");
          } catch (error) {
            // console.log(isUser_id)
            console.log('Error retrieving user data: ', error);
            return false; // Default value in case of error
          }
      }
      fetchData()
      console.log("useefek")
      console.log(selectedUsers)
      // setSelectedUsers()
    },[])


  async function confirmBill(){
    console.log("confirmBill")
    if(billName.length===0){
      alert("Please give the bill name")
    } else if(selectedUsers.length===1){
      alert("The split bill must have more than 1 person")
    } else if(expenses.length===0){
      alert("No expenses added yet")
    } else if(billOwner===null){
      alert("Please set the bill owner")
    } else if(selectedUsers.every((user) =>
      expenses.some((item) => item.members.includes(user.User.phone)))===false){
      alert("Please make sure all the users has an expense")
    } else if (expenses.some((item) => item.members.length === 0)){
      alert("Please make sure all the expense has a user assigned to it")
    } else if(taxValue>100||serviceValue>100||discountsValue>100){
      alert("The tax or service or discounts couldn't exceed 100%")
    }
    //const decimalValue = parseFloat(filteredText);
    //check if selected users only 1 meaning,. only himself
    //check bill owner
    //check if all the members of the bill has an expense
    //check if all expense has a member
    //check the optional inputs, check if all optional input is less than 100% or an invalid input
    else{
      console.log("CONFIRM BILL TO BE SPLITTED")
      console.log(billName)
      console.log(selectedUsers)
      console.log(expenses)
      console.log(billOwner)
      console.log(taxValue)
      console.log(serviceValue)
      console.log(discountsValue)

      function check(value){
        if(value.length<1||parseInt(value)<1){
          return 0
        }else{
          return parseInt(value)
        }
      }
      

      async function addintoDB(){
        JSON.stringify(expenses)
        const { error } = await supabase
        .from('Bill')
        .insert({
          payee_phone:billOwner,//phone
          bill_name: billName,
          tax: check(taxValue),
          service: check(serviceValue),
          discount: check(discountsValue),
          expenses: expenses,
          members: selectedUsers,
          paid: false,
        })
        if (error) {
            //error will throw here
            console.log("erererereor")
            console.log(error)
            // throw error;
            alert("Failed to add Bill, please try again")
        }else{
            console.log("Bill added")
        }
      }

      Alert.alert(
        'Confirmation',
        'Are you sure you want to proceed?',
        [
          {
            text: 'Cancel',
            // style: 'cancel',
            onPress: () => {
              console.log("Canceled")
            },
          },
          {
            text: 'OK',
            onPress: () => {
              //STORE TO SUPABASE
              console.log('Confirmed');
              
              addintoDB()

              alert("Bill succefully created")
              //OPEN RESULT MODAL
              //CLOSE EXPENSE SCREEN MODAL
              toggleExpenseModal()
            },
          },
        ],
        { cancelable: false }
      );
    }
  }

  function confirmGoBack(){
    Alert.alert(
        'Confirmation',
        'Are you sure you want to go back?\nThis will discard all data inputted',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              toggleExpenseModal()
            },
          },
        ],
        { cancelable: false }
      );
  }

  // function setExpensesEvenly(){
  //   //get all members phonenumber in an array
  //   let phoneMembers=[]
  //   for (let i = 0; i < selectedUsers.length; i++) {
  //     phoneMembers.push(selectedUsers[i].User.phone);
  //   }

  //   //assign all users to all the expenses
  //   for (let i = 0; i < expenses.length; i++) {
  //     expenses[i].members = phoneMembers;
  //   }
  // }
  function evenlySplit(){
    console.log("Evenly confirm Bill")
    if(billName.length===0){
      alert("Please give the bill name")
    } else if(selectedUsers.length===1){
      alert("The split bill must have more than 1 person")
    } else if(expenses.length===0){
      alert("No expenses added yet")
    } else if(billOwner===null){
      alert("Please set the bill owner")
    } else if(taxValue>100||serviceValue>100||discountsValue>100){
      alert("The tax or service or discounts couldn't exceed 100%")
    }
    //const decimalValue = parseFloat(filteredText);
    //check if selected users only 1 meaning,. only himself
    //check bill owner
    //check if all the members of the bill has an expense
    //check if all expense has a member
    //check the optional inputs, check if all optional input is less than 100% or an invalid input
    else{
      console.log("CONFIRM BILL TO BE SPLITTED")
      console.log(billName)
      console.log(selectedUsers)
      console.log(expenses)
      console.log(billOwner)
      console.log(taxValue)
      console.log(serviceValue)
      console.log(discountsValue)

      let phoneMembers=[]
      for (let i = 0; i < selectedUsers.length; i++) {
        phoneMembers.push(selectedUsers[i].User.phone);
      }

      //assign all users to all the expenses
      for (let i = 0; i < expenses.length; i++) {
        expenses[i].members = phoneMembers;
      }

      function check(value){
        if(value.length<1||parseInt(value)<1){
          return 0
        }else{
          return parseInt(value)
        }
      }

      async function addintoDB(){
        JSON.stringify(expenses)
        const { error } = await supabase
        .from('Bill')
        .insert({
          payee_phone:billOwner,//phone
          bill_name: billName,
          tax: check(taxValue),
          service: check(serviceValue),
          discount: check(discountsValue),
          expenses: expenses,
          members: selectedUsers,
          paid: false,
        })
        if (error) {
            //error will throw here
            console.log("erererereor")
            console.log(error)
            // throw error;
            alert("Failed to add Bill, please try again")
        }else{
            console.log("Bill added")
        }
      }

      Alert.alert(
        'Confirmation',
        'Are you sure you want to proceed?',
        [
          {
            text: 'Cancel',
            // style: 'cancel',
            onPress: () => {
              console.log("Canceled")
            },
          },
          {
            text: 'OK',
            onPress: () => {
              //STORE TO SUPABASE
              console.log('Confirmed');
              
              addintoDB()

              alert("Bill succefully created")
              //OPEN RESULT MODAL
              //CLOSE EXPENSE SCREEN MODAL
              toggleExpenseModal()
            },
          },
        ],
        { cancelable: false }
      );
    }
  }
  const [billStatus, setBillStatus] = useState('expense');
  const handleSwitchChange = (value) => {
    setBillStatus(value);
  };

  const [optionalInput, setOptionalInput] = useState('percent')
  const handleOptionalChange = (value) => {
    setOptionalInput(value);
    setTaxValueNumber('')
    setServiceValueNumber('')
    setDiscountsValueNumber('')
    setTaxValue('')
    setServiceValue('')
    setDiscountsValue('')
  };

  return(
    <KeyboardAvoidingView behavior="none" style={{ flex: 1 }}>

      <ScrollView className="flex-1 " style={{backgroundColor:"#EDEDED"}}>
        <View style={{ flex: 1, backgroundColor: '#FFE562', }}>

            <TouchableOpacity
              className="bg-[#343434] text-white p-2 rounded-tr-2xl rounded-bl-2xl ml-2 w-16 justify-center items-center"
              onPress={confirmGoBack}
            >
               <Text className="text-white font-bold text-base">Back</Text>
            </TouchableOpacity>

            {/* <Text>ExpenseScreen</Text> */}

            {/* Input Bill Name */}
            {/* <TextInput variant="outlined" label="Bill Name" style={{ margin: 16 }} onChangeText={value=>setBillName(value)} /> */}
            {/* <View className="flex form space-y-0.5 px-3 pt-3 "> */}

            <View style={{ padding: 5, marginBottom: 10  }}
              className="bg-[#A6A6A6] rounded-2xl px-4 pb-6 mx-3 mt-3">
                <Text style={{ fontSize: 18, fontWeight: 'bold'}} className="my-2">Bill Name</Text>
                <TextInput
                  className="p-4 bg-white text-gray-700 rounded-2xl "
                  style={{ fontSize: 15, fontWeight: 'bold'}}
                    // className="p-4 bg-[#A6A6A6] text-gray-700 rounded-2xl mb-3"
                    value={billName}
                    placeholder='Enter Bill Name'
                    onChangeText={value=>setBillName(value)}
                />
            </View>

            {/* Add User */}
            <Modal 
                animationType="fade" 
                visible={showUserModal} 
                onRequestClose={()=>toggleUserModal()}
            >
                <AddMembersModal
                    users={users}
                    selectedUsers={selectedUsers} 
                    closeModal={toggleUserModal} //done
                    verifyNonUser={verifyAllMembers}
                    addSelectedUser={addSelectedUser}
                    removeSelectedUser={removeSelectedUser}
                    nonUser={nonUser}
                    addMembers={addMembers}
                    checkUpdateMembers={checkUpdateMembers}
                    deleteMembers={deleteMembers}
                    nonUserId={nonUserId}
                />
            </Modal>

            <UserCard 
              users={selectedUsers} 
              toggleUserModal={toggleUserModal} 
              selectedUserPhone={selectedUserPhone} 
              chooseUserPhone={chooseUserPhone}
              billowner={billOwner}
              clickSetBillOwner={clickSetBillOwner}
            />

            {/* ADD EXPENSE(s) */}
            <AddExpenseComponent 
              expenses={expenses}
              newId={newId} 
              addExpense={addExpense} 
              deleteExpense={deleteExpense} 
              saveExpense={saveExpense}
              assignExpense={assignExpense}
              selectedUsers={selectedUsers}
            />

               


            <View className="bg-[#A6A6A6] rounded-2xl px-4 py-3 mt-6 mx-3 ">
              <SwitchSelector
                options={[
                  { label: 'In %', value: 'percent' },
                  { label: 'In Decimal', value: 'num' },
                ]}
                initial={0}
                onPress={handleOptionalChange}
                // textColor="black"
                // selectedColor="black"
                buttonColor="#3482F6"
                style={{paddingBottom:5}}
              />
              {optionalInput === 'percent' ? (
                  <View>
                    
                    {/* INPUT TAX */}
                    <View style={styles.inputContainer}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 0 }}>Tax (%):             </Text>
                        <TextInput
                          className="p-4 bg-white text-gray-700 rounded-2xl w-40 ml-1"
                          style={{ fontSize: 15, fontWeight: 'bold'}}
                          value={taxValue}
                          // onChangeText={handleTaxInputChange}
                          onChangeText={value=>handleTaxInputChange(value)}
                          keyboardType="numeric"
                        />
                    </View>

                    {/* INPUT SERVICES */}
                    <View style={styles.inputContainer}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 0 }}>Service (%):      </Text>
                        <TextInput
                          className="p-4 bg-white text-gray-700 rounded-2xl w-40 ml-1"
                          style={{ fontSize: 15, fontWeight: 'bold'}}
                          value={serviceValue}
                          // onChangeText={handleServiceInputChange}
                          onChangeText={value=>handleServiceInputChange(value)}
                          keyboardType="numeric"
                        />
                    </View>

                    {/* INPUT DISCOUNTS */}
                    <View style={styles.inputContainer}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 0 }}>Discounts (%): </Text>
                        <TextInput
                          className="p-4 bg-white text-gray-700 rounded-2xl w-40 ml-1"
                          style={{ fontSize: 15, fontWeight: 'bold'}}
                          value={discountsValue}
                          // onChangeText={handleDiscountsInputChange}
                          onChangeText={value=>handleDiscountsInputChange(value)}
                          keyboardType="numeric"
                        />
                    </View>

                  </View>
                ) : (
                  // NUMBER input
                  <View style={{flex:1, alignContent:"center", justifyContent:"center"}}>
                      {/* INPUT TAX */}
                      <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 0 }}>Tax:             </Text>
                          <TextInput
                            className="p-4 bg-white text-gray-700 rounded-2xl w-40 ml-1"
                            style={{ fontSize: 15, fontWeight: 'bold'}}
                            value={taxValueNumber}
                            onChangeText={value=>handleTaxInputNumberChange(value)}
                            keyboardType="numeric"
                          />
                      </View>

                      {/* INPUT SERVICES */}
                      <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 0 }}>Service:      </Text>
                          <TextInput
                            className="p-4 bg-white text-gray-700 rounded-2xl w-40 ml-1"
                            style={{ fontSize: 15, fontWeight: 'bold'}}
                            value={serviceValueNumber}
                            // onChangeText={handleServiceInputChange}
                            onChangeText={value=>handleServiceInputNumberChange(value)}
                            keyboardType="numeric"
                          />
                      </View>

                      {/* INPUT DISCOUNTS */}
                      <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 0 }}>Discounts: </Text>
                          <TextInput
                            className="p-4 bg-white text-gray-700 rounded-2xl w-40 ml-1"
                            style={{ fontSize: 15, fontWeight: 'bold'}}
                            value={discountsValueNumber}
                            // onChangeText={handleDiscountsInputChange}
                            onChangeText={value=>handleDiscountsInputNumberChange(value)}
                            keyboardType="numeric"
                          />
                      </View>
                  </View>
              )}

              

            </View>

            <View className="mt-5 mx-3">
              <SwitchSelector
                options={[
                  { label: 'Split According to Expense', value: 'expense' },
                  { label: 'Split Evenly', value: 'even ' },
                ]}
                initial={0}
                onPress={handleSwitchChange}
                // textColor="black"
                // selectedColor="black"
                buttonColor="#3482F6"
              />
            </View>

            <View className="flex-1 items-center py-1">

            {/* Confirm BIll */}
            {billStatus === 'expense' ? (
                <View style={styles.bottom}>
                    <SwipeButtonScreen confirmBill={confirmBill}/>
                </View>
              ) : (
                // evenly split evenlySplit
                <View style={styles.bottom}>
                  <EvenlySwipeButton confirmBill={evenlySplit}/>
                </View>
            )}



            </View>

            {/* RESULT MODAL */}
            {/* <Modal 
                animationType="fade" 
                visible={showUserModal} 
                onRequestClose={()=>toggleUserModal()}
            >
                <AddMembersModal
                    users={users}
                    selectedUsers={selectedUsers} 
                    closeModal={toggleUserModal} //done
                    verifyNonUser={verifyAllMembers}
                    addSelectedUser={addSelectedUser}
                    removeSelectedUser={removeSelectedUser}
                    nonUser={nonUser}
                    addMembers={addMembers}
                    checkUpdateMembers={checkUpdateMembers}
                    deleteMembers={deleteMembers}
                    nonUserId={nonUserId}
                />
            </Modal> */}
            
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
      paddingBottom: 55,
  },
});