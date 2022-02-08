import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import NavigationService from './NavigationService';
import {signUpWithEmail} from '../util/firebase';

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
            NavigationService.navigate('Signin', {
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
