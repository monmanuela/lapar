import React from 'react';
import { Text, View, Button, StyleSheet, Image, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import { Avatar, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Octicons'
import EditProfileModal from '../components/EditProfileModal'
import EditPreferencesModal from '../components/EditPreferencesModal'
import VerticalReviewsList from '../components/VerticalReviewsList'
import { Dimensions } from 'react-native';

import {logOutUser} from '../redux/actions'
import {connect} from 'react-redux'
import store from '../redux/store'

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;

class ProfileScreen extends React.Component {
  constructor() {
    super()
    this.state = { 
      currentUser: null,
      userData: {
        displayName: '',
        bio: '',
        photoURL: null,
        uid: '',
        userID: '',
        preferences: []
      },
      modalVisible: false,
      modalDisplayName: '',
      modalBio: '',
      modalPhotoURL: null,
      isLoading: true,
      reviews: {},
      preferencesModalVisible: false,
      modalPreferences: []
    }
  }

  componentDidMount = () => {
    const currentUser = this.props.currentUser
    const userData = this.props.userData
    this.setState(currentUser)
    this.setUserData(userData)
    this.setState({ isLoading: false })
    const db = firebase.database()

    let reviewIds

    db.ref("users/" + currentUser.uid + "/reviews/").on("child_added", snapshot => {
      console.log("\nGOT ADDED CHILD IN PROFILE SCREEN\n")
      // fetch user reviewIds again, set as state to trigger re render
      db.ref("users/" + currentUser.uid).orderByKey().equalTo("reviews").once("value").then(snapshot => {
        console.log("re fetched reviews: " + JSON.stringify(snapshot.val().reviews))
        reviewIds = snapshot.val().reviews
      })
      .then(() => {
        Object.keys(reviewIds).map((reviewId, index) => {
          db.ref("reviews/" + reviewId).once("value")
            .then(snapshot => snapshot.val())
            .then(rev => {
              let newReview = this.state.reviews
              newReview[reviewId] = rev
              this.setState({ reviews: newReview })
            })
        })
      })
      .then(() => {
        console.log('REVIEWS ' + JSON.stringify(this.state.reviews))
      })
    })
  }

  setUserData = userData => {
    this.setState({ 
      userData: {
        displayName: this.props.currentUser.displayName,
        photoURL: this.props.currentUser.photoURL,
        ...userData
      } 
    })
  }

  handleEditProfile = () => {
    this.setState({ 
      modalVisible: true,
      modalDisplayName: this.state.userData.displayName,
      modalBio: this.state.userData.bio,
      modalPhotoURL: this.state.userData.photoURL,
    });
  }

  handleSaveChanges = () => {
    const user = this.props.currentUser
    
    user.updateProfile({
      displayName: this.state.modalDisplayName,
      photoURL: this.state.modalPhotoURL,
    })
    .then(() => {
      const db = firebase.database()
      db.ref("users/" + user.uid).update({
        bio: this.state.modalBio,
      })
    })
    .then(() => {
      this.setState({
        userData: {
          ...this.state.userData,
          displayName: this.state.modalDisplayName,
          bio: this.state.modalBio,
          photoURL: this.state.modalPhotoURL,
        },
        modalVisible: false 
      })
    })
  }

  onCheckPreference = preference => {
    const modalPreferences = this.state.modalPreferences;

    if (!modalPreferences.includes(preference)) {
      this.setState({ modalPreferences: [...modalPreferences, preference] });
    } else {
      this.setState({ modalPreferences: modalPreferences.filter( p => p !== preference) });
    }
  }

  handleSetPreferences = () => {
    this.setState({
      preferencesModalVisible: true,
      modalPreferences: this.state.userData.preferences === undefined ? [] : this.state.userData.preferences
    })
  }

  handlePreferencesChanges = () => {
    const user = this.props.currentUser
    const db = firebase.database()

    db.ref("users/" + user.uid).update({
      preferences: this.state.modalPreferences
    })
    .then(() => {
      this.setState({
        userData: {
          ...this.state.userData,
          preferences: this.state.modalPreferences
        },
        preferencesModalVisible: false
      })
    })
  }

  handleSignOut = () => {
    return Alert.alert(
      'Sign Out',
      'Are you sure you want to quit?',
      [
        {text: 'Sign Out', onPress: () => this.onSignOut()},
        {text: 'Cancel', onPress: () => {}}
      ],
      { cancelable: false }
    );
  }

  onSignOut = () => {
    try {
      firebase.auth().signOut()
      this.props.logOutUser()
      this.props.navigation.navigate('Login')
    } catch (err) {
      console.log(err)
    }
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
    console.log("store state at profile: " + JSON.stringify(store.getState()))
    let screen
    if (this.state.isLoading) {
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
          <Text style={{ fontSize: 5 }}>{'\n'}</Text>
          <Button title='Set Preferences' color={'red'} onPress={this.handleSetPreferences} />
        </View>

        <VerticalReviewsList reviews={Object.values(this.state.reviews)} /> 

        <Text>{'\n'}</Text>

        <EditProfileModal
          modalVisible={this.state.modalVisible} 
          currentUser={this.state.currentUser} 
          displayName={this.state.modalDisplayName}
          userID={this.state.userData.userID}
          bio={this.state.modalBio}
          photoURL={this.state.modalPhotoURL}
          onChangeDisplayName={ modalDisplayName => this.setState({ modalDisplayName }) }
          onChangeBio={ modalBio => this.setState({ modalBio }) }
          onChangePhotoURL={ modalPhotoURL => this.setState({ modalPhotoURL }) }
          handleSaveChanges={this.handleSaveChanges}
          handleClose={ () => this.setState({ modalVisible: false })} 
        />
        <Text>{this.state.modalPreferences}</Text>
        <EditPreferencesModal
          modalVisible={this.state.preferencesModalVisible}
          preferences={this.state.modalPreferences}
          onCheckPreference={this.onCheckPreference}
          handleSaveChanges={this.handlePreferencesChanges}
          handleClose={ () => this.setState({ preferencesModalVisible: false })}
        />

        </ScrollView>
      }

      return (
        <View style={{ flex: 1, alignItems: 'center' }}>{screen}</View>
      );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  userData: state.user.userData
})

export default connect(mapStateToProps, {logOutUser})(ProfileScreen)

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
