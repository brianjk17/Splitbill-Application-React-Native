const data =  [
  //  {
  //   "bill_name": "Kantin",
  //   "created_at": "2023-07-12T07:29:36.49985+00:00",
  //   "discount": 0,
  //   "expenses":  [
  //      {
  //       "id": 1,
  //       "members":  [
  //         "081586688811",
  //         "1472580369",
  //         "0176412098",
  //       ],
  //       "name": "Fried rice",
  //       "price": "15.00",
  //       "quantity": "1",
  //     },
  //   ],
  //   "id": 8,
  //   "members":  [
  //      {
  //       "User":  {
  //         "name": "Bri",
  //         "phone": "081586688811",
  //         "user_id": "3",
  //       },
  //     },
  //      {
  //       "User":  {
  //         "name": "Benjamin Button",
  //         "phone": "1472580369",
  //         "user_id": 5,
  //       },
  //     },
  //      {
  //       "User":  {
  //         "name": "Wongwk",
  //         "phone": "0176412098",
  //         "user_id": 7,
  //       },
  //     },
  //   ],
  //   "paid": true,
  //   "payee_phone": "081586688811",
  //   "service": 0,
  //   "tax": 10,
  // },
   {
    "bill_name": "Rocku",
    "created_at": "2023-07-12T14:02:49.950643+00:00",
    "discount": 40,
    "expenses":  [
       {
        "id": 1,
        "members":  [
          "081586688811",
          "1472580369",
          "0888466556",
          "6969696969",
        ],
        "name": "Fanta",
        "price": "12.00",
        "quantity": "2",
      },
       {
        "id": 2,
        "members":  [
          "1472580369",
          "081586688811",
          "0888466556",
          "0176412098",
          "6969696969",
        ],
        "name": "Buffet",
        "price": "40.00",
        "quantity": "4",
      },
       {
        "id": 3,
        "members":  [
          "1472580369",
          "0888466556",
        ],
        "name": "Green Tea",
        "price": "12.00",
        "quantity": "2",
      },
       {
        "id": 4,
        "members":  [
          "081586688811",
          "1472580369",
          "0888466556",
          "0176412098",
          "6969696969",
        ],
        "name": "T",
        "price": "5.00",
        "quantity": "4",
      },
    ],
    "id": 9,
    "members":  [
       {
        "User":  {
          "name": "Bri",
          "phone": "081586688811",
          "user_id": "3",
        },
      },
       {
        "User":  {
          "name": "Benjamin Button",
          "phone": "1472580369",
          "user_id": 5,
        },
      },
       {
        "User":  {
          "name": "John Doe",
          "phone": "0888466556",
          "user_id": 1,
        },
      },
       {
        "User":  {
          "name": "Wongwk",
          "phone": "0176412098",
          "user_id": 7,
        },
      },
       {
        "User":  {
          "name": "Celin",
          "nonUserId": 1,
          "phone": "6969696969",
        },
      },
    ],
    "paid": false,
    "payee_phone": "6969696969",
    "service": 10,
    "tax": 7,
  },
];

function billOwnerisNonuser(phone){
  for (let i = 0; i < data.length; i++) {
    let members = data[i].members;
    for (let j = 0; j < members.length; j++) {
      let user = members[j].User;
      let userPhone = user.phone;
      
      if (userPhone === phone && user.hasOwnProperty("nonUserId")) {
        console.log(user);
        return true;
      }
    }
  }
  return false;
}

console.log(billOwnerisNonuser("696969s6969"))

/////////////////////////////////SYMETRIC
// import { createCipher, createDecipher } from 'crypto';

// // Encryption function
// function encrypt(text, key) {
//   const cipher = createCipher('aes-256-cbc', key);
//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return encrypted;
// }

// // Decryption function
// function decrypt(encryptedText, key) {
//   const decipher = createDecipher('aes-256-cbc', key);
//   let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }

// // Example usage
// const password = 'myPassword123';
// const username = 'johnDoe';

// const secretKey = 'YourSecretKey'; // Replace with your own secret key (keep it secure!)

// const encryptedPassword = encrypt(password, username);
// // const encryptedUsername = encrypt(username, secretKey);

// console.log('Encrypted Password:', encryptedPassword);
// // console.log('Encrypted Username:', encryptedUsername);

// const decryptedPassword = decrypt(encryptedPassword, username);
// // const decryptedUsername = decrypt(encryptedUsername, secretKey);

// console.log('Decrypted Password:', decryptedPassword);
// // console.log('Decrypted Username:', decryptedUsername);
