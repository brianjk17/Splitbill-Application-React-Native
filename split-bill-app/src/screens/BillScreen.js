import { View,Text,FlatList,TouchableOpacity,SafeAreaView } from "react-native"
import BillCard from "../components/BillCard"
import { useEffect, useState } from "react";

export default function BillScreen(){
  const[billList, setBillList]=useState([
    {name:"Electricity Bill",total:100, number:5,billID:1},
    {name:"Food A", total:30, number:5,billID:2},
    {name:"Food A", total:30, number:5,billID:5},
    {name:"Food A", total:30, number:5,billID:6},
    {name:"Food A", total:30, number:5,billID:7},
    {name:"Food A", total:30, number:5,billID:8},
    {name:"Food A", total:30, number:5,billID:29},
    {name:"Food A", total:30, number:5,billID:21},
    ])

  
  
  useEffect(()=>{
    //For all the bills of that users
      //get bill name
      //get total
      //number of members
      //render the BillCard component
      
  })
  
  function renderList(billItem){
    console.log(billItem)
    return(
      <View className="items-center py-1">
        <BillCard 
          // name="Electricity Bill" 
          // amount="$100" 
          bill={billItem}
          onPress={handleCardPress} 
          // number={5 + " Members"}
          // billID={2}
          />
      </View>
    )
  }
  
  const handleCardPress = () => {
    alert('Card clicked!');

  };

  newbill={name:"Food C", total:40, number:6,billID:4}

  const addNewBill = (newbill) => {
    //MODAL BILL for user to ADD NEW BILL

    setBillList([...billList, newbill])
    console.log(billList)
  };
  
  return(
    <SafeAreaView className="flex-1">
      {/* <View className="flex-1"> */}
        <Text className="pt-3">This is Bill Screen</Text>
      
        <View className="flex-1 items-center py-1">
          <FlatList
                data={billList}
                // showsHorizontalScrollIndicator={false}
                renderItem={({item})=>renderList(item)}
                keyExtractor={(item) => item.billID}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ paddingBottom: 115 }}
              />
              <TouchableOpacity
          className="bg-blue-500 p-4 rounded-full shadow-lg items-center justify-center absolute bottom-11 right-0 m-4"
          onPress={()=>addNewBill(newbill)}>

          <Text className="text-white text-lg font-bold">Add Bill</Text>
        </TouchableOpacity>
        </View>
      {/* </View> */}
    </SafeAreaView>
    
  )
}