import React from 'react';
import { Text, View, Button, StyleSheet, Image, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import { Avatar, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Octicons'
import EditProfileModal from '../components/EditProfileModal'
import VerticalReviewsList from '../components/VerticalReviewsList'
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;

export default class ProfileScreen extends React.Component {
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
      reviewIds: [],
    }
  }

  componentDidMount = () => {
    console.log("in profilescreen didmount")
    const currentUser = firebase.auth().currentUser;
    const db = firebase.database()
    
    if (currentUser != null) {
      this.setCurrentUser(currentUser)

      db.ref("users").orderByKey().equalTo(currentUser.uid).once("value").then(snapshot => {
        return snapshot.val()[currentUser.uid]
      }).then(userData => {
        this.setUserData(userData)
      }).then(() => this.setState({ isLoading: false }))

      // fetch reviews
      db.ref("users/" + currentUser.uid).orderByKey().equalTo("reviews").once("value").then(snapshot => {
        if (snapshot.val() !== null) {
          console.log("reviews: " + JSON.stringify(snapshot.val().reviews))
          this.setState({ reviewIds: snapshot.val().reviews })
        }
      })

      // add listener for added review
      db.ref("users/" + currentUser.uid + "/reviews/").on("child_added", snapshot => {
        console.log("\nGOT ADDED CHILD IN PROFILE SCREEN\n")
        // fetch user reviewIds again, set as state to trigger re render
        db.ref("users/" + currentUser.uid).orderByKey().equalTo("reviews").once("value").then(snapshot => {
          console.log("re fetched reviews: " + JSON.stringify(snapshot.val().reviews))
          this.setState({ reviewIds: snapshot.val().reviews })
        })
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

  handleSignOut = () => {
    firebase.auth().signOut()
    this.props.navigation.navigate('Login') 
  }

  changePassword = (email, oldPassword, newPassword) => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(email, oldPassword)

    user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
      firebase.auth().currentUser.updatePassword(newPassword).then(() => {
        "successfully changed pw"
      }).catch(e => console.log(e))
    }).catch(e => console.log(e))
  }

  render() {
    console.log("in profile " + JSON.stringify(this.state.reviewIds))
    let screen
    if (this.state.isLoading || this.state.reviewIds.length === 0) {

    // if (this.state.isLoading) {
      screen = <ActivityIndicator size="large" color="#0000ff" />
    } else {
  		screen =
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ width: scale(310), backgroundColor: 'red', color: 'white', paddingLeft: scale(20), paddingTop: scale(13), paddingBottom: scale(13), fontSize: 22, fontWeight: 'bold' }}>Profile</Text>
          <Icon onPress={this.handleSignOut} name='sign-out' size={scale(25)} color={'white'} style={{ backgroundColor: 'red', paddingLeft: scale(10), paddingTop: scale(15), paddingRight: scale(5) }} />
        </View>
        <View style={styles.container}>
          { this.state.userData &&
            <Avatar
              large
              rounded
              source={{uri: this.state.userData.photoURL}}
              onPress={() => alert("View enlarged picture")}
              activeOpacity={0.7}
            /> 
          }
          <Text style={{ fontSize: 20, color: 'black' }}>{this.state.userData && this.state.userData.displayName}</Text>
          <Text style={{ color: 'gray', marginBottom: 10, marginLeft: 20, marginRight: 20 }}>{this.state.userData && this.state.userData.bio}</Text>
          <Button title='Edit Profile' color={'red'} onPress={this.handleEditProfile} />
        </View>
        
        <VerticalReviewsList reviews={this.state.reviewIds} /> 

        <Text>{'\n'}</Text>

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
          onChangePhotoURL={ modalPhotoURL => this.setState({ modalPhotoURL }) }
          handleSaveChanges={this.handleSaveChanges}
          handleClose={ () => this.setState({ modalVisible: false })} 
        />
        
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
    backgroundColor: 'white',
    paddingTop: 10, 
    paddingBottom: 10,
    borderBottomColor: '#d9dce0',
    borderBottomWidth: 1 
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
