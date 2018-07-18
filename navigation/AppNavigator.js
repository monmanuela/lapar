import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { createSwitchNavigator }  from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';
import LoadingScreen from '../screens/LoadingScreen';
import MainTabNavigator from './MainTabNavigator';
import SignedOutNavigator from './SignedOutNavigator';
import StallOwnerNavigator from './StallOwnerNavigator';

export default AppNavigator = () => {
	return createSwitchNavigator({
  	LoadingScreen: LoadingScreen,
  	MainTabNavigator: MainTabNavigator,
    SignedOutNavigator: SignedOutNavigator,
    StallOwnerNavigator: StallOwnerNavigator
	})
};