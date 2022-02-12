import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';

import {AuthContext} from '../../navigation/AuthProvider';

const Homescreen = ({navigation}) => {
  console.log('Homescreen :', navigation);
  const {logout} = useContext(AuthContext);
  return (
    <View>
      <Text>Homescreen</Text>
      <Button
        title="Logout"
        onPress={() => {
          logout();
          navigation.replace('Signin');
        }}
      />
    </View>
  );
};

export default Homescreen;
