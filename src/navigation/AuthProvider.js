import React, {createContext, useState} from 'react';

import {
  signUpWithEmail,
  signUpStoreData,
  signInWithEmail,
  logOut,
} from '../util/firebase';
import {NAVIGATION} from './navigation';

export const AuthContext = createContext({});

export const AuthProvider = ({children, Navigation}) => {
  const [authUser, setAuthUser] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        user,
        setUser,
        setAuthUser,
        signup: async (email, password) => {
          try {
            await signUpWithEmail(email, password);
          } catch (e) {
            console.log('Sign up - error', e);
          }
        },

        signUpData: async (name, email, mobile) => {
          try {
            await signUpStoreData(name, email, mobile);
          } catch (e) {
            console.log('Sign in Data Store - error', e);
          }
        },

        login: async (email, password) => {
          try {
            await signInWithEmail(email, password);
          } catch (e) {
            console.log('Sign in - error', e);
          }
        },

        logout: async () => {
          try {
            await logOut();
            Navigation.replace(NAVIGATION.SIGNIN);
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
