import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screen
import Homescreen from '../screens/Home/Homescreen';
import SaveScreen from '../screens/SaveScreen';
import AddScreen from '../screens/AddScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Homescreen} />
      <Stack.Screen name="Save" component={SaveScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
