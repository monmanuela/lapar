import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ExploreScreen from '../screens/ExploreScreen';
import ItemScreen from '../screens/ItemScreen';

export default ExploreSwiperStackNavigator = createStackNavigator({
	Explore: {
		screen: ExploreScreen,
		navigationOptions: {
			header: null
		}
	},
	Item: {
		screen: ItemScreen,
	}
})