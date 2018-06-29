import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { createSwitchNavigator }  from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';
import MainTabNavigator from './MainTabNavigator';
import SignedOutNavigator from './SignedOutNavigator';
import SignUp from '../screens/SignUpScreen';
import Login from '../screens/LoginScreen';
import firebase from 'react-native-firebase'


export default AppNavigator = () => {
  let initialNavigator

  firebase.auth().onAuthStateChanged(function(user) {
  // once the user is logged in, go straight to home page
  // until user explicitly logs out
    if (user) {
      initialNavigator = 'MainTabNavigator'
    } else {
      initialNavigator = 'SignedOutNavigator'
    }
  })

  return createSwitchNavigator(
    {
      MainTabNavigator: {
        screen: MainTabNavigator
      },
      SignedOutNavigator: {
        screen: SignedOutNavigator
      },
    },
    {
      initialRouteName: initialNavigator
    }
  );
};