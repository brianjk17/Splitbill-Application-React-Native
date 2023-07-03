import SwitchSelector from "react-native-switch-selector";
import React from "react";
import { View,Text,StyleSheet,SafeAreaView } from "react-native"
 

export default function SwitchSelectorButton({changetype}){
    
    const switchoptions = [
        { label: "Add from contacts", value: "contacts" },
        { label: "Add member", value: "member" }
    ];
    return (
    <View className="pb-3">
        <SafeAreaView>
            <View>
                <Text className="text-2xl font-extrabold  text-center p-5">
                    Add the members{"\n"}to the Bill
                    </Text>
            </View>
        </SafeAreaView>
        
        <View>
            <SwitchSelector
            options={switchoptions}
            initial={0}
            onPress={changetype}
            textColor="black"
            selectedColor="black"
            buttonColor="yellow"
            />
        </View>
    </View>
    );
}