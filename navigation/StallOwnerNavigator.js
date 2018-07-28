import React from 'react';
import { createStackNavigator } from 'react-navigation';

import StallOwnerScreen from '../screens/StallOwnerScreen';
import StallOwnerItemScreen from '../screens/StallOwnerItemScreen';

export default StallOwnerNavigator = createStackNavigator({
	StallHome: {
		screen: StallOwnerScreen,
		navigationOptions: {
			header: null
		}
	},
	EditItem: {
		screen: StallOwnerItemScreen,
	},
});