import React from 'react';
import { ScrollView, Text, Button, View, Image } from 'react-native';

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

	render() {
		const item = this.props.navigation.state.params.item;
		const itemTags = item.tags.map((tag, index) => {
			return (
				<Text key={index} style={{ color: 'white', backgroundColor: 'red', marginRight: 5, marginTop: 5, borderRadius: 10, padding: 7 }}>{tag}</Text>
			);
		})

		return (
			<ScrollView style={{ backgroundColor: 'white' }}>
				<View style={{ borderBottomColor: '#d9dce0', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 20, marginBottom: 10 }}>
					<Image source={{ uri: item.photoURL }} style={{ height: 100, width: 320 }} />
					<Text style={{ color: 'black', fontSize: 28 }}>{item.name}</Text>
					<Text style={{ fontSize: 16 }}>Rating: {item.rating}</Text>
					<Text style={{ fontSize: 16 }}>Price: {item.price}</Text>
					
					<View style={{ flexDirection: 'row' }}>
						{ itemTags }
					</View>
				</View>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Button title='Add Review' color={'red'} onPress={() => this.setState({ modalVisible: true })} />
				</View>
				<AddReviewModal modalVisible={this.state.modalVisible} onCloseAddReview={this.onCloseAddReview} itemId={ item.id } />				
				<VerticalReviewsList reviews={item.reviews} />
			</ScrollView>
		);
	}
}
