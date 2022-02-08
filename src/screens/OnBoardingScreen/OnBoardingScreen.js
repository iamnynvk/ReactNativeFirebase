import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import images from '../../constants/images';

const {height, width} = Dimensions.get('window');

const OnBoardingScreen = props => {
  const Done = () => {
    return (
      <TouchableOpacity
        style={{marginRight: 20}}
        onPress={() => {
          props.navigation.replace('Signin');
        }}>
        <Text style={{fontSize: 16, color: 'black'}}>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Onboarding
      bottomBarHighlight={false}
      transitionAnimationDuration={300}
      skipToPage={2}
      DoneButtonComponent={Done}
      pages={[
        {
          backgroundColor: '#A58D78',
          image: <Image source={images.onboarding1} style={styles.imageSet} />,
          title: (
            <Text style={styles.textSet}>Start to invest for your future!</Text>
          ),
          subtitle: (
            <Text style={styles.descriptionSet}>
              Your future depends on the investments you make today.
            </Text>
          ),
        },
        {
          backgroundColor: '#A8D0B5',
          image: <Image source={images.onboarding2} style={styles.imageSet} />,
          title: (
            <Text style={styles.textSet}>
              Follow our tips to achieve success!
            </Text>
          ),
          subtitle: (
            <Text style={styles.descriptionSet}>
              For better success in life the most important things are patience
              and to remain focus
            </Text>
          ),
        },
        {
          backgroundColor: '#FDFF93',
          image: <Image source={images.onboarding3} style={styles.imageSet} />,
          title: <Text style={styles.textSet}>Keep your investment safe</Text>,
          subtitle: (
            <Text style={styles.descriptionSet}>
              Success is the achievement of a high position in a particular
              field
            </Text>
          ),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  imageSet: {
    height: height * 0.5,
    width: width,
  },
  textSet: {
    fontSize: 20,
    color: '#444',
    fontWeight: '800',
    marginBottom: 20,
    marginHorizontal: 35,
  },
  descriptionSet: {
    marginHorizontal: 60,
  },
});

export default OnBoardingScreen;
