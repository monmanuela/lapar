import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ItemScreen from '../screens/ItemScreen';
import ExploreScreen from '../screens/ExploreScreen'

export default HomeSwiperStackNavigator = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			header: null
		}
	},
	Item: {
		screen: ItemScreen,
	},
	// Explore: {
	// 	screen: ExploreScreen,
	// 	navigationOptions: {
	// 		header: null
	// 	}
	// }
})