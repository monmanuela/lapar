import React from 'react';
import { View, Text } from 'react-native';

export default class ItemScreen extends React.Component {
	render() {
		const item = this.props.navigation.state.params.item;

		return (
			<View>
				<Text>{ item.name }</Text>
			</View>
		);
	}
}