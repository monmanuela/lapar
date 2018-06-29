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
			modalVisible: false,
		})
	}

	componentDidMount = () => {
		console.log("uid: " + this.props.navigation.state.params.userId)
		console.log("item: " + JSON.stringify(this.props.navigation.state.params.item))
	}

	render() {
		const item = this.props.navigation.state.params.item;

		return (
			<ScrollView>
				<Text>{item.name}</Text>
				<Text>{item.details}</Text>
				<Text>${item.price}</Text>
				<Text>Rating: {item.rating}</Text>
				<Button title='Add Review' onPress={() => this.setState({ modalVisible: true })} />
				<AddReviewModal 
					modalVisible={this.state.modalVisible} 
					onCloseAddReview={this.onCloseAddReview} 
					itemId={item.itemId} 
					userId={this.props.navigation.state.params.userId}
				/>				
				<VerticalReviewsList reviews={item.reviews} />
			</ScrollView>
		);
	}
}