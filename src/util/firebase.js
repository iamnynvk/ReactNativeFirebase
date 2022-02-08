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
      })
      .catch(error => {
        console.log('Signup Time ', error);
        reject(error);
      });
  });
};
