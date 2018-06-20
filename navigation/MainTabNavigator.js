import React from 'react';
import { createBottomTabNavigator, NavigationActions } from 'react-navigation';

import HomeSwiperStackNavigator from './HomeSwiperStackNavigator';
import ExploreSwiperStackNavigator from './ExploreSwiperStackNavigator';
import EditProfileStackNavigator from './EditProfileStackNavigator';
import newProfileScreen from '../screens/newProfileScreen';

export default MainTabNavigator = createBottomTabNavigator(
  {
    Home: HomeSwiperStackNavigator,
    Explore: ExploreSwiperStackNavigator,
    Profile: {
      screen: newProfileScreen,//EditProfileStackNavigator,
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

