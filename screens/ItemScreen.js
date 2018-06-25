import React from 'react';
import { View, Text, Button } from 'react-native';

import AddReviewModal from '../components/AddReviewModal';

export default class ItemScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false
		}
	}

	onCloseAddReview = () => {
		this.setState({
			modalVisible: false
		})
	}

	render() {
		const item = this.props.navigation.state.params.item;

		return (
			<View>
				<Text>{ item.name }</Text>
				<Button title='Add Review' onPress={() => this.setState({ modalVisible: true })} />
				<AddReviewModal modalVisible={this.state.modalVisible} onCloseAddReview={this.onCloseAddReview} itemID={ item.id } />
			</View>
		);
	}
}