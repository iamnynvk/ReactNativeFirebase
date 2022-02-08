import React from 'react';
import {AuthProvider} from './AuthProvider';
import StackNavigator from './StackNavigator';

const index = () => {
  return (
    <AuthProvider>
      <StackNavigator />
    </AuthProvider>
  );
};

export default index;
