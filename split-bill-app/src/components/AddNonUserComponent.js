import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, KeyboardAvoidingView, ScrollView } from "react-native";

const MutableCard = ({member, deleteMembers, checkUpdateMembers,nonUserId }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  console.log("MutableCard")
  console.log(member.User.nonUserId)
  console.log(nonUserId)
  

//   const handleUpdate = () => {
//     if(name===''||phone.length<7){
//         alert("Please complete all fields")
//       }
//     else{
//         //check check phone in db
//         const updatedexpense = {User:{
//             id: member.User.nonUserId,
//             name: name,
//             phone: phone,
//         }}
//         checkUpdateMembers(member.User.nonUserId,updatedexpense);
//       }
//   };

   function handleNameChange(text){
    console.log("handleNameChange")
    setName(text)
    // checkUpdateMembers(member.User.nonUserId,{ name: text })
    const updatedMember = {
        User: {
          phone: phone,
          name: text,
          nonUserId: nonUserId
        },
      };
    checkUpdateMembers(updatedMember)
    console.log(member)
   }

   function handlePhoneChange(text){
    const filteredText = text.replace(/[^0-9.]/g, '');
    setPhone(filteredText)
    const updatedMember = {
        User: {
            phone: text,
            name:name,
            nonUserId: member.User.nonUserId
          },
      };
    checkUpdateMembers(updatedMember);
    console.log(member)
   }

  const handleDelete = () => {
    console.log("handleDelete")
    console.log(member.User.nonUserId)
    deleteMembers(member.User.nonUserId);
    console.log(member);
  };

  useEffect(()=>{
    console.log(member)
    setName(member.User.name)
    setPhone(member.User.phone)
  },[])
  
  return (
    <View style={{ marginVertical: 10 }}>
        <Text>{member.User.nonUserId}</Text>
        <TextInput
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            value={name}
            placeholder="Name"
            onChangeText={handleNameChange}
        />
        <TextInput
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            value={phone}
            placeholder="Phone"
            onChangeText={handlePhoneChange}
            keyboardType="numeric"
        />
        {/* <Button title="Update" onPress={handleUpdate} /> */}
        <Button title="Delete" onPress={handleDelete} />
    </View>
  );
};

const AddNonUserComponent = ({
    nonUser, 
    addMembers, deleteMembers, checkUpdateMembers}) => {

      useEffect(() => {
        console.log("State updated:", nonUser);
      }, [nonUser]);
//   const [members, setMembers] = useState([]);
//   const [nonUserId, setNonUserId] = useState(0);

//   const [nonUserstoAdd, setNonUserstoAdd] = useState([]);

    // const newFormat=(
    //     {
    //     User: 
    //         {
    //         user_id: thirdData[0].user_id,
    //         name: thirdData[0].name,
    //         phone: thirdData[0].phone
    //         }
        
    //     }
    // )

  const handleInputChange = () => {
    // Rerender when input changes
    console.log(nonUser)
    console.log("Input changed");
  };

//   const handleAddMember = () => {
//     const newNonUserId = nonUserId + 1;

//     // setMembers((prevMembers) => [...prevMembers, {}]);
//     setMembers((prevMembers) => [
//         ...prevMembers,
//         {User:{ nonUserId: nonUserId, name: "", phone: "" }},
//     ]);
//     setNonUserId(newNonUserId)
//   };

//   const handleDeleteMember = (index) => {
//     setMembers((prevMembers) => {
//       const updatedMembers = [...prevMembers];
//       updatedMembers.splice(index, 1);
//       return updatedMembers;
//     });
//   };

  console.log(nonUser)
  return (
    <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Members:
        </Text>
        {nonUser.map((member) => (
            <MutableCard
            key={member.User.nonUserId}
            nonUserId={member.User.nonUserId}
            member={member}
            deleteMembers={deleteMembers}
            checkUpdateMembers={checkUpdateMembers}
            // onDelete={() => handleDeleteMember(index)}
            // onInputChange={handleInputChange}
            // nonUserId={nonUserId}
            />
        ))}
        <Button title="Add Another Member" onPress={addMembers} />
    </View>
        
  );
};

export default AddNonUserComponent;
