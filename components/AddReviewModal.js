import React from 'react';
import { Modal, View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import { AirbnbRating } from 'react-native-ratings';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import { Dimensions } from 'react-native';
import {connect} from 'react-redux'
import store from '../redux/store'

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;

class AddReviewModal extends React.Component {
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
      userId: this.props.currentUser.uid,
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

      const db = firebase.database()
      var review = {}
      review[newPostRefKey] = true
      db.ref("users/" + this.props.currentUser.uid + "/reviews").update(review)
      db.ref("items/" + this.props.itemId + "/reviews").update(review)
    })
    .then(() => {
			this.setState({ review: '', rating: null, photoURL: null });
      this.props.onCloseAddReview();
    })
    .catch(error => console.log(error))
	}

	render() {
    console.log("current state store in render: \n" + JSON.stringify(store.getState()))

		return (
			<Modal animationType='fade' onRequestClose={() => alert("Add") } visible={this.props.modalVisible}>
				<View style={{ backgroundColor: 'white' }}>
					<Text style={{ color: 'black', fontSize: 20, marginLeft: 20, marginTop: 30 }}>Rating</Text>
					<AirbnbRating
					  count={5}
					  reviews={[]}
					  defaultRating={0}
					  imageSize={30}
					  onFinishRating={rating => this.handleRating(rating)}
            style={{ marginBottom: 20 }}
					/>

          <Text style={{ color: 'black', fontSize: 20, marginLeft: 20, marginTop: 30 }}>Review</Text>
					
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button
              title="ADD PICTURE"
              onPress= { this.onChangePicturePress }
              textStyle={{ fontWeight: 'bold', fontSize: 14 }}
              buttonStyle={{ backgroundColor: 'red', width: scale(100), borderRadius: 2, marginTop: 10, marginBottom: 10, padding: 5 }}
            />

            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: this.state.photoURL}}
            />

            <TextInput
              multiline={true} 
  						style={{ textAlignVertical: 'top', height: 150, width: '90%', borderColor: 'gray', borderWidth: 1, paddingLeft: 8, paddingRight: 8 }} 
  						onChangeText={this.handleReview} 
  						value={this.state.review}
  					/>

  					<Button 
              title='SUBMIT' 
              textStyle={{ fontWeight: 'bold', fontSize: 14 }} 
              buttonStyle={{ backgroundColor: 'red', width: scale(70), borderRadius: 2, marginTop: 20, padding: 5 }} 
              onPress={this.handleSubmitReview} />

  					<Button 
              title='CLOSE' 
              textStyle={{ fontWeight: 'bold', fontSize: 14 }} 
              buttonStyle={{ backgroundColor: 'red', width: scale(70), borderRadius: 2, marginTop: 20, padding: 5 }} 
              onPress={this.handleClose} />
          </View>
				</View>
			</Modal>
		);
	}
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps, null)(AddReviewModal)

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 350
  }
})