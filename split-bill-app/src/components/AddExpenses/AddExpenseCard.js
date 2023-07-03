import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

const ExpenseCard = ({ expense, onDelete, onModify }) => {
    console.log("ExpenseCard")
    // console.log(expense)
    
    const handleOpenModal = () => {
        onModify(expense);
      };
    
    return (
        <View>
            <TouchableOpacity>
                <Text className="text-lg font-bold">ID: {expense.item.id}</Text>
                <Text className="text-lg font-bold">Name: {expense.item.name}</Text>
                <Text>Price: {expense.item.price}</Text>
                <Text>Quantity: {expense.item.quantity}</Text>
                <Text>Members: {toString(expense.item.members)}</Text>
            </TouchableOpacity>

            <Button title="Delete" onPress={onDelete} className="bg-red-500 text-white py-2 px-4 rounded mt-2" />
            <Button title="Modify" onPress={handleOpenModal} className="bg-blue-500 text-white py-2 px-4 rounded mt-2" />
        </View>
    );
};

export default ExpenseCard;
