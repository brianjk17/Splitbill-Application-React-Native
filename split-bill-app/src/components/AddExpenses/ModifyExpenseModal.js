import React, { useEffect, useState } from 'react';
import { View, TextInput, Button,Text } from 'react-native';

const ModifyExpenseModal = ({ onSaveExpense, closeModal, expense }) => {
  const [expenseName, setExpenseName] = useState('');
  const [expensePrice, setExpensePrice] = useState('');
  const [expenseQuantity, setExpenseQuantity] = useState('');

  const handleAddExpense = () => {
    console.log("handleAddExpense")
    if(expenseName===''||expensePrice===''||expenseQuantity===''){
      alert("Please input all the fields")
    }else if(expensePrice==="0."||parseFloat(expensePrice)===0||expenseQuantity==="0"){
      alert("Please price can't be 0")
    }
    else{
        function format(inputString){
          if (inputString.endsWith('.')) {
            return inputString + '00';
          } else if (inputString.includes('.')) {
            return inputString;
          } else {
            return inputString + '.00';
          }
        }
        const adjustedText= format(expensePrice)
        setExpensePrice(adjustedText) 
        const updatedexpense = {
            id: expense.id,
            name: expenseName,
            price: adjustedText,
            quantity: expenseQuantity,
            //Store phonenumbers
            members:expense.members
          };
      
          onSaveExpense(expense.id, updatedexpense);
          closeModal();
    }
  };

  const handlePriceChange = (text) => {
    // Remove any non-numeric characters from the input
    const filteredText = text.replace(/[^0-9.]/g, '');

    // Check if the first character is a decimal point
    if (filteredText.startsWith('.')) {
      // Discard the input if it starts with a decimal point
      return;// Make sure only one decimal point exists
    }
    
    const decimalCount = filteredText.split('.').length - 1;
    if (decimalCount > 1) {
      // More than one decimal point present, discard the new one
      return;
    }

    // const adjustedText = filteredText.endsWith('.') ? filteredText + '0' : filteredText;

    setExpensePrice(filteredText);
  };
  const handleQuantityChange = (text) => {
    // Remove any non-numeric characters from the input
    const filteredText = text.replace(/[^1-9]/g, '');
    setExpenseQuantity(filteredText);
  };

  useEffect(()=>{
    console.log(expense)
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
        onChangeText={handlePriceChange}
        keyboardType="decimal-pad"
        className="border border-gray-400 rounded p-2 mb-2"
      />
      <TextInput
        placeholder="Expense Quantity"
        value={expenseQuantity}
        onChangeText={handleQuantityChange}
        keyboardType="numeric"
        className="border border-gray-400 rounded p-2 mb-2"
      />
      <Button title="Save" onPress={handleAddExpense} className="bg-blue-500 text-white py-2 px-4 rounded" />
      <Button title="Cancel" onPress={closeModal} className="bg-red-500 text-white py-2 px-4 rounded mt-2" />
    </View>
  );
};

export default ModifyExpenseModal;
