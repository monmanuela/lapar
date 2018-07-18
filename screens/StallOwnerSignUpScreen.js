import React from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import { Button } from 'react-native-elements'

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;

import firebase from 'react-native-firebase'

export default class StallOwnerSignUpScreen extends React.Component {
	constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      stallName: '',
      stallLocation: '',
      locationList: [],
      errorMessage: null
    }
  }

  componentDidMount = () => {
  	// fetch list of locations for location dropdown
  	firebase.database().ref("locations/").once("value").then(snapshot => {
      console.log("locations data: " + JSON.stringify(snapshot.val()))
      const locationsObj = snapshot.val()
      const locNamesArr = Object.keys(locationsObj).map((locId, idx) => {
      	return locationsObj[locId].name
      })
      this.setState({ locationList: locNamesArr })
    })
    // have a hashtable locname -> locId?
  }

  handleSignUp = () => {
    // this.props.signUpStallOwner(this.state.email, this.state.password, this.state.stallName, this.state.stallLocation)

    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const user = firebase.auth().currentUser

        user
          .updateProfile({
            displayName: this.state.stallName,
            photoURL: "https://images.unsplash.com/photo-1483137140003-ae073b395549?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1e392896fc645f9fc3797c9bb7dab4d3&auto=format&fit=crop&w=1350&q=80",
          })
          .then(() => {
          	console.log("update stall success")
		        // create a new stall
		        const newStallRef = firebase.database().ref("stalls").push();
		        const stallId = newStallRef.key

		        console.log("newStallRef: " + newStallRef)
		        console.log("stallId: " + stallId)

						newStallRef.set({
						  name: this.state.stallName,
						  location: this.state.stallLocation,
						  stallId: stallId,
						  owner: user.uid
						})
						return stallId
          })
					.then(stallId => {
						console.log("saving stall id in user")
		        // save the stall id in user
		        firebase.database().ref('users/' + user.uid).set({
		          isStall: true,
		          stallId: stallId
		        })
					})
          .catch(err => console.log(err))        
      })
  }

	render() {
		return (
      <View style={styles.container}>
        <Image source={require('../assets/images/logo.png')} style={{ width: scale(100), height: verticalScale(150) }}/>

        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

        {/* Email */}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        {/* Password */}
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        <TextInput
          placeholder="Stall Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={stallName => this.setState({ stallName })}
          value={this.state.stallName}
        />

        <TextInput
          placeholder="Stall Location"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={stallLocation => this.setState({ stallLocation })}
          value={this.state.stallLocation}
        />

        <Button 
          title="Create Account"
          textStyle={{ fontWeight: 'bold' }}
          buttonStyle={{ marginTop: 20, marginBottom: 10, backgroundColor: 'red', width: scale(120), borderRadius: 40 }} 
          onPress={this.handleSignUp} />

        <Text>- OR -</Text>

        <Button
          title="Login"
          textStyle={{ color: 'red' }}
          buttonStyle={{ marginTop: 10, backgroundColor: 'white', width: scale(120), borderRadius: 40, borderColor: 'red', borderWidth: 1 }}
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textInput: {
    height: 40,
    width: '80%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 8,
    marginBottom: 10
  }
})
