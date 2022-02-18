import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';

import {AuthContext} from '../../navigation/AuthProvider';

const Homescreen = ({navigation}) => {
  console.log('this is reciece navigation :', navigation);
  const {logout} = useContext(AuthContext);
  console.log('Homescreen Navigation :', navigation);
  return (
    <View style={{flex: 1, backgroundColor: '#FEFEFE'}}>
      <Text>Homescreen</Text>
      <Button
        title="Sing out"
        onPress={() => {
          logout();
          navigation.navigate('Signin');
        }}
      />
    </View>
  );
};

export default Homescreen;
