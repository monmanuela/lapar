import React from 'react';
import { createBottomTabNavigator, NavigationActions } from 'react-navigation';

import HomeSwiperStackNavigator from './HomeSwiperStackNavigator';
import ExploreSwiperStackNavigator from './ExploreSwiperStackNavigator';
import EditProfileStackNavigator from './EditProfileStackNavigator';

export default MainTabNavigator = createBottomTabNavigator(
  {
    Home: HomeSwiperStackNavigator,
    Explore: ExploreSwiperStackNavigator,
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

