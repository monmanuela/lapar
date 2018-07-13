import React from 'react'
import { createStackNavigator } from 'react-navigation'
import SignUpScreen from '../screens/SignUpScreen'
import NormalSignUpScreen from '../screens/NormalSignUpScreen'
import StallOwnerSignUpScreen from '../screens/StallOwnerSignUpScreen'
import LoginScreen from '../screens/LoginScreen';

export default SignUpNavigator = createStackNavigator({
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null
    }
  },
  NormalSignUp: {
    screen: NormalSignUpScreen,
    navigationOptions: {
      header: null
    }
  },
  StallOwnerSignUp: {
    screen: StallOwnerSignUpScreen,
    navigationOptions: {
      header: null
    }
  }
})