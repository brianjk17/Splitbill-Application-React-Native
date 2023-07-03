import React from "react";
import { View, Text } from "react-native";
import ContactTabCard from "./contacts-tab/ContactTabCard";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";



export default function ContactScreen(){
    const handleSelect = () => {
        console.log("Add Contact")
      };
    return(
        <View>
            <Text>contact screen</Text>
            
            <ContactTabCard/>

            <TouchableOpacity
                style={[styles.cardContainer]}//, isSelected && styles.selectedCard]}
                onPress={handleSelect}
            >
                <Text style={{fontSize: 17,}}>Add Contacts</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      marginBottom: 10,
      justifyContent: 'center',
      height:60,
      width:300,
    },
})