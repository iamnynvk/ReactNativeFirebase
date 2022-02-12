import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screen
import Homescreen from '../screens/Home/Homescreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Homescreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
