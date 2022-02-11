import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// screens
import SplashScreen from '../screens/OnBoardingScreen/SplashScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen/OnBoardingScreen';
import SigninScreen from '../screens/Auth/SigninScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import Homescreen from '../screens/Home/Homescreen';
import {NAVIGATION} from '../navigation/navigation';

const Stack = createStackNavigator();

// Firebase
import auth from '@react-native-firebase/auth';

const StackNavigator = () => {
  const [isFirstlaunch, setIsFirstLaunch] = useState(false);

  // Firebase Auth checker
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

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

  if (initializing) {
    return null;
  }

  if (isFirstlaunch === null) {
    return null;
  } else if (isFirstlaunch === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={NAVIGATION.SPLASH}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={NAVIGATION.SPLASH} component={SplashScreen} />
          <Stack.Screen
            name={NAVIGATION.ONBOARDING}
            component={OnBoardingScreen}
          />
          <Stack.Screen name={NAVIGATION.SIGNIN} component={SigninScreen} />
          <Stack.Screen name={NAVIGATION.SIGNUP} component={SignupScreen} />
          <Stack.Screen name={NAVIGATION.HOME} component={Homescreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={NAVIGATION.HOME} component={Homescreen} />
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
          <Stack.Screen
            name={NAVIGATION.ONBOARDING}
            component={OnBoardingScreen}
          />
          <Stack.Screen name={NAVIGATION.SPLASH} component={SplashScreen} />
          <Stack.Screen name={NAVIGATION.SIGNIN} component={SigninScreen} />
          <Stack.Screen
            name={NAVIGATION.SIGNUP}
            component={SignupScreen}
            options={{
              headerShown: 'true',
              headerStyle: {
                backgroundColor: '#f2f2f2',
              },
              headerTintColor: '#666',
            }}
          />
          <Stack.Screen name={NAVIGATION.HOME} component={Homescreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default StackNavigator;
