import React from 'react';
import { Text, View, Button, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { Avatar, Card } from 'react-native-elements'
import EditProfileModal from '../components/EditProfileModal'
import VerticalReviewsList from '../components/VerticalReviewsList'

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
        preferences: '',
        photoURL: null,
        userID: '',
      },
      modalVisible: false,
      modalDisplayName: '',
      modalUsername: '',
      modalEmail: '',
      modalBio: '',
      modalPreferences: '',
      modalPhotoURL: null,
      isLoading: true,
      reviewIDs: ['r1', 'r3']
    }
  }

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    console.log("currentUser in profile screen: " + currentUser)
    
    if (currentUser != null) {
      const db = firebase.database()
      this.setCurrentUser(currentUser)

      db.ref("users").orderByKey().equalTo(currentUser.uid).once("value").then(function(snapshot) {
        return snapshot.val()[currentUser.uid]
      }).then(userData => {
        this.setUserData(userData)
      }).then(() => this.setState({ isLoading: false }))
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
        photoURL: this.state.currentUser && this.state.currentUser.photoURL,
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
      modalPreferences: this.state.userData && this.state.userData.preferences,
      modalPhotoURL: this.state.userData && this.state.userData.photoURL,
    });
  }

  handleSaveChanges = () => {
    const user = this.state.currentUser
    
    user.updateProfile({
      displayName: this.state.modalDisplayName,
      photoURL: this.state.modalPhotoURL,
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
          preferences: this.state.modalPreferences,
          photoURL: this.state.modalPhotoURL,
        },
        modalVisible: false 
      })
    })
  }

  render() {
    let screen

    if (this.state.isLoading) {
      screen = <ActivityIndicator size="large" color="#0000ff" />
    } else {
  		screen =
      <ScrollView>
        <View style={styles.container}>
          { this.state.userData &&
            <Avatar
              size="300"
              rounded
              source={{uri: this.state.userData.photoURL}}
              onPress={() => alert("View enlarged picture")}
              activeOpacity={0.7}
            /> 
          }
          <Text>{this.state.userData && this.state.userData.displayName}</Text>
          <Text>Username: @{this.state.userData && this.state.userData.username}</Text>
          <Text>userID: {this.state.userData && this.state.userData.userID}</Text>
          <Text>Bio: {this.state.userData && this.state.userData.bio}</Text>
          <Text>Preferences: {this.state.userData && this.state.userData.preferences}</Text>
          <Button title="Edit Profile" onPress={this.handleEditProfile} />

          <VerticalReviewsList reviews={this.state.reviewIDs} /> 

          <EditProfileModal
            modalVisible={this.state.modalVisible} 
            currentUser={this.state.currentUser} 
            displayName={this.state.modalDisplayName}
            userID={this.state.userData.userID}
            username={this.state.modalUsername}
            email={this.state.modalEmail}
            bio={this.state.modalBio}
            preferences={this.state.modalPreferences}
            photoURL={this.state.modalPhotoURL}
            onChangeDisplayName={ modalDisplayName => this.setState({ modalDisplayName }) }
            onChangeEmail={ modalEmail => this.setState({ modalEmail }) }
            onChangeUsername={ modalUsername => this.setState({ modalUsername }) }
            onChangeBio={ modalBio => this.setState({ modalBio }) }
            onChangePreferences={ modalPreferences => this.setState({ modalPreferences }) }
            onChangePhotoURL={ modalPhotoURL => {
                console.log("changing modalPhotoURL")
                this.setState({ modalPhotoURL }) 
                console.log("modalPhotoURL: " + modalPhotoURL)
              }
            }
            handleSaveChanges={this.handleSaveChanges}
            handleClose={ () => this.setState({ modalVisible: false })} 
          />
          </View>
        </ScrollView>
      }

      return (
        <View style={{ flex: 1, alignItems: 'center' }}>{screen}</View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  image: {
    height: 150,
    width: 350
  }
})
