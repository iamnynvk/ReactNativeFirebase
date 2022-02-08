import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

// components
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import SocialButton from '../../components/SocialButton';

// Firebase
import firestore from '@react-native-firebase/firestore';

const SignupScreen = ({navigation}) => {
  const [data, setData] = useState({
    email: {value: '', error: '', isValid: false},
    password: {value: '', error: '', isValid: false},
    repassword: {value: '', error: '', isValid: false},
  });

  const [isDisabled, setIsDisabled] = useState(true);

  // collection
  const usersCollection = firestore().collection('Users');

  const HandlerLogin = async () => {
    let collection = {...data};

    let emailValue = collection.email.value;
    let passwordValue = collection.password.value;
    let repassword = collection.repassword.value;
    console.log(collection);
  };

  useEffect(() => {
    VisibleButton();
  }, [{...data}]);

  const VisibleButton = () => {
    let emailValue = data.email.value;
    let passwordValue = data.password.value;
    let repassword = data.repassword.value;

    if (emailValue && passwordValue && repassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  // Email Validation here...
  const emailHandler = () => {
    let collection = {...data};
    let emailValue = collection.email.value;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(emailValue) === false) {
      setData({
        ...data,
        email: {
          value: emailValue,
          error: 'Please! Enter Valid Email',
          isValid: false,
        },
      });
    } else {
      setData({...data, email: {value: emailValue, error: ' ', isValid: true}});
    }
  };

  // Password Validation
  const passwordHandler = () => {
    let collection = {...data};
    let passwordValue = collection.password.value;
    let repasswordValue = collection.repassword.value;

    // Check length of password
    let passwordSize = passwordValue.length;

    if (passwordSize == 0) {
      setData({
        ...data,
        password: {
          value: passwordValue,
          error: 'Password is required feild',
          isValid: false,
        },
      });
    } else if (passwordSize < 8 || passwordSize > 20) {
      setData({
        ...data,
        password: {
          value: passwordValue,
          error: 'Password should be min 8 char and max 20 char',
          isValid: false,
        },
      });
    } else {
      setData({
        ...data,
        password: {
          value: passwordValue,
          error: ' ',
          isValid: true,
        },
      });
    }
  };

  // Repassword Validation
  const rePasswordHandler = () => {
    let collection = {...data};
    let passwordValue = collection.password.value;
    let repasswordValue = collection.repassword.value;

    let passwordSize = repasswordValue.length;

    if (passwordSize == 0) {
      setData({
        ...data,
        repassword: {
          value: repasswordValue,
          error: 'Confirm Password is required feild',
          isValid: false,
        },
      });
    } else if (passwordSize < 8 || passwordSize > 20) {
      setData({
        ...data,
        repassword: {
          value: repasswordValue,
          error: 'Password should be min 8 char and max 20 char',
          isValid: false,
        },
      });
    } else if (passwordValue !== repasswordValue) {
      setData({
        ...data,
        repassword: {
          value: repasswordValue,
          error: 'Passwoad and confirm password should be same',
          isValid: false,
        },
      });
    } else {
      setData({
        ...data,
        repassword: {value: repasswordValue, error: ' ', isValid: true},
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Create an Account</Text>

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

      <FormInput
        labelValue={data.repassword.value}
        onChangeText={text => {
          setData({...data, repassword: {value: text}});
        }}
        onBlur={rePasswordHandler}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <View style={{width: '100%', marginBottom: 5}}>
        <Text style={{color: 'red', fontSize: 12, fontWeight: 'bold'}}>
          {data.repassword.error}
        </Text>
      </View>

      {/* <FormButton buttonTitle="Sign up" onPress={HandlerLogin} /> */}
      <FormButton
        disabled={isDisabled}
        buttonTitle="Sign up"
        onPress={HandlerLogin}
      />

      <View style={styles.textPrivate}>
        <Text>By registering, you confirm that you accept out </Text>
        <TouchableOpacity>
          <Text style={[styles.color_textPrivate]}>Terms of service </Text>
        </TouchableOpacity>
        <Text>and </Text>
        <TouchableOpacity>
          <Text style={[styles.color_textPrivate]}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

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
        <Text style={styles.navButtonText}>Have an account ? </Text>
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate('Signin')}>
          <Text style={[styles.navButtonText, {color: 'red'}]}>Sign In</Text>
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
    color: 'red',
  },
});

export default SignupScreen;
