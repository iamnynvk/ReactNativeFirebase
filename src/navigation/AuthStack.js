import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screen
import OnBoardingScreen from '../screens/OnBoardingScreen/OnBoardingScreen';
import SigninScreen from '../screens/Auth/SigninScreen';
import SignupScreen from '../screens/Auth/SignupScreen';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthStack = () => {
  let routeName;
  const [isFirstlaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunch').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunch', 'true');
        console.log('set preference here :', isFirstlaunch);
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, [isFirstlaunch]);

  // Which screen to show first based on whether the user is authenticated
  if (isFirstlaunch === null) {
    return null;
  } else if (isFirstlaunch == true) {
    routeName = 'OnBoarding';
  } else {
    routeName = 'Signin';
  }

  return (
    <Stack.Navigator
      initialRouteName={routeName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
