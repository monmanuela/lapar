import React from 'react';
import { Modal, View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker'

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;

export default class AddNewItemModal extends React.Component {
	constructor() {
		super()
		this.state = {
      location: '',
      name: '',
			photoURL: null,
      price: 0,
      tags: []
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

  onAddItemName = name => {
    this.setState({ name })
  }

  onAddItemPrice = price => {
    this.setState({ price })
  }

  handleClose = () => {
    console.log("HANDLE CLOSE")
    this.setState({
      location: '',
      name: '', 
      photoURL: null,
      price: 0,
      tags: []
    })
    this.props.handleClose()
  }

  handleSaveNewItem = async () => {
    console.log("in handle save new item " + this.props.stallId)
    let itemID
    const db = firebase.database()
    const newItemRef = db.ref('items/').push()
    const newItemRefKey = newItemRef.key
    newItemRef.update({
      itemId: newItemRefKey,
      name: this.state.name,
      photoURL: this.state.photoURL,
      price: this.state.price,
      rating: 0,
      reviews: {},
      stallId: this.props.stallId,
      tags: this.state.tags
    })
    .then(() => {
      // upload photo
      if (this.state.photoURL) {
        const imageRef = firebase.storage().ref('reviewPhotos').child(`${newItemRef.key}.jpg`)
        let mime = 'image/jpg'
        imageRef
          .put(this.state.photoURL, {contentType: mime})
          .then(() => {
            return imageRef.getDownloadURL()
          })
          .then(url => {
            db.ref('items/' + newItemRefKey).update({
              photoURL: url,
            })
          })
      }
    })
    .then(() => {
      const db = firebase.database()
      var item = {}
      item[newItemRefKey] = true
      db.ref("stalls/" + this.props.stallId + "/items").update(item)
    })
    .then(() => {
      this.handleClose();
    })
    .catch(error => console.log(error))
  }

	render() {
		return (
			<Modal animationType='fade' onRequestClose={() => alert("Add") } visible={this.props.modalVisible}>
				<View style={{ backgroundColor: 'white' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
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

            <Text style={{ marginLeft: 20, marginTop: 30 }}>Name: </Text>
            <TextInput
  						style={{ height: 50, width: '90%', borderBottomColor: 'gray', borderBottomWidth: 1, paddingLeft: 8, paddingRight: 8 }} 
  						onChangeText={name => this.onAddItemName(name)} 
  					/>

            <Text style={{ marginLeft: 20, marginTop: 30 }}>Price: </Text>
            <TextInput
              style={{ height: 50, width: '90%', borderBottomColor: 'gray', borderBottomWidth: 1, paddingLeft: 8, paddingRight: 8 }} 
              onChangeText={price => this.onAddItemPrice(price)} 
            />

  					<Button 
              title='SUBMIT' 
              textStyle={{ fontWeight: 'bold', fontSize: 14 }} 
              buttonStyle={{ backgroundColor: 'red', width: scale(70), borderRadius: 2, marginTop: 20, padding: 5 }} 
              onPress={this.handleSaveNewItem} />

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

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 350
  }
})