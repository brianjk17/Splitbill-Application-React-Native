import React, { useEffect, useState } from "react";
import { View, Text, Modal } from "react-native";
import ContactTabCard from "./contacts-tab/ContactTabCard";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import AddContactScreen from "./contacts-tab/AddContactScreen";
import Loading from "../LoadingScreen";

export default function ContactScreen(){
    const [toggleAddContactScreenModal,setToggleAddContactScreenModal ]=useState(false)

    const [isLoading, setIsLoading] = useState(!false);
    const [reload, setReload] = useState(0);

    console.log("isLoading")
    console.log(isLoading)
    const handleAdd = () => {
        console.log("Add Contact")
        setToggleAddContactScreenModal(!toggleAddContactScreenModal)
    };
    useEffect(()=>{
        
        console.log("re render page")
        
    },[toggleAddContactScreenModal])

    useEffect(()=>{
        
        console.log("re render page")
        
    },[reload])

    return(
        <View style={{ flex: 1, paddingBottom: 60, }} >
            <Text>contact screen</Text>
            
            <Modal
                animationType="fade" 
                visible={toggleAddContactScreenModal} 
                onRequestClose={()=>handleAdd()}
            >
                <AddContactScreen toggleAddModal={handleAdd} setIsLoading={setIsLoading}/>
            </Modal>

            <Loading isLoading={isLoading} style={styles.loadingContainer}></Loading>

            <ContactTabCard setIsLoading={setIsLoading} loading={toggleAddContactScreenModal}/>
            {/* <TouchableOpacity
                className="bg-blue-500" 
                style={[styles.cardContainer]}//, isSelected && styles.selectedCard]}
                onPress={()=>{setReload(reload+1)}}
            >
                <Text className="text-lg font-bold text-white">Refresh</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
                className="bg-blue-500" 
                style={[styles.cardContainer]}//, isSelected && styles.selectedCard]}
                onPress={handleAdd}
            >
                <Text className="text-lg font-bold text-white">Add Contacts</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        justifyContent: 'center',
        height:70,
        background: "rgba(59, 130, 246, 1)",
    },
    loadingContainer: {
        width: 200,
        height: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      },
})