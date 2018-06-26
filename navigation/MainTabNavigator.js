import React from 'react';
import { createBottomTabNavigator, NavigationActions } from 'react-navigation';
import HomeSwiperStackNavigator from './HomeSwiperStackNavigator';
import ExploreSwiperStackNavigator from './ExploreSwiperStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';

export default MainTabNavigator = createBottomTabNavigator(
  {
    Home: HomeSwiperStackNavigator,
    Explore: ExploreSwiperStackNavigator,
    Profile: {
      screen: ProfileScreen,
    }
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
