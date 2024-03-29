// import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, } from 'react-native';

const ExpenseCard = ({ expense, onDelete, onModify, assignExpense, selectedUsers }) => {
    console.log("ExpenseCard")
    // console.log(expense)
    // const [updateExpense,setUpdateExpense]=useState()
    const handleOpenModal = () => {
        onModify(expense);
      };

    return (
        <View 
        className="bg-[#FFFFFF]"
            style={{
            borderRadius: 30,
            paddingBottom: 10,
            padding:10
        }}>
            <TouchableOpacity
                onPress={()=>assignExpense(expense.id)}
                className="bg-[#FFFFFF] mt-3"
                style={{
                    // height: 50,
                    borderRadius: 30,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    paddingLeft: 10,
                }}
            >
                {/* <Text className="text-lg font-bold">ID: {expense.id}</Text> */}
                <Text className="text-lg font-bold">Name: {expense.name}</Text>
                <Text>Total Price: RM {expense.price}</Text>
                <Text>Price per item: RM {(parseFloat(expense.price)/parseFloat(expense.quantity)).toFixed(2)}</Text>
                <Text>Quantity: {expense.quantity}</Text>
                <Text>Members:</Text>
                {expense.members.map((member) => (
                    <Text key={member}>{(selectedUsers.find(item => item.User.phone === member).User.name)}</Text>
                ))}
            </TouchableOpacity>

            <TouchableOpacity  onPress={handleOpenModal} 
                className="bg-blue-500 mb-3 mt-3" 
                style={{
                    height: 50,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                }}
            >
                <Text className="text-lg font-bold text-white">Modify</Text>
            </TouchableOpacity>

            <TouchableOpacity title="Delete" onPress={onDelete} 
                className="bg-red-500" 
                style={{
                    height: 50,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                }}
            >
                <Text className="text-lg font-bold text-white">Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ExpenseCard;
