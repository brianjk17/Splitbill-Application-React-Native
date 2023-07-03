import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function BillCard ({bill, onPress}){
  const[bill_id, setBilli_id]=useState("")
  // let name="Electricity Bill" 
  // let amount="$100" 
  // let number=5 + " Members"
  // let billID=2
  // {name, amount, number, billID, onPress}
  const [name,setName]=useState(bill.name)
  const [total,setTotal]=useState(bill.total)
  const [number,setNumber]=useState(bill.number)

  useEffect(()=>{
    setBilli_id(bill.billID)
    // console.log(bill.name)
  })
 
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.billName}>{name}</Text>
        <Text style={styles.billAmount}>{"Total: RM "+total}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.numberMembers}>{number+" Members"}</Text>
        <Text style={styles.owe}>{"You owe Brian"+ " amount"}</Text>
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
    color: '#888888',
  },
});
