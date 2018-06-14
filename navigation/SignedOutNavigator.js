import React from 'react';
import { StackNavigator } from 'react-navigation';
import SignUp from '../screens/SignUpScreen';
import Login from '../screens/LoginScreen';

export default SignedOutNavigator = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    }
  }
});