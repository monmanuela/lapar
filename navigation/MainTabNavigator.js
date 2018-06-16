import React from 'react';
import { createBottomTabNavigator, NavigationActions } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SwiperStackNavigator from './SwiperStackNavigator';

export default MainTabNavigator = createBottomTabNavigator(
  {
    Home: SwiperStackNavigator,
    Explore: ExploreScreen,
    Profile: ProfileScreen
  },
  {
    tabBarOptions: {
    	labelStyle: {
    		fontSize: 18,
  		},
    },
    swipeEnabled: false
  }
);

