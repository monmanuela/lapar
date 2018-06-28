import React from 'react';
import { createBottomTabNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'

import HomeSwiperStackNavigator from './HomeSwiperStackNavigator';
import ExploreSwiperStackNavigator from './ExploreSwiperStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';

export default MainTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeSwiperStackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name='ios-pizza' size={30} color={tintColor} />
        )
      },
    },
    Explore: {
      screen: ExploreSwiperStackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name='ios-search' size={30} color={tintColor} />
        )
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name='md-person' size={30} color={tintColor} />
        )
      },
    }
  },
  {
    tabBarOptions: {
    	showLabel: false,
      activeTintColor: 'red',
      style: {
        backgroundColor: 'white'
      }
    },
    swipeEnabled: false
  }
);
