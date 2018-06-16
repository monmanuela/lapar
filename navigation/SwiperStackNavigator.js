import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ItemScreen from '../screens/ItemScreen';

export default SwiperStackNavigator = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			header: null
		}
	},
	Item: {
		screen: ItemScreen,
	}
})