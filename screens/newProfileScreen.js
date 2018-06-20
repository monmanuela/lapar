import React from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { Avatar } from 'react-native-elements'
import EditProfileModal from '../components/EditProfileModal'

export default class newProfileScreen extends React.Component {
  constructor() {
    super()
    this.state = { 
      currentUser: null,
      userData: {
        displayName: '',
        email: '',
        username: '',
        uid: '',
        bio: '',
        preferences: ''
      },
      modalVisible: false,
      modalDisplayName: '',
      modalUsername: '',
      modalEmail: '',
      modalBio: '',
      modalPreferences: ''
    }
  }

  componentDidMount() {
    // show loading swirling logo
    const currentUser = firebase.auth().currentUser;
    
    if (currentUser != null) {
      const db = firebase.database()
      this.setCurrentUser(currentUser)

      db.ref("users").orderByKey().equalTo(currentUser.uid).once("value").then(function(snapshot) {
        return snapshot.val()[currentUser.uid]
      }).then(userData => {
        this.setUserData(userData)
      })
    }
  }

  setCurrentUser = currentUser => {
    this.setState({ currentUser })
  }

  setUserData = userData => {
    this.setState({ 
      userData: {
        displayName: this.state.currentUser && this.state.currentUser.displayName,
        email: this.state.currentUser && this.state.currentUser.email,
        ...userData
      } 
    })
  }

  handleEditProfile = () => {
    this.setState({ 
      modalVisible: true,
      modalDisplayName: this.state.userData && this.state.userData.displayName,
      modalEmail: this.state.userData && this.state.userData.email,
      modalUsername: this.state.userData && this.state.userData.username,
      modalBio: this.state.userData && this.state.userData.bio,
      modalPreferences: this.state.userData && this.state.userData.preferences
    });
  }

  handleSaveChanges = () => {
    const user = this.state.currentUser
    
    user.updateProfile({
      displayName: this.state.modalDisplayName,
    })
    .then(() => {
      user.updateEmail(this.state.modalEmail)

      const db = firebase.database()
      db.ref("users/" + user.uid).update({
        username: this.state.modalUsername,
        bio: this.state.modalBio,
        preferences: this.state.modalPreferences,
      })
    })
    .then(() => {
      this.setState({
        userData: {
          displayName: this.state.modalDisplayName,
          email: this.state.modalEmail,
          username: this.state.modalUsername,
          bio: this.state.modalBio,
          preferences: this.state.modalPreferences
        },
        modalVisible: false 
      })
    })
  }

  render() {
		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
        <View>
          { this.state.currentUser &&
            <Avatar
              size="300"
              rounded
              source={{uri: this.state.currentUser.photoURL}}
              onPress={() => alert("View enlarged picture")}
              activeOpacity={0.7}
            /> 
          }
        </View>
        <Text>{this.state.userData && this.state.userData.displayName}</Text>
        <Text>Username: @{this.state.userData && this.state.userData.username}</Text>
        <Text>Bio: {this.state.userData && this.state.userData.bio}</Text>
        <Text>Preferences: {this.state.userData && this.state.userData.preferences}</Text>
        <Button title="Edit Profile" onPress={this.handleEditProfile} />
        {/* Bio, Badges, Last Activities/Previous Reviews*/}
        <EditProfileModal
          modalVisible={this.state.modalVisible} 
          currentUser={this.state.currentUser} 
          displayName={this.state.modalDisplayName}
          username={this.state.modalUsername}
          email={this.state.modalEmail}
          bio={this.state.modalBio}
          preferences={this.state.modalPreferences}
          onChangeDisplayName={ modalDisplayName => this.setState({ modalDisplayName }) }
          onChangeEmail={ modalEmail => this.setState({ modalEmail }) }
          onChangeUsername={ modalUsername => this.setState({ modalUsername }) }
          onChangeBio={ modalBio => this.setState({ modalBio }) }
          onChangePreferences={ modalPreferences => this.setState({ modalPreferences }) }
          handleSaveChanges={this.handleSaveChanges}
          handleClose={ () => this.setState({ modalVisible: false })} 
        />
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
