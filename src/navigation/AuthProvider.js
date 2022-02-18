import React, {createContext, useState} from 'react';

import {
  getAuthUserId,
  signUpWithEmail,
  signUpStoreData,
  signInWithEmail,
  logOut,
} from '../util/firebase';

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
            console.log(e);
          }
        },

        signUpData: async (name, email, mobile) => {
          try {
            await signUpStoreData(name, email, mobile);
          } catch (e) {
            console.log(e);
          }
        },

        login: async (email, password) => {
          try {
            await signInWithEmail(email, password);
          } catch (e) {
            console.log(e);
          }
        },

        logout: async () => {
          try {
            await logOut();
            Navigation.replace('Signin');
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
