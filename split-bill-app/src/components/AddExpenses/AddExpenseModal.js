import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { View, TextInput, Button,Text, TouchableOpacity } from 'react-native';

const AddExpenseModal = ({ onAddExpense, closeModal, newId }) => {
  const [expenseName, setExpenseName] = useState('');
  const [expensePrice, setExpensePrice] = useState('');
  const [expenseQuantity, setExpenseQuantity] = useState('');

  const handleAddExpense = () => {
    console.log(expenseName,expensePrice,expenseQuantity)
    if(expenseName===''||expensePrice===''||expenseQuantity===''){
      alert("Please input all the fields")
    }else if(expensePrice==="0."||parseFloat(expensePrice)===0||expenseQuantity==="0"){
      alert("Please price can't be 0")
    }
    else{
      // console.log(newId)
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
      console.log("adjustedText")
      // console.log(adjustedText)
      setExpensePrice(adjustedText) 

      const expense = {
        id: newId,
        name: expenseName,
        price: adjustedText,
        quantity: expenseQuantity,
         //Store phonenumbers
        members:[]
      };
      onAddExpense(expense);
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

    // // Check if the first character is a decimal point
    // if (filteredText.startsWith('.')) {
    //   // Discard the input if it starts with a decimal point
    //   return;// Make sure only one decimal point exists
    // }

    // const decimalCount = filteredText.split('.').length - 1;
    // if (decimalCount > 1) {
    //   // More than one decimal point present, discard the new one
    //   return;
    // }
    setExpenseQuantity(filteredText);
  };

  return (
    <View className="flex-1 bg-[#f8f8f8] p-4">
       
      <View className="justify-center mb-40 mt-40 bg-[#FFE562] rounded-2xl px-4 pb-6 h-[500px]">
        <Text className="text-lg font-bold mb-2 ">Add Expense</Text>
        

        {/* <Text className="text-lg font-bold mb-2 ">Add Expense</Text> */}
        <TextInput
          placeholder="Expense Name"
          value={expenseName}
          onChangeText={setExpenseName}
          className="p-4 bg-white text-gray-700 rounded-2xl mb-3"      
        />

        <TextInput
          placeholder="Total Expense Price"
          value={expensePrice}
          onChangeText={handlePriceChange}
          keyboardType="numeric"
          className="p-4 bg-white text-gray-700 rounded-2xl mb-3"      
        />

        <TextInput
          placeholder="Expense Quantity"
          value={expenseQuantity}
          onChangeText={handleQuantityChange}
          keyboardType="numeric"
          className="p-4 bg-white text-gray-700 rounded-2xl mb-3"      
        />

        <View className="justify-between py-4">
          <TouchableOpacity  onPress={handleAddExpense} 
          className="bg-blue-500 mb-3" 
          style={{
            height: 50,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
            <Text className="text-lg font-bold mb-2 text-white">Add</Text>
          </TouchableOpacity>
          <TouchableOpacity title="Cancel" onPress={closeModal} className="bg-red-500" 
          style={{
            height: 50,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
            <Text className="text-lg font-bold mb-2 text-white">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
};

export default AddExpenseModal;
