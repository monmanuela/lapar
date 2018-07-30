import React from 'react';
import { ScrollView, Text, Button, View, Image } from 'react-native';
import firebase from 'react-native-firebase';

import EditItemModal from '../components/EditItemModal';
import VerticalReviewsList from '../components/VerticalReviewsList';

export default class StallOwnerItemScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			photoURL: null,
			price: null,
			reviews: {},
			modalPhotoURL: null,
			modalPrice: '',
			modalVisible: false,
		}
	}

  componentDidMount = () => {
    const db = firebase.database()
    let reviewIds = this.props.navigation.state.params.item.reviews || []
    console.log("TEST " + JSON.stringify(this.props.navigation.state.params.item))

    Object.keys(reviewIds).map((reviewId, index) => {
      db.ref("reviews/" + reviewId).once("value")
        .then(snapshot => snapshot.val())
        .then(rev => {
          let newReview = this.state.reviews
          newReview[reviewId] = rev
          this.setState({ reviews: newReview })
        })
    })

    const item = this.props.navigation.state.params.item
    this.setState({
    	photoURL: item.photoURL,
    	price: item.price,
    })
  }

  handleEditItem = () => {
  	this.setState({
  		modalPhotoURL: this.state.photoURL,
  		modalPrice: this.state.price.toString(),
  		modalVisible: true
  	})
  }

  onChangePrice = price => {
  	this.setState({ modalPrice: price })
  }

  onChangePhotoURL = url => {
  	this.setState({ modalPhotoURL: url })
  }

	handleSaveChanges = () => {
		this.setState({
			photoURL: this.state.modalPhotoURL,
			// name: this.state.modalName,
			price: this.state.modalPrice,
			// tags: this.state.modalTags,
			modalVisible: false
		})
		// link to firebase
    const item = this.props.navigation.state.params.item

    const db = firebase.database()
    db.ref("items/" + item.itemId).update({
      price: parseFloat(this.state.modalPrice),
      photoURL: this.state.modalPhotoURL
    })
	}

	handleClose = () => {
		this.setState({
			modalPhotoURL: null,
			modalPrice: '',
			modalVisible: false,
		})
	}

	render() {
		const item = this.props.navigation.state.params.item
		const itemTags = item.tags ? item.tags.map((tag, index) => {
			return (
				<Text key={index} style={{ color: 'white', backgroundColor: 'red', marginRight: 5, marginTop: 5, borderRadius: 10, padding: 7 }}>{tag}</Text>
			);
		}) : null;

		return (
			<ScrollView style={{ backgroundColor: 'white' }}>
				<View style={{ borderBottomColor: '#d9dce0', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
					<Image source={{ uri: this.state.photoURL }} style={{ height: 150, width: 400 }} />
					<Text style={{ color: 'black', fontSize: 28, paddingLeft: 20, marginTop: 15 }}>{item.name}</Text>
					<Text style={{ fontSize: 16, paddingLeft: 20 }}>Rating: {item.rating}</Text>
					<Text style={{ fontSize: 16, paddingLeft: 20 }}>Price: ${this.state.price}</Text>
					
					<View style={{ flexDirection: 'row', paddingLeft: 20 }}>
						{itemTags}
					</View>

					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Button title='Edit Item' color={'red'} onPress={this.handleEditItem} />
					</View>
				</View>

				<EditItemModal 
					modalVisible={this.state.modalVisible}
					photoURL={this.state.modalPhotoURL}
					price={this.state.modalPrice}
					onChangePrice={this.onChangePrice}
          onChangePhotoURL={ this.onChangePhotoURL }
					handleSaveChanges={this.handleSaveChanges} 
					handleClose={this.handleClose}
				/>

				<VerticalReviewsList reviews={Object.values(this.state.reviews)} />

				<Text>{'\n'}</Text>
			</ScrollView>
		);
	}
}