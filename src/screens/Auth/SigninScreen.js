import React, {useContext, useState, useEffect, useRef, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import ProgressDialog from 'react-native-progress-dialog';

// components
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import SocialButton from '../../components/SocialButton';

// assets
import images from '../../constants/images';

// context
import {AuthContext} from '../../navigation/AuthProvider';

const SigninScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);

  const [data, setData] = useState({
    email: {value: '', error: '', isValid: false},
    password: {value: '', error: '', isValid: false},
  });

  const [visible, setVisible] = useState(false);

  const HandlerLogin = async () => {
    const emailValue = data.email.value;
    const passwordValue = data.password.value;

    setVisible(true);
    login(emailValue, passwordValue);
    setTimeout(() => {
      setVisible(false);
      navigation.replace('Home');
    }, 1000);
  };

  // Email is Valid or not
  const emailHandler = () => {
    const {value} = data.email;

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(value) === false) {
      setData({
        ...data,
        email: {
          value: value,
          error: 'Please! Enter Valid Email',
          isValid: false,
        },
      });
    } else {
      setData({...data, email: {...data.email, isValid: true}});
    }
  };

  // Password Valid or not
  const passwordHandler = () => {
    const {value} = data.password;

    // Check length of password
    let passwordSize = value.length;

    if (passwordSize == 0) {
      setData({
        ...data,
        password: {
          value: value,
          error: 'Password is required feild',
          isValid: false,
        },
      });
    } else if (passwordSize < 8 || passwordSize > 20) {
      setData({
        ...data,
        password: {
          value: value,
          error: 'Password should be min 8 char and max 20 char',
          isValid: false,
        },
      });
    } else {
      setData({
        ...data,
        password: {
          ...data.password,
          isValid: true,
        },
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressDialog
        visible={visible}
        label="Please Wait..."
        loaderColor="black"
      />
      <Image source={images.logo} style={styles.logo} />

      <FormInput
        labelValue={data.email.value}
        onChangeText={text => {
          setData({...data, email: {value: text}});
        }}
        onBlur={emailHandler}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={{width: '100%', marginBottom: 5}}>
        <Text style={{color: 'red', fontSize: 12, fontWeight: 'bold'}}>
          {data.email.error}
        </Text>
      </View>

      <FormInput
        labelValue={data.password.value}
        onChangeText={text => {
          setData({...data, password: {value: text}});
        }}
        onBlur={passwordHandler}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <View style={{width: '100%', marginBottom: 5}}>
        <Text style={{color: 'red', fontSize: 12, fontWeight: 'bold'}}>
          {data.password.error}
        </Text>
      </View>

      <FormButton buttonTitle="Sign In" onPress={HandlerLogin} />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => {}}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => {}}
          />
        </View>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={styles.navButtonText}>Don't have an acount? </Text>
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.navButtonText, {color: 'red'}]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});
export default SigninScreen;
