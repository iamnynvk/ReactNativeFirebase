import React, {useState, useEffect} from 'react';
import {LogBox, View, Text} from 'react-native';
import Providers from './src/navigation/';
// import auth from '@react-native-firebase/auth';
import FirebaseDummy from './src/screens/Home/firebaseDummy';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  // return <Providers />;
  return <FirebaseDummy />;
};

export default App;
