import React, {createContext, useState} from 'react';

import {
  signUpWithEmail,
  signUpStoreData,
  signInWithEmail,
} from '../util/firebase';

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
      }}>
      {children}
    </AuthContext.Provider>
  );
};
