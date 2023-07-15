import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from 'react-native';

export default function UserCard({users, toggleUserModal, billowner, selectedUserPhone, chooseUserPhone, clickSetBillOwner}) {
  //GET THE BILL OWNER
  // var billownerid=10;
  const [expanded, setExpanded] = useState(true);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const renderUser = ({ item }) => {
    console.log("renderUser")
    const nameWords = item.User.name.split(' ');
    const initials = nameWords
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
    
    // create a user card with parameters:
    // {item,nameWords,initials}

    // useEffect(() => {
    //   // This code will run whenever the 'billOwner' prop changes
      console.log(item.User.phone);
      
      console.log(billowner);
    // }, [billowner]);

    return (
      <View>
        <TouchableOpacity
          style={[{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5,
          },
          item.User.phone === selectedUserPhone && styles.selectedCircle,
        ]}
          onPress={()=>chooseUserPhone(item.User.phone)}
        >
        <Text >{initials}</Text>
      </TouchableOpacity>

      {item.User.phone === billowner && <Text style={{ fontSize: 12, paddingLeft:8}}>Bill Owner</Text>}
      </View>
    );
  };

  const handleAddUser = () => {
    toggleUserModal();
  };

  return (
    <View style={{ padding: 5, marginBottom: 10  }}
    className="bg-[#A6A6A6] rounded-2xl px-4 pb-6 mx-3 mt-2">
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }} className="my-2">Users</Text>
      {users.length===0?(
        <Text style={{
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',}}>
          {/* {expanded?("Expand"):("Collapse")} */}
          No Users Yet!
      </Text>
      ):(expanded ? (
        <SafeAreaView className="flex-row ">
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

          {/* {console.log(users)} */}
            {users.map((user) => (
              <React.Fragment key={user.User.phone}>
                {renderUser({ item: user })}
              </React.Fragment>
            ))}
            </ScrollView>
        </SafeAreaView>
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {users.map((user) => (
            <View
              key={user.User.phone}
              style={{
                // width: '25%',
                alignItems: 'center',
                marginBottom: 5,
                marginHorizontal:3
              }}>
                {/* {console.log("USERCARD ERROR?")} */}
                {/* {console.log(user)} */}
              <TouchableOpacity
                onPress={()=>chooseUserPhone(user.User.phone)}
                
                style={[{
                  width: 90,
                  height: 50,
                  borderRadius: 50,
                  
                  backgroundColor: '#f0f0f0',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                user.User.phone === selectedUserPhone && styles.selectedCircle,
              ]}
              >
                  
                <Text className="text-center">
                      {(user.User.name.split(' '))[0]+" "+user.User.name.split(' ').slice(1)
                      .map((name) => name.charAt(0).toUpperCase())
                      .join('')}
                </Text>
              </TouchableOpacity>
              {user.User.phone === billowner && <Text style={{ fontSize: 12, marginTop: 2 }}>Bill Owner</Text>}
              
            </View>
          ))}
        </View>
      ))}

      <View style={{
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
        // backgroundColor:"black"
      }}>
        <TouchableOpacity onPress={()=>toggleExpanded()}
          style={[{
            width: 100,
            height: 50,
            borderRadius: 30,
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,},
            users.length === 0 && {
              opacity: 0.5,
            },]
          }>
            <Text style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',}}>
              {expanded?("Expand"):("Collapse")}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>clickSetBillOwner()}
          style={[{
            width: 100,
            // height: 100,
            borderRadius: 30,
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          },
          selectedUserPhone === null && {
            opacity: 0.5,
          },]}
          
          disabled={selectedUserPhone === null}
        >
          <Text style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',}}>
              {/* {expanded?("Expand"):("Collapse")} */}
              Set as Bill Owner
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
          }}
          onPress={()=>handleAddUser()}
        >
          <Text>+</Text>
        </TouchableOpacity>

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  selectedCircle: {
    // backgroundColor: '#ff0000',
    // width: 100,
    // height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'green',
  },
})