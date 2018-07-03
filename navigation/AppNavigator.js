import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { createSwitchNavigator }  from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';
import MainTabNavigator from './MainTabNavigator';
import SignedOutNavigator from './SignedOutNavigator';
import SignUp from '../screens/SignUpScreen';
import Login from '../screens/LoginScreen';
import firebase from 'react-native-firebase'
// import { createStore, combineReducers } from 'redux';
// import { connect } from 'react-redux';

export default AppNavigator = () => {
  let initialNavigator

  firebase.auth().onAuthStateChanged(user => {
    initialNavigator = 'SignedOutNavigator'
    if (user) {
      console.log("setting nav to main")
      initialNavigator = 'MainTabNavigator'
    } else {
      console.log("setting nav to sign out")
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