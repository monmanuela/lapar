import React from 'react';
import { ScrollView, Text, Button, View, Image } from 'react-native';
import firebase from 'react-native-firebase';

import AddReviewModal from '../components/AddReviewModal';
import VerticalReviewsList from '../components/VerticalReviewsList';

export default class ItemScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false,
			item: null,
			reviews: {}, // store reviews in state so if user adds review, render is triggered
		}
	}

	onCloseAddReview = () => {
		this.setState({
			modalVisible: false,
		})
	}

	componentDidMount = () => {
		this.setState({reviewIds: this.props.navigation.state.params.item.reviews})
    const db = firebase.database()
		let reviewIds

		db.ref("items/" + this.props.navigation.state.params.item.itemId + "/reviews/").on("child_added", snapshot => {
      console.log("\nGOT ADDED CHILD IN ITEM SCREEN\n")
      // fetch item reviews again, set as state to trigger re render
      db.ref("items/" + this.props.navigation.state.params.item.itemId).once("value").then(snapshot => {
      	console.log("refetched item: " + JSON.stringify(snapshot.val()))
      	this.setState({ item: snapshot.val() })
      	reviewIds = snapshot.val().reviews
      })
      .then(() => {
      	Object.keys(reviewIds).map((reviewId, index) => {
					db.ref("reviews/" + reviewId).once("value")
						.then(snapshot => snapshot.val())
						.then(rev => {
							let newReview = this.state.reviews
							newReview[reviewId] = rev
							this.setState({ reviews: newReview })
						})
				})
      })
      .then(() => console.log("REVIEWS IN ITEM " + JSON.stringify(this.state.reviews)))
    })
	}

	render() {
		const item = this.state.item || this.props.navigation.state.params.item
		const itemTags = item.tags.map((tag, index) => {
			return (
				<Text key={index} style={{ color: 'white', backgroundColor: 'red', marginRight: 5, marginTop: 5, borderRadius: 10, padding: 7 }}>{tag}</Text>
			);
		})

		return (
			<ScrollView style={{ backgroundColor: 'white' }}>
				<View style={{ borderBottomColor: '#d9dce0', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
					<Image source={{ uri: item.photoURL }} style={{ height: 150, width: 400 }} />
					<Text style={{ color: 'black', fontSize: 28, paddingLeft: 20, marginTop: 15 }}>{item.name}</Text>
					<Text style={{ fontSize: 16, paddingLeft: 20 }}>Rating: {item.rating}</Text>
					<Text style={{ fontSize: 16, paddingLeft: 20 }}>Price: ${item.price}</Text>
					
					<View style={{ flexDirection: 'row', paddingLeft: 20 }}>
						{ itemTags }
					</View>
				</View>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Button title='Add Review' color={'red'} onPress={() => this.setState({ modalVisible: true })} />
				</View>
				<AddReviewModal 
					modalVisible={this.state.modalVisible} 
					onCloseAddReview={this.onCloseAddReview} 
					itemId={ item.itemId }
					userId={this.props.navigation.state.params.userId}
				/>

				<VerticalReviewsList reviews={Object.values(this.state.reviews)} />

				<Text>{'\n'}</Text>
			</ScrollView>
		);
	}
}
