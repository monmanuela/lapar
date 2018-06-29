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
    console.log("itemId: " + this.props.itemId)
    // need to fetch userId, itemId
    // and add this reviewId to items/reviews
		let reviewID
    const db = firebase.database()
    const newPostRef = db.ref('reviews/').push()
    const newPostRefKey = newPostRef.key
    newPostRef.update({
      reviewId: newPostRefKey,
      rating: this.state.rating,
      userId: this.props.userId,
      itemId: this.props.itemId,
      time: new Date().toLocaleString(),
      content: this.state.review,
      photoURL: this.state.photoURL,
    })
    .then(() => {
      // upload photo
      if (this.state.photoURL) {
        console.log("wanna upload photo")
        const imageRef = firebase.storage().ref('reviewPhotos').child(`${newPostRef.key}.jpg`)
        let mime = 'image/jpg'
        imageRef
          .put(this.state.photoURL, {contentType: mime})
          .then(() => {
            return imageRef.getDownloadURL()
          })
          .then(url => {
            db.ref('reviews/' + newPostRefKey).update({
              photoURL: url,
            })
          })
      }
    })
    .then(() => {
      console.log("wanna store in user")
      // store the review in the user, and in the item
      const db = firebase.database()
      var review = {}
      review[newPostRefKey] = true
      db.ref("users/" + this.props.userId + "/reviews").update(review)
      db.ref("items/" + this.props.itemId + "/reviews").update(review)
    })
    .then(() => {
			this.setState({ review: '', rating: null, photoURL: null });
      this.props.onCloseAddReview();
    })
    .catch(error => console.log(error))
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
						title="Add Item Picture"
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