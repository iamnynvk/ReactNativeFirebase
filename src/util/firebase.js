import {Alert, ToastAndroid} from 'react-native';

// Firebase
import auth, {firebase, getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firebaseAuth = auth();
export const getAuthUserId = () => firebaseAuth.currentUser?.uid;

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
        conformResult.user.sendEmailVerification();
        ToastAndroid.show('Email Sent Successfully', ToastAndroid.LONG);
        resolve(conformResult);
      })
      .catch(error => {
        Alert.alert('Issue with sign up', error.message);
        reject(error);
      });
  });
};

/**
 *
 * @param name - providing name and store cloude in firebase
 * @param email - providing email and store cloude in firebase
 * @param mobile -  providing mobile and store cloude in firebase
 * @returns
 */

export const signUpStoreData = (name, email, mobile) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users_data')
      .doc()
      .set({
        name: name,
        email: email,
        mobile: mobile,
      })
      .then(conformResult => {
        resolve(conformResult);
        ToastAndroid.show('Registration Sucessfully...', ToastAndroid.SHORT);
      })
      .catch(error => {
        Alert.alert('Issue with Registration', error.message);
        reject(error);
      });
  });
};

/**
 *
 * @param email  valid email or not check after login
 * @param password valid password or not chack after login
 * @returns
 */

export const signInWithEmail = (email, password) => {
  return new Promise((resolve, reject) => {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(conformResult => {
        resolve(conformResult);
      })
      .catch(error => {
        Alert.alert('Issue with Login', error.message);
        reject(error);
      });
  });
};

/**
 * @returns logOut - user logout using firebase
 */

export const logOut = () => {
  return new Promise((resolve, reject) => {
    firebaseAuth
      .signOut()
      .then(conformResult => {
        resolve(conformResult);
      })
      .catch(error => {
        reject(error);
        console.log(error);
      });
  });
};
