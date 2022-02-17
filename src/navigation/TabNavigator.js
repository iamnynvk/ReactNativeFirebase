import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Homescreen from '../screens/Home/Homescreen';
import SaveScreen from '../screens/SaveScreen';
import AddScreen from '../screens/AddScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import images from '../constants/images';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#5663FF',
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 20,
          left: 10,
          right: 10,
          borderRadius: 15,
          backgroundColor: 'white',
          elevation: 0,
          height: 90,
          ...styles.shadow,
        },
      }}>
      <Tabs.Screen
        name="Home"
        component={Homescreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? images.HomeFill : images.HomeUnFill}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Save"
        component={SaveScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? images.SaveFill : images.SaveUnFill}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Add"
        component={AddScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? images.RemovePlus : images.AddPlus}
                resizeMode="contain"
                style={styles.addImageStyle}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? images.BellFill : images.BellUnFill}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? images.ProfileFill : images.ProfileUnFill}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  imageStyle: {
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
  addImageStyle: {
    height: 70,
    width: 70,
    top: -30,
  },
});

export default TabNavigator;
