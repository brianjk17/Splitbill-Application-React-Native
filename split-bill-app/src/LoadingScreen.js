import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const Loading = ({ isLoading }) => {
    console.log(isLoading)
  return (
    <View >
      {isLoading ? (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="blue" />
        </View>
        
      ) : (
        // <Text style={styles.text}>Loading Complete!</Text>
        <></>
      )}
    </View>
  );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
};

export default Loading;
