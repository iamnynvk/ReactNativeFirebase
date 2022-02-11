import React from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {width, height} = Dimensions.get('window');

const FormInput = ({
  labelValue,
  placeholderText,
  iconType,
  onBlur,
  ...rest
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#666" />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        placeholderTextColor="#666"
        numberOfLines={1}
        placeholder={placeholderText}
        onBlur={onBlur}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    marginBottom: 3,
    width: '100%',
    height: width / 7,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormInput;
