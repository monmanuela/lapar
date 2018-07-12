// screen that displays until we determine the auth state of a user
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'

import {updateUserIfLoggedIn} from '../redux/actions'
import {connect} from 'react-redux'


class LoadingScreen extends React.Component {
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user in listener: " + JSON.stringify(user))
        this.props.updateUserIfLoggedIn(user)
        
        this.props.navigation.navigate('MainTabNavigator')
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
