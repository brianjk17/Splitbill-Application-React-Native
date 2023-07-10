// const data = [
//     {
//       id: 1,
//       members: ['0888466556', '0186164694'],
//       name: 'Fried rice',
//       price: '50.00',
//       quantity: '2',
//     },
//     {
//       id: 2,
//       members: ['081586688811', '0888466556'],
//       name: 'Teh o ais kosong',
//       price: '5.00',
//       quantity: '2',
//     },
// ];

// // Group the data by phone number
// const groupedData = data.reduce((result, item) => {
// item.members.forEach((member) => {
//     if (!result[member]) {
//     result[member] = [];
//     }
//     result[member].push({name:item.name, 
//         price:item.price, 
//         members:item.members.length, 
//         quantity:item.quantity});
// });
// return result;
// }, {});

// console.log(groupedData)


/////////////////////////////////SYMETRIC
import { createCipher, createDecipher } from 'crypto';

// Encryption function
function encrypt(text, key) {
  const cipher = createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Decryption function
function decrypt(encryptedText, key) {
  const decipher = createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Example usage
const password = 'myPassword123';
const username = 'johnDoe';

const secretKey = 'YourSecretKey'; // Replace with your own secret key (keep it secure!)

const encryptedPassword = encrypt(password, username);
// const encryptedUsername = encrypt(username, secretKey);

console.log('Encrypted Password:', encryptedPassword);
// console.log('Encrypted Username:', encryptedUsername);

const decryptedPassword = decrypt(encryptedPassword, username);
// const decryptedUsername = decrypt(encryptedUsername, secretKey);

console.log('Decrypted Password:', decryptedPassword);
// console.log('Decrypted Username:', decryptedUsername);
