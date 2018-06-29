import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'

export default class SignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      displayName: '',
      username: '',
      email: '',
      password: '',
      bio: '',
      errorMessage: null
    }
  }

  handleSignUp = async () => {
    let userID
    const db = firebase.database()
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const user = firebase.auth().currentUser
        user.updateProfile({
          displayName: this.state.displayName,
          photoURL: "https://firebasestorage.googleapis.com/v0/b/newlapar-19607.appspot.com/o/avatar%2Fhappy.png?alt=media&token=51fa7ac1-bab9-4078-9f44-2db77f0f04bd",
        })
        return user
      })
      .then(user => {
        db.ref('users/' + user.uid).set({
          bio: '',
          preferences: '',
          userId: user.uid,
        })
      })
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>

        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

        {/* Display name */}
        <TextInput
          placeholder="Display name"
          style={styles.textInput}
          onChangeText={displayName => this.setState({ displayName })}
          value={this.state.displayName}
        />

        {/* Username */}
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />

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

        <Button 
          title="Sign Up"
          onPress={this.handleSignUp}  
        />

        <Button
          title="Already have an account? Login"
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