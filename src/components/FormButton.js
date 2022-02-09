import React, {Children} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
const {height, width} = Dimensions.get('window');

const FormButton = props => {
  const {buttonTitle, disabled, onPress, ...rest} = props;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View
        style={[styles.buttonContainer, disabled && {opacity: 0.5}]}
        {...rest}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30,
    width: width,
    height: height / 15,
    backgroundColor: '#2e64e5',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Roboto-Regular',
  },
});
export default FormButton;
