import React from 'react';
import { Modal, Button, View, Text, TextInput } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

export default class addReviewModal extends React.Component {
	constructor() {
		super();
		this.state = {
			review: ''
		}
	}

	handleReview = review => {
		this.setState({ review });
	}

	handleClose = () => {
		this.setState({ review: '' });
		this.props.onCloseAddReview();
	}

	render() {
		return (
			<Modal animationType='fade' onRequestClose={() => alert("Add") } visible={this.props.modalVisible}>
				<View>
					<Text>Rating</Text>
					<AirbnbRating
					  count={5}
					  reviews={[]}
					  defaultRating={0}
					  imageSize={40}
					  onFinishRating={rating => {console.log("Rating is: " + rating)} }
					  style={{ paddingVertical: 10 }}
					/>
					<Text>{'\n'}</Text>
					<TextInput 
						style={{height: 40, borderColor: 'gray', borderWidth: 1}} 
						onChangeText={this.handleReview} 
						value={this.state.review}
					/>
					<Text>{'\n'}</Text>
					<Button title='Close' onPress={this.handleClose} />
				</View>
			</Modal>
		);
	}
}