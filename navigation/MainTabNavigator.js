import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default createBottomTabNavigator(
  {
    Home: HomeScreen,
    Explore: ExploreScreen,
    Profile: ProfileScreen
  },
  {
    tabBarOptions: {
    	labelStyle: {
    		fontSize: 18,
  		},
    },
  }
);