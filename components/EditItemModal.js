import React from 'react';
import { 
  Modal, 
  Text, 
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  Keyboard, 
  TouchableWithoutFeedback, 
  ActivityIndicator,
  Image 
} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import firebase from 'react-native-firebase';
import AutoTags from 'react-native-tag-autocomplete'

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;

export default class EditItemModal extends React.Component {
	onChangePicturePress = () => {
    const options = {
      title: 'Select Picture',
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
        console.log("response: " + JSON.stringify(response))
        const imageRef = firebase.storage().ref('items').child(`${this.props.itemId}.jpg`)
        let mime = 'image/jpg'
        imageRef.put(response.uri, {contentType: mime})
          .then(() => {
            return imageRef.getDownloadURL()
          })
          .then(url => {
            console.log("item photo url: " + url)
            this.props.onChangePhotoURL(url)
          })
      }
    })
  }

  render() {
    return(
      <Modal animationType='fade' onRequestClose={() => alert("Edit") } visible={this.props.modalVisible}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <Text style={{ backgroundColor: 'red', color: 'white', paddingLeft: 20, paddingTop: 13, paddingBottom: 13, fontSize: 22, fontWeight: 'bold' }}>Edit Item</Text>
            <View style={{alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
              <Image source={{ uri: this.props.photoURL }} style={{ width: scale(320), height: verticalScale(180) }} />
              <Text style={{ marginTop: 10 }} onPress={this.onChangePicturePress}>Change Picture</Text>
            </View>

            <View>
              <Text style={{ marginLeft: 20, marginTop: 30 }}>Price: </Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder= { this.props.price }
                onChangeText={ price => this.props.onChangePrice(price)}
                value={ this.props.price }
              />
            </View>

            <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Button title='     Save      ' color={'red'} onPress={this.props.handleSaveChanges} />
            </View>
            <View style={{ marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Button title='    Cancel    ' color={'red'} onPress={this.props.handleClose} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginLeft: 20,
    paddingLeft: 0
  }
})