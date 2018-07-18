import React from 'react';
import { View, Text } from 'react-native';

export default class EditItemScreen extends React.Component {
	render() {
		return (
			<View>
				<Text>{this.props.navigation.state.params.item}</Text>
			</View>
		);
	}
}