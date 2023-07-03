import React, { useState,useEffect } from "react";
import { View, Text, SafeAreaView,TouchableOpacity } from "react-native";
import SwitchSelectorButton from "./SwitchSelectorButton";
import ContactCard from "./ContactCard";
import { FlatList } from "react-native";

export default function AddMembersModal({users, selectedUsers, addSelectedUser, removeSelectedUser, closeModal}){
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

    // const[users, setUsers]=useState( [
    //         { id: 1, name: 'John Doe', phoneNumber: '1234567890' },
    //         { id: 2, name: 'Jane Smith', phoneNumber: '9876543210' },
    //         { id: 3, name: 'Mike Johnson', phoneNumber: '5551234567' },
    //         { id: 1, name: 'John Doe', phoneNumber: '123456789011' },
    //         { id: 2, name: 'Jane Smith', phoneNumber: '987654321022' },
    //         { id: 3, name: 'Mike Johnson', phoneNumber: '555123456733' },
    //         { id: 1, name: 'John Doe', phoneNumber: '1234567890111' },
    //         { id: 2, name: 'Jane Smith', phoneNumber: '9876543210222' },
    //         { id: 3, name: 'Mike Johnson', phoneNumber: '5551234512367' },
    //         { id: 1, name: 'John Doe', phoneNumber: '12345678190' },
    //         { id: 2, name: 'Jane Smith', phoneNumber: '98761354324110' },
    //         { id: 3, name: 'Mike Johnson', phoneNumber: '5512351234567' },
    //         { id: 1, name: 'John Doe', phoneNumber: '123456317890' },
    //         { id: 2, name: 'aaaJane Smith', phoneNumber: '987651143210' },
    //         { id: 3, name: 'aaaMike Johnson', phoneNumber: '5551211114567' },
    //       ]
    // )

    //If true means add from contact
    //If false means add from non-user
    const[typeofAdd, setTypeofAdd]=useState(true)
    function toggletypeofAdd(){
        setTypeofAdd(!typeofAdd)
        console.log(typeofAdd)
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
    useEffect(()=>{
        //GET DATA FROM THE DB (1)
        //Dont forget to remove from the users if the users has been selected(selectedUsers)
        //users(are contacts), selectedUsers(parameters)
        console.log("re rendered")
        //check if the users are selected then set isSelected


    },[])

    return(
            <View>
                <View className="flex-row justify-start">
                    <TouchableOpacity
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                        onPress={closeModal}
                    >
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
                <Text>AddMembersModal</Text>
                <SwitchSelectorButton changetype={toggletypeofAdd}/>
                {typeofAdd?(
                    <View>
                        <Text>contacts</Text>
                        <SafeAreaView>
                            <FlatList
                                data={users}
                                // showsHorizontalScrollIndicator={false}
                                renderItem={({item})=>renderContacts(item)}
                                keyExtractor={(item) => item.User.user_id}
                                keyboardShouldPersistTaps="always"
                                // contentContainerStyle={{ paddingBottom: 500 }}
                                style={{height:500}}
                            />
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
                                backgroundColor: '#f0f0f0',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 5,
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 16,
                                    fontWeight: 'bold',}}>
                                    Confirm Add Members Button
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                ):(
                    <View>
                        <Text>non user</Text>
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
                                backgroundColor: '#f0f0f0',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 5,
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 16,
                                    fontWeight: 'bold',}}>
                                    Confirm Add Members Button
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
    )
}