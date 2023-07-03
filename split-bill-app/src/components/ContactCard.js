import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';


export default ContactCard = ({ user, onSelect, selectedUsers }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(!isSelected);
    
    onSelect(user, !isSelected);
    console.log("handleSelect")
    console.log(!isSelected)
  };

  useEffect(()=>{
    console.log()
    if(selectedUsers.some((item)=>item.User.phone === user.User.phone)){
      setIsSelected(!isSelected);
    }
  },[])

  return (
    <>
      {/* {console.log(user)} */}
      <TouchableOpacity
        style={[styles.cardContainer, isSelected && styles.selectedCard]}
        onPress={handleSelect}
      >
        <View style={styles.circleContainer}>
          <Text style={styles.initial}>{user.User.name.charAt(0)}</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.name}>{user.User.name}</Text>
          <Text style={styles.phoneNumber}>{user.User.phone}</Text>
        </View>
        {isSelected && (
          <Feather name="check" size={24} color="green" style={styles.checkmarkIcon} />
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
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
    color: '#999',
  },
  checkmarkIcon: {
    marginLeft: 'auto',
  },
});
