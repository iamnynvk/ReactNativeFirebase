import React from 'react';
import {Alert, Text} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import NavigationService from '../navigation/NavigationService';
import {NAVIGATION} from '../navigation/navigation';

// Firebase
import auth, {firebase} from '@react-native-firebase/auth';

const firebaseAuth = auth();

/**
 *
 * @param email get email from AuthProvider
 * @param password get password from AuthProvider
 * @returns
 */

export const signUpWithEmail = (email, password) => {
  return new Promise((resolve, reject) => {
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(conformResult => {
        resolve(conformResult);
        Alert.alert(
          'Successfully',
          `Your Email is ${email} Successfully Register`,
          [
            {
              text: 'OK',
              onPress: () =>
                NavigationService.navigate(NAVIGATION.SIGNIN, {
                  email,
                  password,
                }),
            },
          ],
        );
      })
      .catch(error => {
        Alert.alert('Error', `${email}`, [
          {text: 'OK', onPress: () => console.log('issue clicked Ok')},
        ]);
        reject(error);
      });
  });
};
