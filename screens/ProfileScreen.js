import React from 'react';
import { Text, View } from 'react-native';
import firebase from 'react-native-firebase';

class ProfileScreen extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    this.setState({ currentUser })
  }

  render() {
    var currentUser = this.state.currentUser;

    if (currentUser != null) {
      var db = firebase.database()
      var name, username, email, uid, emailVerified;

      db.ref("users").orderByKey().equalTo(currentUser.uid).on("value", function(snapshot) {
        console.log("snapshot: " + JSON.stringify(snapshot))
        var key = currentUser.uid
        var userData = snapshot.val()[key]
        name = userData.displayName;
        username = userData.username;
        email = userData.email
        uid = userData.uid

        console.log("inside func snapshot")
        console.log("name inside: " + name)
        console.log("username inside: " + username)
        console.log("email inside: " + email)
        console.log("uid inside: " + uid)
        console.log("userData: " + JSON.stringify(userData))
      })

      console.log("name: " + name)
      console.log("username: " + username)
      console.log("email: " + email)
      console.log("uid: " + currentUser.uid)
      console.log("currentUser: " + JSON.stringify(currentUser))

    }

    // WHY CANNOT SHOW THE DETAILS ON RETURN?

		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
        <Text>Hi {name} !</Text>
        <Text>Email: {email}</Text>
        <Text>photoUrl: {photoUrl}</Text>
        <Text>emailVerified: {emailVerified}</Text>
        <Text>uid: {uid}</Text>

      </View>
		);
	}
}

export default ProfileScreen