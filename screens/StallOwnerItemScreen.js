import React from 'react';
import { ScrollView, Text, Button, View, Image } from 'react-native';
import firebase from 'react-native-firebase';

import EditItemModal from '../components/EditItemModal';
import VerticalReviewsList from '../components/VerticalReviewsList';

export default class StallOwnerItemScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false,
      reviews: {}
		}
	}

  componentDidMount = () => {
    const db = firebase.database()
    let reviewIds = this.props.navigation.state.params.item.reviews || []
    console.log("TEST " + JSON.stringify(this.props.navigation.state.params.item))

    // db.ref("items/" + this.props.navigation.state.params.item.itemId).once("value").then(snapshot => {
    //   reviewIds = snapshot.val().reviews
    //   console.log("HELP " + JSON.stringify(reviewIds))
    // })
    // .then(() => {
      Object.keys(reviewIds).map((reviewId, index) => {
        db.ref("reviews/" + reviewId).once("value")
          .then(snapshot => snapshot.val())
          .then(rev => {
            let newReview = this.state.reviews
            newReview[reviewId] = rev
            this.setState({ reviews: newReview })
          })
      })
    // })
    // .then(() => console.log("REVIEWS IN ITEM " + JSON.stringify(this.state.reviews)))
  }

	handleSaveChanges = () => {
		this.setState({
			modalVisible: true
		})
	}

	handleClose = () => {
		this.setState({
			modalVisible: false,
		})
	}

	render() {
		const item = this.props.navigation.state.params.item
		// const itemTags = item.tags.map((tag, index) => {
		// 	return (
		// 		<Text key={index} style={{ color: 'white', backgroundColor: 'red', marginRight: 5, marginTop: 5, borderRadius: 10, padding: 7 }}>{tag}</Text>
		// 	);
		// })

		return (
			<ScrollView style={{ backgroundColor: 'white' }}>
				<View style={{ borderBottomColor: '#d9dce0', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
					<Image source={{ uri: item.photoURL }} style={{ height: 150, width: 400 }} />
					<Text style={{ color: 'black', fontSize: 28, paddingLeft: 20, marginTop: 15 }}>{item.name}</Text>
					<Text style={{ fontSize: 16, paddingLeft: 20 }}>Rating: {item.rating}</Text>
					<Text style={{ fontSize: 16, paddingLeft: 20 }}>Price: ${item.price}</Text>
					
					<View style={{ flexDirection: 'row', paddingLeft: 20 }}>
						{/*itemTags*/}
					</View>

					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Button title='Edit Item' color={'red'} onPress={() => this.setState({ modalVisible: true })} />
					</View>
				</View>

				<EditItemModal 
					modalVisible={this.state.modalVisible}
          item={item}
					handleSaveChanges={this.handleSaveChanges} 
					handleClose={this.handleClose} 
				/>

				<VerticalReviewsList reviews={Object.values(this.state.reviews)} />

				<Text>{'\n'}</Text>
			</ScrollView>
		);
	}
}