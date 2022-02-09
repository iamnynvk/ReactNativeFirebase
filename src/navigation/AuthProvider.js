import React, {createContext, useState} from 'react';
import NavigationService from './NavigationService';

// Firebase
import auth from '@react-native-firebase/auth';
import {signUpWithEmail} from '../util/firebase';
import {NAVIGATION} from './navigation';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        signup: async (email, password) => {
          try {
            const valid = await signUpWithEmail(email, password);
            NavigationService.navigate(NAVIGATION.SIGNIN, {
              email,
              password,
              valid,
            });
          } catch (e) {
            console.log('error', e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
