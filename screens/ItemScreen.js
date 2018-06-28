import React from 'react';
import { ScrollView, Text, Button } from 'react-native';

import AddReviewModal from '../components/AddReviewModal';
import VerticalReviewsList from '../components/VerticalReviewsList';

export default class ItemScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false,
			item: null,
			reviews: null, // store reviews in state so if user adds review, render is triggered
		}
	}

	onCloseAddReview = () => {
		this.setState({
			modalVisible: false
		})
	}

	componentDidMount = () => {

	}

	render() {
		const item = this.props.navigation.state.params.item;

		return (
			<ScrollView>
				<Text>{item.name}</Text>
				<Text>{item.details}</Text>
				<Button title='Add Review' onPress={() => this.setState({ modalVisible: true })} />
				<AddReviewModal modalVisible={this.state.modalVisible} onCloseAddReview={this.onCloseAddReview} itemID={ item.id } />				
				<VerticalReviewsList reviews={item.reviews} />
			</ScrollView>
		);
	}
}