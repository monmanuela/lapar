import React from 'react';
import { createBottomTabNavigator, NavigationActions } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SwiperStackNavigator from './SwiperStackNavigator';
import EditProfileStackNavigator from './EditProfileStackNavigator';

export default MainTabNavigator = createBottomTabNavigator(
  {
    Home: SwiperStackNavigator,
    Explore: ExploreScreen,
    Profile: {
      screen: EditProfileStackNavigator,
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

