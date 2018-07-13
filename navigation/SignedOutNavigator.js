import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import SignUpNavigator from './SignUpNavigator';
import LoginScreen from '../screens/LoginScreen';

export default SignedOutNavigator = createSwitchNavigator({ 
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUpNavigator,
    navigationOptions: {
      header: null
    }
  }
});