import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';

export default SignedOutNavigator = createStackNavigator({ 
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login',
    }
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      title: 'Sign Up',
    }
  }
});