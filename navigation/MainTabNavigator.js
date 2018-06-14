import React from 'react';
import { TabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default MainTabNavigator = TabNavigator(
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
    tabBarPosition: 'bottom',
  }
);