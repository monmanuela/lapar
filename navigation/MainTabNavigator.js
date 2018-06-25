import React from 'react';
import { createBottomTabNavigator, NavigationActions } from 'react-navigation';

import HomeSwiperStackNavigator from './HomeSwiperStackNavigator';
import ExploreSwiperStackNavigator from './ExploreSwiperStackNavigator';
import newProfileScreen from '../screens/newProfileScreen';

export default MainTabNavigator = createBottomTabNavigator(
  {
    Home: HomeSwiperStackNavigator,
    Explore: ExploreSwiperStackNavigator,
    Profile: {
      screen: newProfileScreen,
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
