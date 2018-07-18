import React from 'react';
import { createStackNavigator } from 'react-navigation';

import StallOwnerScreen from '../screens/StallOwnerScreen';
import EditItemScreen from '../screens/EditItemScreen';

export default StallOwnerNavigator = createStackNavigator({
	Home: {
		screen: StallOwnerScreen,
		navigationOptions: {
			header: null
		}
	},
	EditItem: {
		screen: EditItemScreen,
	},
});