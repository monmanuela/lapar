import React from 'react';
import { Text, View } from 'react-native';
import firebase from 'react-native-firebase';

class ProfileScreen extends React.Component {
  constructor() {
    super()
    this.state = { 
      currentUser: null,
      userData: {
        displayName: '',
        username: '',
        email: '',
        uid: ''
      }
    }
  }

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    
    if (currentUser != null) {
      var db = firebase.database()

      db.ref("users").orderByKey().equalTo(currentUser.uid).once("value").then(function(snapshot) {
        console.log("snapshot: " + JSON.stringify(snapshot))
        var key = currentUser.uid
        var userData = snapshot.val()[key]
        return userData
      }).then(userData => this.setUserData(userData))
    }
  }

  setUserData = userData => {
    this.setState({ userData })
  }

  render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
        <Text>Hi {this.state.userData.displayName} !</Text>
        <Text>Username: {this.state.userData.username}</Text>
        <Text>Email: {this.state.userData.email}</Text>
        <Text>uid: {this.state.userData.uid}</Text>

      </View>
		);
	}
}

export default ProfileScreen
