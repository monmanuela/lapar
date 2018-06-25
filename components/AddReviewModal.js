import React from 'react';
import { Modal, Button, View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';

export default class addReviewModal extends React.Component {
	constructor() {
		super();
		this.state = {
			review: '',
			rating: 0,
			photoURL: null,
		}
	}

	onChangePicturePress = () => {
    const options = {
      title: 'Add Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, response => {
      console.log('response: ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        this.setState({photoURL: response.uri})
      }
    })
  }

	handleReview = review => {
		this.setState({ review });
	}

	handleRating = rating => {
		this.setState({ rating })
	}

	handleClose = () => {
		this.setState({ review: '', rating: 0, photoURL: null });
		this.props.onCloseAddReview();
	}

	handleSubmitReview = async () => {
		console.log("rating: " + this.state.rating + ", review: " + this.state.review)
		let reviewID
    const db = firebase.database()
    await db
    .ref('id/').orderByKey().equalTo("lastReviewID").once('value').then(function(snapshot) {
      reviewID = snapshot.val().lastReviewID + 1
    })
    .then(() => {
      db
      .ref('reviews/' + 'r' + reviewID).set({
        rating: this.state.rating,
        userID: 'u1', // how?? get current user here??
        itemID: this.props.itemID,
        time: [25, 17, 20, 6, 2018], // how??
        content: this.state.review,
        photoURL: this.state.photoURL,
      })
      .then(() => {
        db.ref('id/').update({
          lastReviewID: reviewID
        })
      })
      .then(() => {
				this.setState({ review: '', rating: 0, photoURL: null });
				this.props.onCloseAddReview();
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    })
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
					  onFinishRating={rating => this.handleRating(rating)}
					  style={{ paddingVertical: 10 }}
					/>
					<Text>{'\n'}</Text>
					<Button
						title="Add Food Picture"
						onPress= { this.onChangePicturePress }
					/>
					<Text>{'\n'}</Text>
					<Image
            style={styles.image}
            resizeMode="cover"
            source={{uri: this.state.photoURL}}
          />
					<Text>{'\n'}</Text>
					<TextInput 
						style={{height: 40, borderColor: 'gray', borderWidth: 1}} 
						onChangeText={this.handleReview} 
						value={this.state.review}
					/>
					<Text>{'\n'}</Text>
					<Button title='Submit Review' onPress={this.handleSubmitReview} />
					<Button title='Close' onPress={this.handleClose} />
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 350
  }
})