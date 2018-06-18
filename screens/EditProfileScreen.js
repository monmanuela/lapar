import React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements'
import firebase from 'react-native-firebase';

export default class EditProfileScreen extends React.Component {
  // don't touch the old data passed down from profilescreen
  // initial new data to old data, use as placeholder, change the new data
  // upon submit, check if new data == old data, update accordingly
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

  render() {
    return(
      <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <View>
          {/* how? change photo here */}
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
