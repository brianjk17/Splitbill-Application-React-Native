// import React, { useState } from 'react';
// import { View, Text,ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context'

// // export default UserList= ({users})=>{}

// // export default function UserList (){

// //     return(
// //         <View>
// //             <Text>User List</Text>
// //         </View>
// //     )
// // }

// const UserCard = ({ users }) => {
//   const [expanded, setExpanded] = useState(false);

//   const toggleExpansion = () => {
//     setExpanded(!expanded);
//   };

//   const renderUser = ({ item }) => {
//     return (
//       <View style={styles.userContainer}>
//         <View style={styles.profileCircle}>
//           <Text style={styles.userNameInitials}>{item.username.charAt(0)}</Text>
//         </View>
//         {expanded && <Text style={styles.userName}>{item.username}</Text>}
//       </View>
//     );
//   };
  
//   const getInitials = (name) => {
//     const names = name.split(' ');
//     const initials = names.map((n) => n.charAt(0)).join('');
//     return initials.toUpperCase();
//   };

//   return (
//     <View style={styles.cardContainer}>
//       <TouchableOpacity onPress={toggleExpansion} style={styles.expandButton}>
//         <Text>{expanded ? 'Collapse' : 'Expand'}</Text>
//       </TouchableOpacity>

//       {expanded ? (
//         <FlatList
//           // data={users}
//           // keyExtractor={(item) => item.id.toString()}
//           // renderItem={renderUser}
//           // numColumns={2}

//           data={users}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           renderItem={renderUser}
//           keyboardShouldPersistTaps="always"
          
//         />
//       ) : (
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//            {users.map((user) => (
//             <View key={user.id} style={styles.profileContainer}>
//               <View style={styles.initialsCircle}>
//                 <Text style={styles.initialsText}>{getInitials(user.username)}</Text>
//               </View>
//               <Text style={styles.username}>{user.username}</Text>
//             </View>
//           ))}
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   expandButton: {
//     alignSelf: 'flex-end',
//     marginBottom: 10,
//   },
//   horizontalUserContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   userContainer: {
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   profileCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#c4c4c4',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   userNameInitials: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   userName: {
//     marginTop: 5,
//     textAlign: 'center',
//   },
// });

// export default UserCard;

// // import React, { useState } from 'react';
// // import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// // const UserCard = ({ users }) => {
// //   const [expanded, setExpanded] = useState(false);

// //   const renderUsers = () => {
// //     if (!expanded) {
// //       return (
// //         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
// //           {users.map((user) => (
// //             <View key={user.id} style={styles.profileContainer}>
// //               <View style={styles.initialsCircle}>
// //                 <Text style={styles.initialsText}>{getInitials(user.username)}</Text>
// //               </View>
// //               <Text style={styles.username}>{user.username}</Text>
// //             </View>
// //           ))}
// //         </ScrollView>
// //       );
// //     } else {
// //       return (
// //         <ScrollView showsVerticalScrollIndicator={false}>
// //           {users.map((user) => (
// //             <View key={user.id} style={styles.tableRow}>
// //               <View style={styles.initialsCircle}>
// //                 <Text style={styles.initialsText}>{getInitials(user.username)}</Text>
// //               </View>
// //               <Text style={styles.username}>{user.username}</Text>
// //             </View>
// //           ))}
// //         </ScrollView>
// //       );
// //     }
// //   };

// //   const getInitials = (name) => {
// //     const names = name.split(' ');
// //     const initials = names.map((n) => n.charAt(0)).join('');
// //     return initials.toUpperCase();
// //   };

// //   return (
// //     <View style={styles.card}>
// //       <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.expandButton}>
// //         <Text style={styles.expandButtonText}>{expanded ? '-' : '+'}</Text>
// //       </TouchableOpacity>
// //       {renderUsers()}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   card: {
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 10,
// //     padding: 10,
// //     marginBottom: 10,
// //   },
// //   profileContainer: {
// //     alignItems: 'center',
// //     marginRight: 10,
// //   },
// //   initialsCircle: {
// //     width: 60,
// //     height: 60,
// //     borderRadius: 30,
// //     backgroundColor: '#4287f5',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   initialsText: {
// //     fontSize: 24,
// //     color: '#FFFFFF',
// //   },
// //   username: {
// //     marginTop: 5,
// //   },
// //   tableRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //   },
// //   expandButton: {
// //     position: 'absolute',
// //     right: 10,
// //     top: 10,
// //     width: 30,
// //     height: 30,
// //     borderRadius: 15,
// //     backgroundColor: '#4287f5',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   expandButtonText: {
// //     fontSize: 18,
// //     color: '#FFFFFF',
// //   },
// // });

// // export default UserCard;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';

export default function UserCard({users, toggleUserModal, billonwer}) {
  //GET THE BILL OWNER
  var billownerid=10;
  const [expanded, setExpanded] = useState(true);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const renderUser = ({ item }) => {
    console.log("renderUser")

    console.log(item)
    const nameWords = item.User.name.split(' ');
    console.log("ERROR?")
    const initials = nameWords
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
    
    // create a user card with parameters:
    // {item,nameWords,initials}

    return (
      <View>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5,
          }}
          onPress={()=>console.log("hah")}
        >
        <Text >{initials}</Text>
      </TouchableOpacity>

      {item.id === billownerid && <Text style={{ fontSize: 12, paddingLeft:8}}>Bill Owner</Text>}
      </View>
    );
  };

  const handleAddUser = () => {
    toggleUserModal();
    console.log("asdfafadfadfasdf")
    // addUser({id:11, name:"Brian Joseph Keyrupan"});
   
    // if (name && phoneNumber) {
    //   const newUser = {
    //     id: users.length + 1, // Generate a unique ID for the new user
    //     name,
    //     phoneNumber,
    //   };

    //   addUser(newUser);
    //   setName('');
    //   setPhoneNumber('');
    // }
  };

  return (
    <View style={{ padding: 5, backgroundColor: 'gray', marginBottom: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Users</Text>
      {users.length===0?(
        <Text style={{
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',}}>
          {/* {expanded?("Expand"):("Collapse")} */}
          No Users Yet!
      </Text>
      ):(expanded ? (
        <SafeAreaView>
          <FlatList
            data={users}
            keyExtractor={(item) => item.User.phone}// USE PHONE NUMBER
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderUser}
            keyboardShouldPersistTaps="always"
          />
        </SafeAreaView>
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {users.map((user) => (
            <View
              key={user.User.phone}
              style={{
                width: '25%',
                alignItems: 'center',
                marginBottom: 10,
              }}>
                {/* {console.log("USERCARD ERROR?")} */}
                {/* {console.log(user)} */}
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: '#f0f0f0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  
                }}>
                  
                <Text className="text-center">
                      {(user.User.name.split(' '))[0]+" "+user.User.name.split(' ').slice(1)
                      .map((name) => name.charAt(0).toUpperCase())
                      .join('')}
                </Text>
              </TouchableOpacity>
              {user.id === billownerid && <Text style={{ fontSize: 12, marginTop: 2 }}>Bill Owner</Text>}
              
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
        backgroundColor:"black"
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
          onPress={()=>console.log("set owner")}
          style={[{
            width: 100,
            // height: 100,
            borderRadius: 30,
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          },
          users.length === 0 && {
            opacity: 0.5,
          },]}
          
          disabled={users.length === 0}
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