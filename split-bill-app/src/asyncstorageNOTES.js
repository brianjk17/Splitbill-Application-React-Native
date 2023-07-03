// Function to store login status
const storeLoginStatus = async (isLoggedIn) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', isLoggedIn.toString());
      console.log('Login status stored successfully.');
    } catch (error) {
      console.log('Error storing login status: ', error);
    }
  };
  
  // Function to retrieve login status
  const getLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn !== null) {
        console.log('User login status:', isLoggedIn);
        return isLoggedIn === 'true'; // Convert string value to boolean
      } else {
        console.log('Login status not found.');
        return false; // Default value if login status is not found
      }
    } catch (error) {
      console.log('Error retrieving login status: ', error);
      return false; // Default value in case of error
    }
  };
  
  // Example usage
  const checkLogin = async () => {
    const isLoggedIn = await getLoginStatus();
    if (isLoggedIn) {
      console.log('User is logged in.');
      // Perform actions for logged-in user
    } else {
      console.log('User is not logged in.');
      // Perform actions for logged-out user
    }
  };
      
      // // Storing login status
      // storeLoginStatus(true);
  
      // // Retrieving and checking login status
      // checkLogin();