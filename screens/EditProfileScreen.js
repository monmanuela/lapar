import React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback, ScrollView, Image } from 'react-native';
import { Avatar } from 'react-native-elements'
import firebase from 'react-native-firebase';
// var ImagePicker = require('react-native-image-picker');
import ImagePicker from 'react-native-image-picker'

export default class EditProfileScreen extends React.Component {
  constructor() {
    super()
    this.state = { 
      currentUser: null,
      userData: {
        username: '',
        uid: '',
        bio: '',
        preferences: '',
      },
      newDisplayName: '',
      newUsername: '',
      newEmail: '',
      newBio: '',
      newPreferences: '',
      photoSrc: null,
    }
  }

  componentDidMount() {
    this.setInitialState()
    this.props.navigation.setParams({ handleSaveChanges: this.handleSaveChanges });
  }

  setInitialState = () => {
    this.setState({
      userData: this.props.navigation.state.params.userData,
      currentUser: this.props.navigation.state.params.currentUser,
      newDisplayName: this.props.navigation.state.params.currentUser.displayName,
      newUsername: this.props.navigation.state.params.userData.username,
      newEmail: this.props.navigation.state.params.currentUser.email,
      newBio: this.props.navigation.state.params.userData.bio,
      newPreferences: this.props.navigation.state.params.userData.preferences,
    })
  }

  handleSaveChanges = () => {
    console.log("in handle save changes")
    const user = this.state.currentUser
    
    user.updateProfile({
      displayName: this.state.newDisplayName,
    })
    .then(() => {
      user.updateEmail(this.state.newEmail)

      const db = firebase.database()
      db.ref("users/" + user.uid).update({
        bio: this.state.newBio,
        preferences: this.state.newPreferences,
        username: this.state.newUsername
      })
    })
    .then(() => {
      console.log("navigating back to profile")
      // how to call componentDidMount for Profile again so it re render?
      this.props.navigation.navigate('Profile')
    })
  }

  onChangeDisplayName = displayName => {
    this.setState({ newDisplayName: displayName })
  }

  onChangeUsername = username => {
    this.setState({ newUsername: username })
  }

  onChangeEmail = email => {
    this.setState({ newEmail: email })
  }

  onChangeBio = bio => {
    this.setState({ newBio: bio })
  }

  onChangePreferences = pref => {
    this.setState({ newPreferences: pref })
  }

  onChangePicturePress = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'},],
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
        const src = { uri: response.uri }
        console.log('src: ' + JSON.stringify(src))
        this.setState({ photoSrc: src})
        console.log('photoSrc: ' + JSON.stringify(this.state.photoSrc))
      }
    })
  }

  render() {
    return(
      <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <View>
          <View style={{alignItems: 'center'}}>
            <Avatar
              size="300"
              rounded
              source={this.state.currentUser && {uri: this.state.currentUser.photoURL}}
              onPress={() => console.log("Change picture?")}
              activeOpacity={0.7}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text>Name: </Text>
            <TextInput
              style={styles.textInput}
              placeholder = { this.state.newDisplayName }
              onChangeText = { displayName => this.onChangeDisplayName(displayName) }
              value = { this.state.newDisplayName }
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text>Username: </Text>
            <TextInput
              style={styles.textInput}
              placeholder = { this.state.newUsername }
              onChangeText = { username => this.onChangeUsername(username) }
              value = { this.state.newUsername }
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text>Email: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder = { this.state.newEmail }
              onChangeText = { email => this.onChangeEmail(email) }
              value = { this.state.newEmail }
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text>Bio: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder= {this.state.newBio === '' ? "About yourself" : this.state.newBio}
              onChangeText={ bio => this.onChangeBio(bio)}
              value={this.state.newBio}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text>Preferences: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder= {this.state.newPreferences === '' ? "Preferences" : this.state.newPreferences}
              onChangeText={ pref => this.onChangePreferences(pref)}
              value={this.state.newPreferences}
            />
          </View>

          <Button title="Change Picture" onPress={this.onChangePicturePress} />
          <Image source={ this.state.photoSrc } />
        </View>
      </TouchableWithoutFeedback>
    )
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
    width: '70%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
