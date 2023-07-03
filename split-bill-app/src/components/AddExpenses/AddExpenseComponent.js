import React, { useState } from 'react';
import { View, Button, Modal, FlatList, SafeAreaView } from 'react-native';
import AddExpenseModal from '../AddExpenses/AddExpenseModal';
import AddExpenseCard from '../AddExpenses/AddExpenseCard';
import ModifyExpenseModal from './ModifyExpenseModal';

export default function AddExpenseComponent({expenses, addExpense, deleteExpense,saveExpense, newId}){
  const [isModalVisible, setModalVisible] = useState(false);

  const [isModifyModalVisible, setModifyModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // const [expenses, setExpenses] = useState([]);
  // const [newId, setNewId] = useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModifyModal = () => {
    setModifyModalVisible(!isModifyModalVisible);
  };

  // const addExpense = (expense) => {
  //   setExpenses([...expenses, expense]);
  //   setNewId(newId+1)
  //   console.log(expense)
  // };

  // const deleteExpense = (id) => {
  //   let updatedContacts = expenses.filter((item) => item.id !== id);
  //   setExpenses(updatedContacts);

  //   // const updatedExpenses = [...expenses];
  //   // updatedExpenses.splice(index, 1);
  //   // setExpenses(updatedExpenses);
  // };

  // const saveExpense = (id, newData) => {
  //   console.log("saveExpense")
  //   // console.log(expenses)
  //   // console.log(newData)
  //   const updatedExpenses = expenses.map((expense1) => {
  //     if (expense1.id === id) {
  //       return { ...expense1, ...newData }; // Merge the existing expense data with the new data
  //     }
  //     return expense1;
  //   });
  
  //   setExpenses(updatedExpenses);
  // };

  const ModifyExpense = (expense) => {
    toggleModifyModal()
    console.log("modifyExpense")
    // console.log(expense.item)
    setSelectedExpense(expense.item)
    
    // console.log(expenses)
   
    // return(
    //   <Modal visible={isModifyModalVisible} onRequestClose={toggleModifyModal}>
    //     <ModifyExpenseModal closeModal={toggleModifyModal} expense={expense} onSaveExpense={saveExpense}/>
    //   </Modal>
    // )
  };

  function renderExpenses (expense) {
    console.log("render expenses")
    return (
      <View>
        <AddExpenseCard
          key={expense.id}
          expense={expense}
          onDelete={() => deleteExpense(expense.item.id)}
          onModify={ModifyExpense}
        />
      </View>
    )
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Button title="Add a new expense" onPress={toggleModal} className="bg-blue-500 text-white py-2 px-4 rounded"/>

      <Modal visible={isModalVisible} onRequestClose={toggleModal}>
        <AddExpenseModal onAddExpense={addExpense} closeModal={toggleModal} newId={newId}/>
      </Modal>

      <Modal visible={isModifyModalVisible} onRequestClose={toggleModifyModal}>
        <ModifyExpenseModal closeModal={toggleModifyModal} expense={selectedExpense} onSaveExpense={saveExpense}/>
      </Modal>

      <SafeAreaView>
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            // scrollEnabled={false}
            renderItem={renderExpenses}
            keyboardShouldPersistTaps="always"
            ItemSeparatorComponent={null}
        />
      </SafeAreaView>
    </View>
  );
};
