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
} from 'react-native';
import { Avatar } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker'
import firebase from 'react-native-firebase';

export default class EditProfileModal extends React.Component {

  onChangePicturePress = () => {
    const options = {
      title: 'Select Avatar',
      // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'},],
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
        // change to uid? or push user data?
        const imageRef = firebase.storage().ref('avatar').child(`${this.props.userID}.jpg`)
        let mime = 'image/jpg'
        imageRef.put(response.uri, {contentType: mime})
          .then(() => {
            return imageRef.getDownloadURL()
          })
          .then(url => {
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
            <Text style={{ backgroundColor: 'red', color: 'white', paddingLeft: 20, paddingTop: 13, paddingBottom: 13, fontSize: 22, fontWeight: 'bold' }}>Edit Profile</Text>
            <View style={{alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
              { this.props.photoURL &&
                <Avatar
                  large
                  rounded
                  source={{uri: this.props.photoURL}}
                  onPress={this.onChangePicturePress}
                  activeOpacity={0.7}
                  title="Change Picture"
                />
              }
              <Text style={{ marginTop: 10 }} onPress={this.onChangePicturePress}>Change Avatar</Text>
            </View>

            <View>
              <Text style={{ marginLeft: 20 }}>Name: </Text>
              <TextInput
                style={styles.textInput}
                placeholder = { this.props.displayName }
                onChangeText = { displayName => this.props.onChangeDisplayName(displayName) }
                value = { this.props.displayName }
              />
            </View>
            {/*
            <View style={{flexDirection: 'row'}}>
              <Text>Username: </Text>
              <TextInput
                style={styles.textInput}
                placeholder = { this.props.username }
                onChangeText = { username => this.props.onChangeUsername(username) }
                value = { this.props.username }
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text>Email: </Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder = { this.props.email }
                onChangeText = { email => this.props.onChangeEmail(email) }
                value = { this.props.email }
              />
            </View>
            */}
            <View>
              <Text style={{ marginLeft: 20, marginTop: 30 }}>Bio: </Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder= {this.props.bio === '' ? "About yourself" : this.props.bio}
                onChangeText={ bio => this.props.onChangeBio(bio)}
                value={this.props.bio}
              />
            </View>
            {/*
            <View style={{flexDirection: 'row'}}>
              <Text>Preferences: </Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder= {this.props.preferences === '' ? "Preferences" : this.props.preferences}
                onChangeText={ pref => this.props.onChangePreferences(pref)}
                value={this.props.preferences}
              />
            </View>
            */}
            <View style={{ marginTop: 40, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Button title='     Save      ' color={'red'} onPress={this.props.handleSaveChanges} />
            </View>
            <View style={{ marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Button title='    Close    ' color={'red'} onPress={this.props.handleClose} />
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
