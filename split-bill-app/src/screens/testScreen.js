import React from 'react';
import { View, Text } from 'react-native';

const Card = ({ cardNumber, phoneNumber, items }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{`Card ${cardNumber}: ${phoneNumber} bought`}</Text>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Text key={index} style={styles.subtitle}>
            {item}
          </Text>
        ))
      ) : (
        <Text style={styles.subtitle}>No items bought</Text>
      )}
    </View>
  );
};

const MyComponent = () => {
  const data = [
    {
      id: 1,
      members: ['0888466556', '0186164694'],
      name: 'Fried rice',
      price: '50.00',
      quantity: '2',
    },
    {
      id: 2,
      members: ['081586688811', '0888466556'],
      name: 'Teh o ais kosong',
      price: '5.00',
      quantity: '2',
    },
  ];

  // Group the data by phone number
  const groupedData = data.reduce((result, item) => {
    item.members.forEach((member) => {
      if (!result[member]) {
        result[member] = [];
      }
      result[member].push(item.name);
    });
    return result;
  }, {});

  return (
    <View style={styles.container}>
      {Object.entries(groupedData).map(([phoneNumber, items], index) => (
        <Card key={index} cardNumber={index + 1} phoneNumber={phoneNumber} items={items} />
      ))}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
};

export default MyComponent;
