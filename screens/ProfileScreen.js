import React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image } from 'react-native';
import firebase from 'react-native-firebase';
import EditProfileScreen from './EditProfileScreen'

export default class ProfileScreen extends React.Component {
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
    // show loading swirling logo
    const currentUser = firebase.auth().currentUser;
    console.log("currentUser: " + JSON.stringify(currentUser))
    
    if (currentUser != null) {
      var db = firebase.database()
      this.setCurrentUser(currentUser)

      db.ref("users").orderByKey().equalTo(currentUser.uid).once("value").then(function(snapshot) {
        console.log("snapshot: " + JSON.stringify(snapshot))
        var key = currentUser.uid
        var userData = snapshot.val()[key]
        return userData
      }).then(userData => {
        console.log("userData: " + JSON.stringify(userData))
        this.setUserData(userData) })
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
		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
        {this.state.currentUser &&
          <Image
            style={{width: 150, height: 150}}
            source={{uri: this.state.currentUser.photoURL}}
          />
        }

        <Text>{this.state.currentUser && this.state.currentUser.displayName}</Text>
        <Text>Bio Here</Text>
        <Text>{this.state.userData && this.state.userData.bio}</Text>
        <Button title="Edit Profile" onPress={this.handleEditProfile} />
        {/* Bio, Badges, Last Activities/Previous Reviews*/}
        {/* Store preferences in userData */}

        {/*<Text>Username: {this.state.userData.username}</Text>*/}
        {/*<Text>Email: {this.state.userData.email}</Text>*/}
        {/*<Text>uid: {this.state.userData.uid}</Text>*/}

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

