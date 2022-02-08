import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import images from '../../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = props => {
  const [show, SetShow] = useState(null);

  useEffect(() => {
    fatchingPreferences();
  }, []);

  // get Preferences
  const fatchingPreferences = async () => {
    try {
      const value = await AsyncStorage.getItem('alreadyLaunch');
      console.log('here value get preferences :', value);
      value && SetShow(value);
    } catch (err) {
      console.log('Something Problem! ', err);
    }
  };

  // set Which screen go on
  useEffect(() => {
    show === 'true' ? goSignin() : goOnBoarding();
  }, [show]);

  const goOnBoarding = () => {
    setTimeout(() => {
      props.navigation.replace('OnBoarding');
    }, 1500);
  };

  const goSignin = () => {
    setTimeout(() => {
      props.navigation.replace('Signin');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.imageSet}
        source={images.logo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121620',
  },
  imageSet: {
    height: 300,
    width: 300,
  },
});

export default SplashScreen;
