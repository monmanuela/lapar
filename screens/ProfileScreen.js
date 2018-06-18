import React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { Avatar } from 'react-native-elements'
import EditProfileScreen from './EditProfileScreen'

export default class ProfileScreen extends React.Component {
  constructor() {
    super()
    this.state = { 
      currentUser: null,
      userData: {
        displayName: '',
        username: '',
        uid: '',
        bio: '',
      }
    }
  }

  componentDidMount() {
    console.log("in profile did mount")
    // show loading swirling logo
    const currentUser = firebase.auth().currentUser;
    console.log("currentUser: " + JSON.stringify(currentUser))
    
    if (currentUser != null) {
      console.log("in did mount if")
      const db = firebase.database()
      this.setCurrentUser(currentUser)

      db.ref("users").orderByKey().equalTo(currentUser.uid).once("value").then(function(snapshot) {
        console.log("snapshot: " + JSON.stringify(snapshot))
        const key = currentUser.uid
        const userData = snapshot.val()[key]
        return userData
      }).then(userData => {
        console.log("userData: " + JSON.stringify(userData))
        this.setUserData(userData)
      })
    }
  }

  setCurrentUser = currentUser => {
    this.setState({ currentUser })
  }

  setUserData = userData => {
    this.setState({ userData })
  }

  handleEditProfile = () => {
    this.props.navigation.navigate('EditProfile', {currentUser: this.state.currentUser, userData: this.state.userData})
  }

  render() {
    console.log("in render")
		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
        {this.state.currentUser &&
          <View>
            <Avatar
              size="300"
              rounded
              source={{uri: this.state.currentUser.photoURL}}
              onPress={() => alert("View enlarged picture")}
              activeOpacity={0.7}
            />
          </View>
        }

        <Text>{this.state.currentUser && this.state.currentUser.displayName}</Text>
        <Text>Username: @{this.state.userData && this.state.userData.username}</Text>
        <Text>Bio: {this.state.userData && this.state.userData.bio}</Text>
        <Text>Preferences: {this.state.userData && this.state.userData.preferences}</Text>
        <Button title="Edit Profile" onPress={this.handleEditProfile} />
        {/* Bio, Badges, Last Activities/Previous Reviews*/}

      </View>
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
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})

