import React from 'react';
import { View, Text } from 'react-native';
// import {AES,enc} from 'crypto-js';
import CryptoJS from 'react-native-crypto-js';


export default function TestScreen(){
  function encrypt(message, key) {
    const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();
    console.log("\encrypt key", key)
    console.log("pass", message)
    console.log("encrypted pass", encryptedMessage)
    decrypt(encryptedMessage,key)
    return encryptedMessage;
  }

  function decrypt(message, key) {
    const decryptedBytes = CryptoJS.AES.decrypt(message, key);
    const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
    console.log("decrypt key", key)
    console.log("decrypt pass", decryptedMessage)
    return decryptedMessage;
  }

  return(
  <>
      <Text>{encrypt('123123','164389616')}</Text>
      {/* <Text>{decrypt('U2FsdGVkX18HCd1VU3LXdVOeyB64nbMH85RYyCyC7ko=','0183288974')}</Text> */}
    </>
    
  )
}

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

// export default MyComponent;
