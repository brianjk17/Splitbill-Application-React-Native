import React from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { supabase } from '../../../supabase-service';


const Card = ({ cardNumber, phoneNumber, items, billItem }) => {

  console.log("Card clicked!")
  // console.log(billsData)
  const groupedData = billItem.expenses.reduce((result, item) => {
    item.members.forEach((member) => {
      if (!result[member]) {
        result[member] = [];
      }
      result[member].push({name:item.name, 
        price:(parseFloat(item.price)/item.members.length),//plus tax and etc.
        quantity:item.members.quantity,
      });
    });
    return result;
  }, {});
  
  // console.log(groupedData)
  console.log("groupedData")

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{`${phoneNumber} bought`}</Text>
      {items.length > 0 ? (
        items.map((item, index) => (
            //display name of expense and the cost for each person
            //price per person is price divide members.length
          <Text key={index} style={styles.subtitle}>
            {item}
          </Text>
        ))
      ) : (
        <Text style={styles.subtitle}>No items bought</Text>
      )}
    </View>
  );
};



const BillModal = ({closeModal, bill, currentPhone}) => {
  console.log("BillModal")
  console.log(bill)
  console.log(bill.expenses)
  function getNameFromPhone(phoneNum){
    let memberName
    bill.members.forEach((member) => {
      const { name, phone } = member.User;
        if (phone === phoneNum) {
          memberName=name
          return 
        }
      }
      );
    return memberName
  }

  // function taxserdisPercentage(price){
  //   let taxPercentage=parseInt(bill.tax)
  //   let servicePercentage=parseInt(bill.service)
  //   let discountPercentage=parseInt(bill.discount)
  //   let tax
  //   let service
  //   let discount
  //   let total=price
  //   // console.log(total)
  //   if(taxPercentage!=0){
  //     tax=((taxPercentage / 100) * price)
  //   }else{
  //     tax=0
  //   }
  //   total+=tax
  //   if(servicePercentage!=0){
  //     service=((servicePercentage / 100) * price)
  //   }else{
  //     service=0
  //   }
  //   total+=service
  //   if(discountPercentage!=0){
  //     discount=((discountPercentage / 100) * price)
  //   }else{
  //     discount=0
  //   }
  //   total-+discount

  //   return total
  // }

  // Group the data by phone number
  // console.log("bill")
  // console.log(bill)
  const groupedData = bill.expenses.reduce((result, item) => {
    item.members.forEach((member) => {
      if (!result[member]) {
        result[member] = [];
      }
      result[member].push({name:item.name, 
        price:(parseFloat(item.price)),
        quantity:item.quantity,
        members:item.members.length
      });
    });
    return result;
  }, {});
  
  // console.log(groupedData)
  console.log("groupedDataaaa")

  const dataArray = Object.keys(groupedData).map(phoneNumber => ({
    phoneNumber,
    items: groupedData[phoneNumber],
    // members: groupedData[]
  }));

  console.log("dataArray")
  // console.log(dataArray)


  function renderList({item}){
    console.log("item")
    // console.log(item)
    const phoneNumber = item.phoneNumber;
    const items = item.items;
    let subTotal=0

    item.items.forEach(expense => {
      subTotal+=parseFloat((parseFloat(expense.price)/parseFloat(expense.members)).toFixed(2))
    });

    // console.log("billItem")
    function Total(){
      return (((subTotal+
        ((parseInt(bill.tax) / 100) * subTotal)+
        ((parseInt(bill.service) / 100) * subTotal))-
        ((parseInt(bill.discount) / 100) * subTotal)).toFixed(2))
    }

    function owes(phoneNum){
      if(bill.payee_phone!==phoneNum && bill.payee_phone===currentPhone){
        return "owes you RM"+ Total()
      } else if(bill.payee_phone===phoneNum && bill.payee_phone===currentPhone){
        return "you spent RM"+ Total()+"\nBill Owner"
      } else if(phoneNum===currentPhone){
        return "you owe " + getNameFromPhone(bill.payee_phone)+" RM"+Total()
      } else if(bill.payee_phone===phoneNum){
        return "spent RM"+ Total()+"\nBill Owner"
      }
      else{
        return "\nowes "+ getNameFromPhone(bill.payee_phone)+" RM"+Total()
      }
    }

    console.log("BILL EXPENSE")
    // console.log(bill)
    return (
    <View style={styles.card}>
      <Text>Phone Number: {phoneNumber}</Text>
      <Text style={styles.title}>{getNameFromPhone(phoneNumber)} {owes(phoneNumber)}</Text>
      <Text ></Text>

      {/* {items.map((item, index) => (
        <View key={index} className="p-4 bg-slate-500 rounded-lg mb-2">
          <Text>Name: {item.name}</Text>
          <Text>Price: {item.price}</Text>
          <Text>Quantity: {item.quantity}</Text>
        </View>
      ))} */}

      <View style={styles.itemsContainer}>
        <Text style={styles.subtitle}>Expenses</Text>
        {items.map((item,index) => (
          <View style={styles.item} key={index} >
            <Text style={styles.itemName}> {item.name}</Text>
            <Text style={styles.itemDetails}>
               RM{(parseFloat(item.price.toFixed(2))).toFixed(2)} / {item.members} 
            </Text>
            <Text style={styles.itemTotal}>RM{ (parseFloat(item.price)/parseFloat(item.members)).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <Text>Expense Detail:</Text>
      <View className="pl-10">
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text>Subtotal: </Text>
          <Text style={styles.itemTotal}> RM{(parseFloat(subTotal)).toFixed(2)}</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text>Tax: </Text>
          <Text style={styles.itemTotal} > RM{ ((parseInt(bill.tax) / 100) * subTotal).toFixed(2)}</Text>
        </View>
        
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text>Service: </Text>
          <Text style={styles.itemTotal} >RM{ ((parseInt(bill.service) / 100) * subTotal).toFixed(2)}</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text>Discount: </Text>
          <Text style={styles.itemTotal} > RM{ ((parseInt(bill.discount) / 100) * subTotal).toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Text style={[styles.label, styles.title]}>Total: </Text>
        <Text style={[styles.total, styles.title]}>RM {Total()}</Text>
      </View>
      
    </View>
    );
  }

  // const keys = Object.keys(groupedData);

  // function getTotal(){
  //   let totalPrice = 0;

  //   bill.expenses.forEach((expense) => {
  //     const price = parseFloat(expense.price);
  //     totalPrice += price;
  //   });
  //   let total=parseInt(totalPrice)
  //   return taxserdisPercentage(total)
  // }

  function getDate(timestamp){
    if(timestamp.length<12){
      return timestamp
    }

    const date = new Date(timestamp);

    // Extracting date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const day = date.getDate();
    
    // Formatting the date
    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    return formattedDate
  }
  
  const updateBillStatus = async () => {
    console.log(bill.id)
    try {
      const { data, error } = await supabase
        .from("Bill")
        .update({ paid: true })
        .eq('id', bill.id);
        
      if (error) {
        console.error(error);
        return;
      }
      
      console.log('Column updated successfully:', data);
    } catch (error) {
      console.error('Error updating column:', error.message);
    }
  };

  function settleBill(){
    Alert.alert(
      'Confirmation',
      'Are you sure that the bill is settled?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
              closeModal()
              //SET DB THIS BILL TO bill.paid=true
              updateBillStatus()
              
          },
        },
      ],
      { cancelable: false }
    );
  }

  function overallSubtotal(){
    let subtotal=0
    bill.expenses.map((expense) => {
      subtotal+= parseFloat(expense.price)
    })
    return parseFloat(subtotal)
  }
  function Total(){
    return (((overallSubtotal()+
      ((parseInt(bill.tax) / 100) * overallSubtotal())+
      ((parseInt(bill.service) / 100) * overallSubtotal()))-
      ((parseInt(bill.discount) / 100) * overallSubtotal())).toFixed(2))
  }

  function billOwnerisNonuser(phone){
    // for (let i = 0; i < data.length; i++) {
    //   let members = data[i].members;
      for (let j = 0; j < bill.members.length; j++) {
        let user = bill.members[j].User;
        let userPhone = user.phone;
        
        if (userPhone === phone && user.hasOwnProperty("nonUserId")) {
          // console.log(user);
          return true;
        }
      // }
    }
    return false;
  }

  return (
    <View 
    // style={styles.container}
    className="bg-[#d6d6d6] rounded-2xl px-4 py-3 mt-6 mx-3 "
    >
      {/* {Object.entries(groupedData).map(([phoneNumber, items], index) => (
        <Card key={index} cardNumber={index + 1} phoneNumber={phoneNumber} items={items} />
      ))} */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
      >
      

      {/* <Text>Bill Name: {bill.bill_name}</Text> */}

      <View style={{alignItems: 'center',}} className="py-3">
        <Text style={{fontSize: 25,fontWeight: 'bold',}}>Bill Name: {bill.bill_name}</Text>
      </View>

      {/* <View style={styles.invoiceInfoContainer}> */}
        <View style={styles.invoiceInfo}>
          <Text style={styles.label}>{getNameFromPhone(bill.payee_phone)}</Text>
          <Text style={styles.text}>is the Bill Owner</Text>
        </View>
        <View style={styles.invoiceInfo}>
          <Text style={styles.label}>Bill Created on:</Text>
          <Text style={styles.text}>{getDate(bill.created_at)}</Text>
        </View>
      {/* </View> */}

      <View style={styles.divider} />

      <Text>Total Bill Costs: RM{Total()}</Text>

      <Text></Text>

      {/* <FlatList
        data={dataArray}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="always"
      /> */}
      <SafeAreaView>
          
        {dataArray.map((bill) => {
          if (bill.phoneNumber === currentPhone) {
            return (
              <React.Fragment key={bill.phoneNumber}>
                {renderList({ item: bill })}
              </React.Fragment>
            );
          }
        })}

        {dataArray.map((bill) => {
          if (bill.phoneNumber !== currentPhone) {
            return (
              <React.Fragment key={bill.phoneNumber}>
                {renderList({ item: bill })}
              </React.Fragment>
            );
          }
        })}
            
      </SafeAreaView>
      

      <Text>Bill Details</Text>
      {bill.expenses.map((expense) => {
            return (
              // <React.Fragment key={bill.phoneNumber}>
              //   {renderList({ item: bill })}
              // </React.Fragment>
              
              <View style={styles.item} key={expense.id} >
                <Text style={styles.itemName}> {expense.name}</Text>
                <Text style={styles.itemDetails}>
                  {expense.quantity} x RM{(parseFloat(expense.price)/parseFloat(expense.quantity)).toFixed(2)}
                </Text>
                <Text style={styles.itemTotal}>RM{expense.price}</Text>
              </View>
            );
          
      })}

      <View style={styles.divider} />
      
      <Text>Bill Detail:</Text>
      <View className="pl-10">
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text>Subtotal: </Text>
          <Text style={styles.itemTotal}> RM{(parseFloat(overallSubtotal())).toFixed(2)}</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text>Tax: {bill.tax}%</Text>
          <Text style={styles.itemTotal} > RM{ ((parseInt(bill.tax) / 100) * overallSubtotal()).toFixed(2)}</Text>
        </View>
        
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text>Service: {bill.service}%</Text>
          <Text style={styles.itemTotal} >RM{ ((parseInt(bill.service) / 100) * overallSubtotal()).toFixed(2)}</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text>Discount: {bill.discount}%</Text>
          <Text style={styles.itemTotal} > RM{ ((parseInt(bill.discount) / 100) * overallSubtotal()).toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Text style={[styles.label, styles.title]}>Total: </Text>
        <Text style={[styles.total, styles.title]}>RM{Total()}</Text>
      </View>




      <View style={styles.divider} />
      {/* <SafeAreaView>
            <ScrollView 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 115 }}
            >
              {dataArray.map((data) => (
                  <React.Fragment key={data.id}>
                    {renderList({ item: bill })}
                  </React.Fragment>
              ))}
            </ScrollView>
        </SafeAreaView> */}
      <TouchableOpacity 
          // style={styles.button}
          onPress={closeModal} 
          className=" mb-3 mt-3 bg-stone-600" 
          style={{
              height: 50,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
          }}
          >
            <Text style={{fontWeight: 'bold', color:'white'}}>Back</Text>
      </TouchableOpacity>
      
      <View>
        {bill.paid===false ? ( // if not paid
              //if the payee_phone is not in the system
              billOwnerisNonuser(bill.payee_phone)?(
                <TouchableOpacity
                onPress={settleBill} 
                className="bg-blue-500 mb-3 mt-3" 
                style={{
                    height: 50,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                }}
                >
                  <Text style={{fontWeight: 'bold', color:'white'}}>Settle Bill</Text>
                </TouchableOpacity>
              ):(
          bill.payee_phone===currentPhone ? ( //logged in user is not in the bill owner
            <TouchableOpacity 
            // style={styles.button}
            onPress={settleBill} 
            className="bg-blue-500 mb-3 mt-3" 
            style={{
                height: 50,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
            }}
            >
              <Text style={{fontWeight: 'bold', color:'white'}}>Settle Bill</Text>
            </TouchableOpacity>
          ):(
            <View 
              className="bg-gray-500 mb-3 mt-3" 
              style={{
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}
            >
                <Text style={{fontWeight: 'bold', }}>Only Bill Owner can settle this bills</Text>
            </View>
          )
        )) : (
          <View 
            className="bg-green-500 mb-3 mt-3" 
            style={{
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}
          >
              <Text style={{fontWeight: 'bold', }}>Bill Settled</Text>
          </View>
        )}
      </View>

      

      </ScrollView>
    </View>
  );
};

const styles = {
  invoiceInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  invoiceInfo: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
  },
  text: {
    marginLeft: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  itemTotal: {
    fontWeight: 'bold',
  },
  itemDetails: {},
  itemName: {
    fontSize: 16,
    // flex:1,
    width:120
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  
};

export default BillModal;
