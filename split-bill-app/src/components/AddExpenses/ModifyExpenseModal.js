import React, { useEffect, useState } from 'react';
import { View, TextInput, Button,Text } from 'react-native';

const ModifyExpenseModal = ({ onSaveExpense, closeModal, expense }) => {
  const [expenseName, setExpenseName] = useState('');
  const [expensePrice, setExpensePrice] = useState('');
  const [expenseQuantity, setExpenseQuantity] = useState('');

  const handleAddExpense = () => {
    // console.log(expense)
    // console.log(expense.id)
    
    console.log("handleAddExpense")
    if(expenseName===''||expensePrice===''||expenseQuantity===''){
      alert("Please input all the fields")
    }
    else{
        const updatedexpense = {
            id: expense.id,
            name: expenseName,
            price: expensePrice,
            quantity: expenseQuantity,
            //Store phonenumbers
            members:expense.members
          };
      
          onSaveExpense(expense.id, updatedexpense);
          closeModal();
    }
    

  };

  useEffect(()=>{
    setExpenseName(expense.name)
    setExpensePrice(expense.price)
    setExpenseQuantity(expense.quantity)
  },[])

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold mb-2">Modify Expense</Text>

      <TextInput
        placeholder="Expense Name"
        value={expenseName}
        onChangeText={setExpenseName}
        className="border border-gray-400 rounded p-2 mb-2"
      />
      <TextInput
        placeholder="Expense Price"
        value={expensePrice}
        onChangeText={setExpensePrice}
        keyboardType="numeric"
        className="border border-gray-400 rounded p-2 mb-2"
      />
      <TextInput
        placeholder="Expense Quantity"
        value={expenseQuantity}
        onChangeText={setExpenseQuantity}
        keyboardType="numeric"
        className="border border-gray-400 rounded p-2 mb-2"
      />
      <Button title="Save" onPress={handleAddExpense} className="bg-blue-500 text-white py-2 px-4 rounded" />
      <Button title="Cancel" onPress={closeModal} className="bg-red-500 text-white py-2 px-4 rounded mt-2" />
    </View>
  );
};

export default ModifyExpenseModal;
