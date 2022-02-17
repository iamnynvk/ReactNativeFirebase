import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';

import {AuthContext} from '../../navigation/AuthProvider';

const Homescreen = ({navigation}) => {
  console.log('Homescreen Navigation :', navigation);
  return (
    <View style={{flex: 1, backgroundColor: '#FEFEFE'}}>
      <Text>Homescreen</Text>
    </View>
  );
};

export default Homescreen;
