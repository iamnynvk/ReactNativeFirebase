import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ToastAndroid,
} from 'react-native';
import ProgressDialog from 'react-native-progress-dialog';

// components
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import SocialButton from '../../components/SocialButton';
import {NAVIGATION} from '../../navigation/navigation';

// Import Context
import {AuthContext} from '../../navigation/AuthProvider';

const SignupScreen = ({navigation}) => {
  // States
  const [data, setData] = useState({
    name: {value: '', error: '', isValid: false},
    email: {value: '', error: '', isValid: false},
    mobileno: {value: '', error: '', isValid: false},
    password: {value: '', error: '', isValid: false},
    repassword: {value: '', error: '', isValid: false},
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [visible, setVisible] = useState(false);

  // Context
  const {signup, signUpData} = useContext(AuthContext);

  // set Toast in Android
  const showToast = () => {
    ToastAndroid.show('Registration Successfully', ToastAndroid.SHORT);
  };

  const HandlerLogin = async () => {
    setVisible(true);
    let nameValue = data.name.value;
    let emailValue = data.email.value;
    let mobilenoValue = data.mobileno.value;
    let passwordValue = data.password.value;
    let repassword = data.repassword.value;

    // Store data in firestore of firebase
    if (
      nameValue &&
      emailValue &&
      mobilenoValue &&
      passwordValue &&
      repassword
    ) {
      setVisible(true);
      // signup here
      signup(emailValue, passwordValue);
      // data store in firestore
      signUpData(nameValue, emailValue, mobilenoValue);
      setTimeout(() => {
        showToast();
        navigation.navigate(NAVIGATION.SIGNIN);
        setVisible(false);
      }, 2000);
    }
  };

  useEffect(() => {
    VisibleButton();
  }, [{...data}]);

  // If check error are receive that button is disable or not
  const VisibleButton = () => {
    let nameErr = data.name.error;
    let emailErr = data.email.error;
    let mobileErr = data.mobileno.error;
    let passwordErr = data.password.error;
    let repasswordErr = data.repassword.error;

    if (
      nameErr == null &&
      emailErr == null &&
      mobileErr == null &&
      passwordErr == null &&
      repasswordErr == null
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  // Name Validation here...
  const nameHandler = () => {
    const {value} = data.name;

    const reg = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
    if (reg.test(value)) {
      setData({
        ...data,
        name: {
          ...data.name,
          isValid: true,
        },
      });
    } else {
      setData({
        ...data,
        name: {
          value: value,
          error: 'Enter Valid Name',
          isValid: false,
        },
      });
    }
  };

  // Email Validation here...
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

  // Mobile No Validation Here...
  const mobileHandler = () => {
    const {value} = data.mobileno;

    const reg = /^[0]?[789]\d{9}$/;
    if (reg.test(value) == false) {
      setData({
        ...data,
        mobileno: {
          value: value,
          error: 'Please! enter valid mobile number',
          isValid: false,
        },
      });
    } else {
      setData({
        ...data,
        mobileno: {
          ...data.mobileno,
          isValid: true,
        },
      });
    }
  };

  // Password Validation
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

  // Repassword Validation
  const rePasswordHandler = () => {
    let passwordValue = data.password.value;
    let repasswordValue = data.repassword.value;

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
        repassword: {...data.repassword, isValid: true},
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
      <Text style={styles.text}>Create an Account</Text>

      {/* Name Field Here  */}
      <FormInput
        labelValue={data.name.value}
        onChangeText={text => setData({...data, name: {value: text}})}
        onBlur={nameHandler}
        placeholderText="Name"
        iconType="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={{width: '100%', marginBottom: 5}}>
        <Text style={{color: 'red', fontSize: 12, fontWeight: 'bold'}}>
          {data.name.error}
        </Text>
      </View>

      {/* Email Field Here  */}
      <FormInput
        labelValue={data.email.value}
        onChangeText={text => {
          setData({...data, email: {value: text}});
        }}
        onBlur={emailHandler}
        placeholderText="Email"
        iconType="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={{width: '100%', marginBottom: 5}}>
        <Text style={{color: 'red', fontSize: 12, fontWeight: 'bold'}}>
          {data.email.error}
        </Text>
      </View>

      {/* Mobileno Field Here  */}
      <FormInput
        labelValue={data.mobileno.value}
        onChangeText={text => {
          setData({...data, mobileno: {value: text}});
        }}
        onBlur={mobileHandler}
        placeholderText="Mobile No"
        iconType="phone"
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={{width: '100%', marginBottom: 5}}>
        <Text style={{color: 'red', fontSize: 12, fontWeight: 'bold'}}>
          {data.mobileno.error}
        </Text>
      </View>

      {/* Password field Here  */}
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

      {/* Repassword  field Here  */}
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
        <TouchableOpacity
          onPress={() => Linking.openURL('https://hops.healthcare/blogs/')}>
          <Text style={[styles.color_textPrivate]}>Terms of service </Text>
        </TouchableOpacity>
        <Text>and </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:lalakanji0001@gmail.com')}>
          <Text style={[styles.color_textPrivate]}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={styles.navButtonText}>Have an account ? </Text>
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate(NAVIGATION.SIGNIN)}>
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
