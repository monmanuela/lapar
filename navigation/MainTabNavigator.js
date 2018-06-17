import React from 'react';
import { createBottomTabNavigator, NavigationActions } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeSwiperStackNavigator from './HomeSwiperStackNavigator';
import ExploreSwiperStackNavigator from './ExploreSwiperStackNavigator';

export default MainTabNavigator = createBottomTabNavigator(
  {
    Home: HomeSwiperStackNavigator,
    Explore: ExploreSwiperStackNavigator,
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

