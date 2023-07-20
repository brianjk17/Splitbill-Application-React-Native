import { View,Text,FlatList,TouchableOpacity,SafeAreaView, ScrollView } from "react-native"
import BillCard from "../components/BillCard"
import React,{ useEffect, useState } from "react";
import { Modal } from "react-native";
import ExpenseScreen from "./ExpenseScreen";
import { supabase } from "../../supabase-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BillModal from "../components/ReadBill/BillModal";
import SwitchSelector from "react-native-switch-selector";
import { SearchBar } from 'react-native-elements';
import { useIsFocused } from "@react-navigation/native";


export default function BillScreen(){
  // const[billList, setBillList]=useState([
  //   {name:"Electricity Bill",total:100, number:5,billID:1},
  //   {name:"Food A", total:30, number:5,billID:2},
  //   {name:"Food A", total:30, number:5,billID:5},
  //   {name:"Food A", total:30, number:5,billID:6},
  //   {name:"Food A", total:30, number:5,billID:7},
  //   {name:"Food A", total:30, number:5,billID:8},
  //   {name:"Food A", total:30, number:5,billID:29},
  //   {name:"Food A", total:30, number:5,billID:21},
  //   ])
  
  const [currentPhone, setCurrentPhone] = useState('');
  const [currentUser_id, setCurrentUser_id] = useState('');

  const getCurrentUserData = async () => {
    try {
        const currentPhone = await AsyncStorage.getItem('phone');
        const currentUser_id = await AsyncStorage.getItem('user_id');
        // console.log("getUser_id")
        // console.log(currentPhone)
        // console.log(currentUser_id)
        setCurrentPhone(currentPhone.toString())
        setCurrentUser_id(currentUser_id.toString())
        return 
    } catch (error) {
        console.log('Error retrieving login status: ', error);
        return false; // Default value in case of error
    }
  };

  const [billsData, setBillsData] = useState([])

  function printAll(data){
          console.log(data.bill_name)
          console.log(data.payee_phone)
          console.log(data.expenses)
          console.log(data.members)
          console.log(data.service)
          console.log(data.tax)
          console.log(data.discount)
  }

  async function getBillData(){
    try {
      const { data, error} = await supabase
        .from('Bill')
        .select()
      if(error){
        console.log("error: ", error)
      } else{
        console.log("BILL DATA");
        const currentPhone = await AsyncStorage.getItem('phone');
        //check each data if the current user is in the bill
        // console.log(currentPhone)
        // console.log(data)

        let billIncluded = [];
        // console.log(data)
        data.forEach((bill)=>{
          // console.log("BILL")
          // console.log(bill)
          bill.members.forEach((member) => {
            // console.log("MEMBER")
            // console.log((member))
            // console.log((currentPhone))
            // console.log("end")
            // console.log(member.User.phone===currentPhone)
            
            if (member.User.phone === currentPhone) {
              billIncluded.push(bill);
              // console.log(bill.bill_name)
            }

          });
        })
        console.log("billIncluded")
        // console.log(billIncluded)
        // console.log(data)
        setBillsData(billIncluded);
        setDisplayBills(billIncluded)
      }
    } catch (error) {
      console.log('Error storing login status: ', error);
    }
  }

  const isFocused = useIsFocused();

  useEffect(()=>{
    getCurrentUserData()
    getBillData()
  },[isFocused])

  useEffect(()=>{
    //For all the bills of that users
      //get bill name
      //get total
      //number of members
      //render the BillCard component
    getCurrentUserData()
    getBillData()
    
    // console.log(billsData)
  },[])

  const [billModal, setbillModal] = useState(false)
  const [selectedBill, setSelectedBill] = useState(null);

  function toggleBillModal(){
    setbillModal(!billModal)
    getCurrentUserData()
    getBillData()
  }
  
  function renderList({item}){
    // console.log("renderList")
    // console.log(item)
    // console.log("AHAHHAHA")
    return(
      <View className="items-center py-1" >

        <Modal animationType="fade" visible={billModal} onRequestClose={toggleBillModal} >
          {/* {console.log(selectedBill)} */}
          <View style={{backgroundColor:"#FFE562"}}>
            <BillModal closeModal={toggleBillModal} bill={selectedBill} currentPhone={currentPhone}/>
          </View>
        </Modal>

        <BillCard 
          // name="Electricity Bill" 
          // amount="$100" 
          bill={item}
          onPress={()=>(handleCardPress(item))}
          currentPhone={currentPhone}
          // number={5 + " Members"}
          // billID={2}
        >
          
        </BillCard>
      </View>
    )
  }
  
  const handleCardPress = (item) => {
    // alert('Card clicked!');
    console.log('Card clicked!');
    // console.log(item.bill_name)
    // console.log(item.id)
    setSelectedBill(item)
    toggleBillModal()
    // console.log("Card clicked!")
    // // console.log(billsData)
    // const groupedData = billsData[0].expenses.reduce((result, item) => {
    //   item.members.forEach((member) => {
    //     if (!result[member]) {
    //       result[member] = [];
    //     }
    //     result[member].push({name:item.name, 
    //       price:(parseFloat(item.price)/item.members.length),//plus tax and etc.
    //       quantity:item.members.quantity,
    //     });
    //   });
    //   return result;
    // }, {});

    
    // console.log(groupedData)
    // console.log("groupedData")
  };

  // newbill={name:"Food C", total:40, number:6,billID:4}

  // const addNewBill = (newbill) => {
  //   //MODAL BILL for user to ADD NEW BILL

  //   setBillList([...billList, newbill])
  //   console.log(billList)
  // };


  const [billStatus, setBillStatus] = useState('active');


  // const [billStatus, setBillStatus] = useState('active');
  const handleSwitchChange = (value) => {
    setSearch('')
    setDisplayBills(billsData)
    setBillStatus(value);
  };
 

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleExpenseModal = () => {
    // console.log(isModalVisible)
    setModalVisible(!isModalVisible);
    getBillData()
  };

  const [search, setSearch] = useState('');
  const [displayBills, setDisplayBills] = useState([])
 
  // searchSettledFunction = (text) => {
  //   setSearch(text)
  //   if(text.length===0){
  //     clearSearchFunction()
  //     return
  //   }
  //   const searchResult = billsData.filter(obj => {
  //     const billName = obj.bill_name.toLowerCase();
  //     const search = text.toLowerCase();
  //     for (let i = 0; i < search.length; i++) {
  //       if (!billName.includes(search[i])&&obj.paid === false) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   });
  //   setDisplayBills(searchResult)
  // };

  searchActiveFunction = (text) => {
    setSearch(text)
    if(text.length===0){
      clearSearchFunction()
      return
    }
    const searchResult = billsData.filter(obj => {
      const billName = obj.bill_name.toLowerCase();
      const search = text.toLowerCase();
      for (let i = 0; i < search.length; i++) {
        if (!billName.includes(search[i])) {
          return false;
        }
      }
      return true;
    });
    setDisplayBills(searchResult)
  };

  clearSearchFunction =()=>{
    setDisplayBills(billsData)
    setSearch('')
  }

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFE562', }}>
      {/* <View className="flex-1"> */}
        {/* <Text className="pt-3">This is Bill Screen</Text> */}
        
        <View >
          <Text className="text-2xl font-extrabold text-center p-2 mt-10">
            This is your Bills
          </Text>
          <SwitchSelector
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Settled', value: 'settled' },
            ]}
            initial={0}
            onPress={handleSwitchChange}
            buttonColor="#3482F6"
          />
        </View>

        {/* SEARCH BY BILL NAME */}

        <View className="flex-1 items-center py-1">
          {billStatus === 'active' ? (
              <View >
                <SafeAreaView>
                  {billsData.length===0 ?(<Text>No Bills</Text>)://change to displayBills
                  (<View style={{width: 340,}}>
                    <SearchBar
                      lightTheme
                      round
                      searchIcon={{ size: 24 }}
                      onChangeText={(text) => searchActiveFunction(text)}
                      onClear={() => clearSearchFunction()}
                      placeholder="Type Here..."
                      value={search}
                      // containerStyle  =
                    />
                  </View>
                  )}

                  <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 170 }}
                  >
                    {displayBills.map((bill) => { //change to displayBills
                      if (bill.paid === false) {
                        return (
                        <React.Fragment key={bill.id}>
                          {renderList({ item: bill })}
                        </React.Fragment>
                        );
                      }
                    })}

                  </ScrollView>
                </SafeAreaView>
              </View>
            ) : (
              <View>
                  <SafeAreaView>
                  {billsData.length===0 ?(<Text>No Bills</Text>)://change to displayBills
                    (<View style={{width: 340,}}>
                      <SearchBar
                        lightTheme
                        round
                        searchIcon={{ size: 24 }}
                        onChangeText={(text) => searchActiveFunction(text)}
                        onClear={() => clearSearchFunction()}
                        placeholder="Type Here..."
                        value={search}
                      />
                    </View>
                  )}
                    
                    <ScrollView 
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{ paddingBottom: 170 }}
                    >
                      {displayBills.map((bill) => {
                        if (bill.paid === true) {
                          return (
                          <React.Fragment key={bill.id}>
                            {renderList({ item: bill })}
                          </React.Fragment>
                          );
                        }
                      })}

                    </ScrollView>
                  </SafeAreaView>
             
              </View>
          )}

          <TouchableOpacity
            className="bg-blue-500 p-4 rounded-full shadow-lg items-center justify-center absolute bottom-24 right-0 m-4"
            onPress={()=>toggleExpenseModal()}>
            <Text Text className="text-white text-lg font-bold">Add Bill</Text>
          </TouchableOpacity>

          <Modal
            animationType="fade" 
            visible={isModalVisible} 
            onRequestClose={toggleExpenseModal}
          >
            <ExpenseScreen toggleExpenseModal={toggleExpenseModal}/>
          </Modal>
        </View>
        
    </SafeAreaView>
    
  )
}