import React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import firebase from 'react-native-firebase';

export default class EditProfileScreen extends React.Component {
  constructor() {
    super()
    this.state = { 
      currentUser: null,
      userData: {
        displayName: '',
        username: '',
        email: '',
        uid: '',
        bio: '',
      }
    }
  }

  componentDidMount() {
    this.setInitialState()
  }

  setInitialState = () => {
    this.setState({
      userData: {
        displayName: this.props.navigation.state.params.userData.displayName,
        username: this.props.navigation.state.params.userData.username,
        email: this.props.navigation.state.params.userData.email,
        uid: this.props.navigation.state.params.userData.uid,
        bio: this.props.navigation.state.params.userData.bio,
      }
    })
  }

  handleSaveChanges = () => {
    
    // make firebase call to update
    // navigate back to profile screen
  }

  onChangeDisplayName = displayName => {
    this.setState({ 
      userData: {
        displayName: displayName,
        username: this.state.userData.username,
        email: this.state.userData.email,
        uid: this.state.userData.uid,
        bio: this.state.userData.bio,
      }
    })
  }

  onChangeEmail = email => {
    this.setState({ 
      userData: {
        displayName: this.state.userData.displayName,
        username: this.state.userData.username,
        email: email,
        uid: this.state.userData.uid,
        bio: this.state.userData.bio
      }
    })
  }

  onChangeBio = bio => {
    this.setState({ 
      userData: {
        displayName: this.state.userData.displayName,
        username: this.state.userData.username,
        email: this.state.userData.email,
        uid: this.state.userData.uid,
        bio: bio
      }
    })
  }

  // onCancelChanges = () => {
  //   // display alert: Your unsaved changes will be lost.
  //   // cancel => return
  //   // ok => return to old state
  // }

  render() {
    return(
      <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <View>
          <Text>Edit Profile</Text>
          {/* change photo here */}

          <View style={{flexDirection: 'row'}}>
            <Text>Name: </Text>
            <TextInput
              style={styles.textInput}
              placeholder = { this.state.userData.displayName }
              onChangeText = { displayName => this.onChangeDisplayName(displayName) }
              value = { this.state.userData.displayName }
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text>Email: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder = { this.state.userData.email }
              onChangeText = { email => this.onChangeEmail(email) }
              value = { this.state.userData.email }
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text>Bio: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Bio"
              onChangeText={ bio => this.onChangeBio(bio)}
              value={this.state.userData.bio}
            />
          </View>

          <Button title="Save Changes" onPress={this.handleSaveChanges} />
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
