import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// screens
import SplashScreen from '../screens/OnBoardingScreen/SplashScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen/OnBoardingScreen';
import SigninScreen from '../screens/Auth/SigninScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import Icon from 'react-native-fontawesome';

const Stack = createStackNavigator();

const StackNavigator = () => {
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

  if (isFirstlaunch === null) {
    return null;
  } else if (isFirstlaunch === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              title: 'Sign in',
              headerShown: 'true',
              headerStyle: {
                backgroundColor: '#cece',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default StackNavigator;
