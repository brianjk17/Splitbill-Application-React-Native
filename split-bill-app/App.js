//AUTHNAV
//https://www.nativewind.dev/quick-starts/expo
//https://reactnavigation.org/docs/getting-started
// npm i react-native-heroicons

// https://www.nativewind.dev/quick-starts/create-react-native-app

//https://stackoverflow.com/questions/71600495/why-is-my-tailwind-ract-native-not-changing-anything
// npm i tailwindcss-react-native
// npm i tailwindcss -D
// npx tailwindcss init

//SUPABASE
//https://blog.logrocket.com/choosing-connecting-react-native-backend/#:~:text=You%20can%20use%20Supabase%20completely,the%20React%20Native%20development%20environment.
// password: finalyearproject2023
// yarn add @supabase/supabase-js   

//APPNAV
// yarn add @react-navigation/native
// yarn add @react-navigation/native-stack

//expo install react-native-gesture-handler 
//react-native-reanimated 
//react-native-screens 
//react-native-safe-area-context 
//@react-native-community/masked-view

// yarn add @react-navigation/stack

// yarn add @react-navigation/bottom-tabs

//grey #171717
//yellow #facc15, yellow-400
//new yellow #FFE562
//white #FBFBFB, stone-300

//.env
// $ npm install -D react-native-dotenv


//SWIPE BUTTON
// npm install rn-swipe-button --save

//SWITCH SELECTOR
// yarn add react-native-switch-selector

//feather UI
// npm install feather-icons

/////////////USELESS/////////////

//REACT NATIVE MATERIAL
// yarn add @react-native-material/core

//REACT NATIVE RAPI UI
// npm install react-native-rapi-ui
// expo install react-native-safe-area-context expo-font @expo/vector-icons expo-asset

// import { TailwindProvider } from 'tailwindcss-react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
///////////////////
import { AuthNavigation } from "./navigation/AuthNavigation";

export default function App() {
  return (
      <AuthNavigation/>
  );
}



// import "react-native-gesture-handler";

// import { StatusBar } from "expo-status-bar";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// import { Text, View } from 'react-native';


// import { useLoadedAssets } from "./hooks/useLoadedAssets";
// import Navigation from "./navigation";
// import { useColorScheme } from "react-native";

// export default function App() {
//   const isLoadingComplete = useLoadedAssets();
//   const colorScheme = useColorScheme();

//   if (!isLoadingComplete) {
//     return null;
//   } else {
//     return (
//       <SafeAreaProvider>
//         <Navigation colorScheme={colorScheme} />
//         <StatusBar />
//       </SafeAreaProvider>
//     );
//   }
// }

// export default function App() {
//   return (
//    <View className="flex-1 items-center justify-center bg-white">
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
