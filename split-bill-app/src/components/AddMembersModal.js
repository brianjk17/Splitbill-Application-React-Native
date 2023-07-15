import React, { useState,useEffect } from "react";
import { View, Text, SafeAreaView,TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import SwitchSelectorButton from "./SwitchSelectorButton";
import ContactCard from "./ContactCard";
import { FlatList } from "react-native";
import AddNonUserComponent from "./AddNonUserComponent";

export default function AddMembersModal({ nonUserId,
    users, selectedUsers, addSelectedUser, removeSelectedUser, closeModal,
    nonUser, addMembers, deleteMembers, checkUpdateMembers,
    verifyNonUser}){
    // function handleAddUser(){
    //     addSelectedUser({id:21, name:"Brian Joseph Keyrupan"});
    //     console.log("added ",selectedUsers)
    // }
    const [selectedUserstoAdd, setSelectedUserstoAdd] = useState([]);

    const [selectedIdtoAdd, setSelectedIdtoAdd] = useState([]);

    const [newName, setNewName] = useState("");
    
    //check if the phone is unique or not?
    const [newPhone, setNewPhone] = useState("")
    
    // const onSelect1 = (user, isSelected) => {
    //     if (isSelected) {
    //         setSelectedUserstoAdd([...selectedUserstoAdd,user])
    //     }else{
    //         let updatedContacts = selectedUserstoAdd.filter((item) => item.User.phone !== user.User.phone);
    //         setSelectedUserstoAdd(updatedContacts);
    //     }
    // };

    const onConfirm = (user, isSelected) => {
    };

    const onSelect = (user, isSelected) => {
        if (isSelected) {
            // setSelectedUserstoAdd((prevSelectedUsers) => [...prevSelectedUsers, user]);
            console.log(user.User.user_id)
            //add the id to selectedIdtoAdd
            // setSelectedIdtoAdd(selectedIdtoAdd)
            addSelectedUser(user)
            console.log("onselect add")
        } else {
            // removeSelectedUser((prevSelectedUsers) =>
            // prevSelectedUsers.filter((selectedUser) => selectedUser.id !== user.id));
            // console.log(selectedUserstoAdd)
            removeSelectedUser(user)
            console.log("onselect remove")
        }
    };

    //USERS FROM THE DB THAT ARE THEIR CONTACTS (1) refer useEffect
    //CHECK IF THE USER IS ALREADY SELECTED THEN REMOVE THE ONE IN THE USERS LIST

    //If true means add from contact
    //If false means add from non-user

    // const[typeofAdd, setTypeofAdd]=useState(true)
    const[typeofAdd, setTypeofAdd]=useState('contacts');
    function toggletypeofAdd(page){
        // console.log(typeofAdd === true)
        setTypeofAdd(page !== 'contacts' ? 'member' : 'contacts');
        // setTypeofAdd(!typeofAdd)
        // console.log(typeofAdd)
    }

    function renderContacts(user){
        // console.log("RENDER CONTACTS")
        // console.log(user.User.phone)
        return(<ContactCard
            key={user.User.phone}
            user={user}
            onSelect={onSelect}
            selectedUsers={selectedUsers}
        />)
    }

    // const [addedNonUser, setAddedNonUser] = useState([]);
    function confirmNonUserAdd(){
    // check if any of the nonusers have been modified or not //MODIFIED
        //check if the addedNonUser and the nonUserstoAdd have been deleted or not //DELETED
    // check if the phone numbers of the non members are unique from the DB //ADDED or MODIFIED

        //
        closeModal()
    }
    
    function confirmGoBack(){
        Alert.alert(
            'Confirmation',
            'Are you sure you want to go back?\nThis will discard all changes on the add member(s)',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                    closeModal()
                },
              },
            ],
            { cancelable: false }
          );
    }

    useEffect(()=>{
        //GET DATA FROM THE DB (1)
        //Dont forget to remove from the users if the users has been selected(selectedUsers)
        //users(are contacts), selectedUsers(parameters)
        console.log("re rendered")
    },[])

    useEffect(() => {
        console.log("State updated:", nonUser);
      }, [nonUser]);
      
    return(
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView style={{backgroundColor:"#EDEDED"}} contentContainerStyle={{ flexGrow: 1 }}>
                            
            <View>
                <View className="flex-row justify-start">
                    <TouchableOpacity
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                        onPress={()=>confirmGoBack()}
                    >
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
                <Text>AddMembersModal</Text>
                <SwitchSelectorButton changetype={toggletypeofAdd}/>
                {typeofAdd===  'contacts'? (
                    <View>
                        <Text>contacts</Text>
                        <SafeAreaView>
                            {/* <FlatList
                                data={users}
                                // showsHorizontalScrollIndicator={false}
                                renderItem={({item})=>renderContacts(item)}
                                keyExtractor={(item) => item.User.user_id}
                                keyboardShouldPersistTaps="always"
                                // contentContainerStyle={{ paddingBottom: 500 }}
                                style={{height:500}}
                            /> */}
                            {users.map((user) => renderContacts(user))}
                        </SafeAreaView>
                        {/* {users.map((user) => (
                            <ContactCard
                            key={user.phoneNumber}
                            user={user}
                            onSelect={handleSelectUser}
                            />
                        ))} */}
                        {/* <Text>Confirm add Button</Text> */}
                        <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity
                            // onPress={}
                            onPress={closeModal}
                            style={{
                                width: 300,
                                height: 75,
                                borderRadius: 30,
                                backgroundColor: '#8D8D8D',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 5,
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color:"white"}}>
                                    Confirm Add Contact(s)
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                ):(
                    <View style={{ flex: 1 }}>
                                <Text>non user</Text>

                                <AddNonUserComponent
                                    nonUser={nonUser}
                                    addMembers={addMembers}
                                    deleteMembers={deleteMembers}
                                    checkUpdateMembers={checkUpdateMembers}
                                    nonUserId={nonUserId}
                                />

                                <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        onPress={verifyNonUser}
                                        style={{
                                            width: 300,
                                            height: 75,
                                            borderRadius: 30,
                                            backgroundColor: '#8D8D8D',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 5,

                                        }}
                                    >
                                        <Text style={{
                                            textAlign: 'center',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color:"white"}}>
                                            Confirm Add Member(s)
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        
                )}
            </View>
            
            </ScrollView>
                    </KeyboardAvoidingView>
    )
}