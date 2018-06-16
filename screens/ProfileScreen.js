import React from 'react';
import { Text, View } from 'react-native';
import firebase from 'react-native-firebase';

export default class ProfileScreen extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    this.setState({ currentUser })  
  }

  render() {
    const currentUser = this.state.currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (currentUser != null) {
      name = currentUser.displayName;
      email = currentUser.email;
      photoUrl = currentUser.photoURL;
      emailVerified = currentUser.emailVerified;
      uid = currentUser.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }

		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
        <Text>Hi {currentUser && name} !</Text>
        <Text>Email: {currentUser && email}</Text>
        <Text>photoUrl: {currentUser && photoUrl}</Text>
        <Text>emailVerified: {currentUser && emailVerified}</Text>
        <Text>uid: {currentUser && uid}</Text>

      </View>
		);
	}
}