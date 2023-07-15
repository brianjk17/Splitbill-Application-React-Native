import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// export default function BillCard ({bill, onPress, currentPhone}){
//   console.log(bill)
//   return(
//     <></>
//   )
// }

export default function BillCard ({bill, onPress, currentPhone}){

  const groupedData = bill.expenses.reduce((result, item) => {
    item.members.forEach((member) => {
      if (!result[member]) {
        result[member] = [];
      }
      result[member].push({name:item.name, 
          price:item.price, 
          members:item.members.length, 
          quantity:item.quantity});
    });
    return result;
  }, {});
  // console.log(groupedData)

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
  
  function getMemberExpenseTotal(phone){
    // console.log("GROUPED DATA")
    // console.log(phone)
    // console.log(groupedData[phone])

    let totalExpense = 0;
    groupedData[phone].forEach((object) => {
      const price = parseFloat(object.price);
      const members = object.members;
      const pricePerMember = price / members;
      totalExpense += taxserdisPercentage(pricePerMember);
    });
    //look for the phone number in the object
    //divide each item by the number of members of that expense
    //give taxserdisPercentage() for each expense
    //add it all up

    // console.log(totalExpense)

    return totalExpense
  }

  function getTotal(){
    let totalPrice = 0;

    bill.expenses.forEach((expense) => {
      const price = parseFloat(expense.price);
      totalPrice += price;
    });
    let total=parseInt(totalPrice)
    return taxserdisPercentage(total)
  }

  function taxserdisPercentage(price){
    let taxPercentage=parseInt(bill.tax)
    let servicePercentage=parseInt(bill.service)
    let discountPercentage=parseInt(bill.discount)
    let tax
    let service
    let discount
    
    tax=((taxPercentage / 100) * price)

    service=((servicePercentage / 100) * price)
   
    discount=((discountPercentage / 100) * price)

    let total=(price+tax+service)-discount
    return total
  }

  // console.log(bill)

  

    // console.log(bill.bill_name)
    // console.log(bill.payee_phone)
    // console.log(bill.expenses)
    // console.log(bill.members)
    // console.log(bill.service)
    // console.log(bill.tax)
    // console.log(bill.discount)

  // let name="Electricity Bill" 
  // let amount="$100" 
  // let number=5 + " Members"
  // let billID=2
  // {name, amount, number, billID, onPress}

  // const [name,setName]=useState(bill.name)
  // const [total,setTotal]=useState(bill.total)
  // const [number,setNumber]=useState(bill.number)

  // useEffect(()=>{
  //   setBilli_id(bill.billID)
  //   // console.log(bill.name)
  // })

  function checkBillOwner(){
    // console.log("checkBillOwner")
    getNameFromPhone(bill.payee_phone)
    // console.log(getNameFromPhone(bill.payee_phone))

    if(currentPhone===bill.payee_phone){
      //Members of this bill owe you ____
      return "Members of this bill owe you RM "+parseFloat((getTotal()-getMemberExpenseTotal(currentPhone))).toFixed(2);
      // +parseInt(getTotal())-how much you owe
    }else{
      // "You owe "+getNameFromPhone(bill.payee_phone)+___
      return "You owe "+getNameFromPhone(bill.payee_phone)+" RM "+getMemberExpenseTotal(currentPhone).toFixed(2)
    }
  }
  function getDate(timestamp){
    const date = new Date(timestamp);

    // Extracting date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const day = date.getDate();
    
    // Formatting the date
    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    return formattedDate
  }
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.billName}>{bill.bill_name}</Text>
        <Text style={styles.billAmount}>{"Bill Total: RM "+parseFloat(getTotal()).toFixed(2)}</Text>
      </View>
      
      <View style={styles.cardFooter}>
      <Text>Created on: {getDate(bill.created_at)}</Text>
        <Text style={styles.numberMembers}>{bill.members.length+" Members"}</Text>
        <Text style={styles.owe}>{checkBillOwner()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 2,
    width: 340,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  billName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  billAmount: {
    fontSize: 16,
    textAlign: 'right',
  },
  cardFooter: {
    marginTop: 'auto',
    alignItems: 'flex-end',
  },
  numberMembers: {
    fontSize: 16,
    textAlign: 'right',
    color: '#888888',
  },
  owe: {
    fontSize: 13,
    textAlign: 'right',
    // color: '#888888',
  },
});
