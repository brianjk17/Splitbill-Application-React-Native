import React, { useState } from 'react';
import { View, Button, Modal, FlatList, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import AddExpenseModal from '../AddExpenses/AddExpenseModal';
import AddExpenseCard from '../AddExpenses/AddExpenseCard';
import ModifyExpenseModal from './ModifyExpenseModal';

export default function AddExpenseComponent({expenses, addExpense, deleteExpense, saveExpense, newId, assignExpense, selectedUsers}){
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

  const ModifyExpense = (expense) => {
    toggleModifyModal()
    console.log("modifyExpense")
    // console.log(expense)
    setSelectedExpense(expense)
    
    // console.log(expenses)
   
    // return(
    //   <Modal visible={isModifyModalVisible} onRequestClose={toggleModifyModal}>
    //     <ModifyExpenseModal closeModal={toggleModifyModal} expense={expense} onSaveExpense={saveExpense}/>
    //   </Modal>
    // )
  };

  function renderExpenses (expense) {
    // if (!expense || !expense.id) {
    //   // Handle the case when expense is undefined or doesn't have an id
    //   console.log(expense)
    //   console.log(expense.id)
    //   return null; // or you can render a default component or error message
    // }
    console.log("render expenses")
    // console.log(expense)
    // console.log(expense.id)
    return (
        <AddExpenseCard
          key={expense.id}
          expense={expense}
          onDelete={() => deleteExpense(expense.id)}
          onModify={() => ModifyExpense(expense)}
          assignExpense={assignExpense}
          selectedUsers={selectedUsers}
        />
    )
  };

  return (
    <View  className="flex-1 bg-[#A6A6A6] rounded-2xl px-4 py-3 mt-3 mx-3">
      {/* <Button title="Add a new expense" onPress={toggleModal} className="bg-blue-500 text-white py-2 px-4 rounded"/> */}
      <TouchableOpacity  onPress={toggleModal} 
        className="bg-blue-500 mb-3 mt-3" 
        style={{
            height: 50,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
        }}
      >
                <Text className="text-lg font-bold text-white">Add a new expense</Text>
      </TouchableOpacity>
      
      <Modal
      animationType="fade" 
      visible={isModalVisible} 
      onRequestClose={toggleModal}>
        <AddExpenseModal onAddExpense={addExpense} closeModal={toggleModal} newId={newId}/>
      </Modal>

      <Modal animationType="fade" visible={isModifyModalVisible} onRequestClose={toggleModifyModal}>
        <ModifyExpenseModal closeModal={toggleModifyModal} expense={selectedExpense} onSaveExpense={saveExpense}/>
      </Modal>

      <SafeAreaView>
        {/* <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            // scrollEnabled={false}
            renderItem={renderExpenses}
            keyboardShouldPersistTaps="always"
            ItemSeparatorComponent={null}
        /> */}
        {console.log(expenses)}
        {expenses.map((expense) => (
              <React.Fragment key={expense.id}>
                {renderExpenses(expense)}
              </React.Fragment>
        ))}
      </SafeAreaView>
    </View>
  );
};
