// screen that displays until we determine the auth state of a user
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'

import {updateUserIfLoggedIn, NORMAL, STALL} from '../redux/actions'
import {connect} from 'react-redux'
import store from '../redux/store'

class LoadingScreen extends React.Component {
  componentDidMount = () => {

    firebase.auth().onAuthStateChanged(user => {
      const userType = store.getState().user.userType
      console.log("store state in loading screen: " + JSON.stringify(store.getState()))
      let userData
      if (user) {
        console.log("user in listener: " + JSON.stringify(user))
        this.props.updateUserIfLoggedIn(user)

        if (userType) {
          console.log("userType: " + userType)
          // a new sign up
          // but then at the stall screen, snapshot.val() is null?
          switch(userType) {
            case NORMAL:
              console.log("NORMAL USER in loading")
              this.props.navigation.navigate('MainTabNavigator')
              break
            case STALL:
              console.log("STALL OWNER in loading")
              this.props.navigation.navigate('StallOwnerNavigator')
              break
          }
        } else {
          console.log("not new user")
          firebase.database().ref("users/" + user.uid).once("value").then(snapshot => {
            console.log("user data: " + JSON.stringify(snapshot.val()))
            userData = snapshot.val()
          })
          .then(() => {
            if (userData.isStall) {
              this.props.navigation.navigate('StallOwnerNavigator')
            } else {
              this.props.navigation.navigate('MainTabNavigator')
            }
          })
        }
      } else {
        this.props.navigation.navigate('SignedOutNavigator')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

export default connect(null, {updateUserIfLoggedIn})(LoadingScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
