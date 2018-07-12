import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import firebase from 'react-native-firebase'

import {logInUser} from '../redux/actions'
import {connect} from 'react-redux'
import store from '../redux/store'

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentUser !== prevProps.currentUser
        && this.props.userData !== prevProps.userData) {
      console.log("comp did update, userData: " + JSON.stringify(this.props.userData))
      this.props.navigation.navigate('Home')
    }
  }

  handleLogin = () => {
    this.props.logInUser(this.state.email, this.state.password)
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.errMessage &&
          <Text style={{ color: 'red' }}>
            {this.props.errMessage}
          </Text>}
        <Image source={require('../assets/images/logo.png')} style={{ width: scale(100), height: verticalScale(150) }}/>
        
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={ email => this.setState({ email })}
          value={this.state.email}
        />

        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={ password => this.setState({ password })}
          value={this.state.password}
        />

        <Button 
          title="Login"
          textStyle={{ fontWeight: 'bold' }}
          buttonStyle={{ marginTop: 20, marginBottom: 10, backgroundColor: 'red', width: scale(120), borderRadius: 40 }} 
          onPress={this.handleLogin} />

        <Text>- OR -</Text>

        <Button
          title="Sign Up"
          textStyle={{ color: 'red' }}
          buttonStyle={{ marginTop: 10, backgroundColor: 'white', width: scale(120), borderRadius: 40, borderColor: 'red', borderWidth: 1 }}
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  errMessage: state.user.errMessage,
  currentUser: state.user.currentUser,
  userData: state.user.userData
})

export default connect(mapStateToProps, {logInUser})(LoginScreen)

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
