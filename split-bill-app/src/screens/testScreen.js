import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Button } from 'react-native';

const MyComponent = () => {
  const [users, setUsers] = useState([
    { id: 'id1', name: 'User 1' },
    { id: 'id2', name: 'User 2' },
    { id: 'id3', name: 'User 3' },
  ]);

  const [expenses, setExpenses] = useState([
    {
      name: 'Food A',
      price: 25,
      members: [],
    },
    {
      name: 'Food B',
      price: 16,
      members: [],
    },
  ]);

  const handleUserPress = (userId) => {
    const updatedExpenses = expenses.map((expense) => {
      if (expense.members.includes(userId)) {
        // User is already assigned to the expense, remove them
        const updatedMembers = expense.members.filter((id) => id !== userId);
        return { ...expense, members: updatedMembers };
      } else {
        // User is not assigned to the expense, add them
        const updatedMembers = [...expense.members, userId];
        return { ...expense, members: updatedMembers };
      }
    });

    setExpenses(updatedExpenses);
  };

  const handleAccept = () => {
    console.log({ expenses });
  };

  return (
    <View>
      <Text>Users:</Text>
      <View style={{ flexDirection: 'row' }}>
        {users.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: expenses.some((expense) => expense.members.includes(user.id))
                ? 'blue'
                : '#f0f0f0',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 5,
            }}
            onPress={() => handleUserPress(user.id)}
          >
            <Text>{user.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text>Expenses:</Text>
      <View style={{ flexDirection: 'row' }}>
        {expenses.map((expense, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
              backgroundColor: 'gray',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 5,
              marginBottom: 10,
            }}
            onPress={() => console.log('Expense:', expense)}
          >
            <Text>{expense.name}</Text>
            <Text>Price: ${expense.price}</Text>
            <Text>Members: {expense.members.length}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Accept" onPress={handleAccept} />
    </View>
  );
};

export default MyComponent;
