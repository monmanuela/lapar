// screen that displays until we determine the auth state of a user
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'

import {updateUserIfLoggedIn, updateUserIfNewSignUp, NORMAL, STALL} from '../redux/actions'
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
        // this.props.updateUserIfLoggedIn(user)

        if (userType) {
          this.props.updateUserIfNewSignUp(user)

          // a new sign up
          switch(userType) {
            case NORMAL:
              return this.props.navigation.navigate('MainTabNavigator')
            case STALL:
              return this.props.navigation.navigate('StallOwnerNavigator')
          }
        } else {
          this.props.updateUserIfLoggedIn(user)

          firebase.database().ref("users/" + user.uid).once("value").then(snapshot => {
            console.log("user data: " + JSON.stringify(snapshot.val()))
            userData = snapshot.val()
          })
          .then(() => {
            if (userData.isStall) {
              return this.props.navigation.navigate('StallOwnerNavigator')
            } else {
              return this.props.navigation.navigate('MainTabNavigator')
            }
          })
        }
      } else {
        return this.props.navigation.navigate('SignedOutNavigator')
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

mapDispatchToProps = {
  updateUserIfLoggedIn: updateUserIfLoggedIn,
  updateUserIfNewSignUp: updateUserIfNewSignUp
}


export default connect(null, mapDispatchToProps)(LoadingScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
