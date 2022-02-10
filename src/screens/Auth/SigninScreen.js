import React, {useContext, useState, useEffect} from 'react';
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
import {NAVIGATION} from '../../navigation/navigation';

// context
import {AuthContext} from '../../navigation/AuthProvider';

const SigninScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [visible, setVisible] = useState(false);

  const HandlerLogin = async () => {
    setVisible(true);
    setTimeout(() => {
      login(email, password);
      setVisible(false);
      navigation.replace(NAVIGATION.HOME);
    }, 1000);
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
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

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
          onPress={() => navigation.navigate(NAVIGATION.SIGNUP)}>
          <Text style={[styles.navButtonText, {color: 'red'}]}>
            Create here
          </Text>
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
