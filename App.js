import React, {useState, useEffect} from 'react';
import {LogBox, View, Text} from 'react-native';
import Providers from './src/navigation/';
// import auth from '@react-native-firebase/auth';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  return <Providers />;
};

// const App = () => {
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState(false);

//   function onAuthStateChange(user) {
//     setUser(user);
//     if (initializing) {
//       setInitializing(false);
//     }
//   }

//   useEffect(() => {
//     const subscribe = auth().onAuthStateChanged(onAuthStateChange);
//     return subscribe;
//   }, []);

//   useEffect(() => {
//     auth()
//       .signInAnonymously()
//       .then(() => {
//         console.log('User signed in anonymously');
//       })
//       .catch(error => {
//         if (error.code === 'auth/operation-not-allowed') {
//           console.log('Enable anonymous in your firebase console.');
//         }

//         console.error(error);
//       });
//   }, []);

//   if (initializing) {
//     return null;
//   }

//   if (!user) {
//     return (
//       <View>
//         <Text>Login</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       <Text>Welcome {user.email}</Text>
//     </View>
//   );
// };

export default App;
