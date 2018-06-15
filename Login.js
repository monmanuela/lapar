import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Button,
  TouchableWithoutFeedback
} from 'react-native';
// import * as firebase from "firebase";
// import { Sae } from "react-native-textinput-effects"

class Login extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: "",
  //     password: "",
  //     response: ""
  //   };
  // }

  render() {
    return (
      <View><Text>hi</Text></View>
      // <TouchableWithoutFeedback onPress = { () => Keyboard.dismiss() }>
      //   <KeyboardAvoidingView behavior="padding">
      //     <View>
      //       <Text>Log In / Sign Up</Text>
      //       <TextInput 
      //         placeholder = "Email Address"
      //         onChangeText = {(e) => this.setState({ email: e })}
      //         keyboardType = "email-address"
      //         autoCapitalize = "none"
      //         autoCorrect = "none"
      //       />

      //       <TextInput 
      //         value = "Password"
      //         onChangeText = {(p) => this.setState({ password: p })}
      //         password = { true }
      //         autoCapitalize = "none"
      //         autoCorrect = "none"
      //       />

      //       <View>
      //         <Button onPress={this.signup} title="Sign up" />
      //         <Button onPress={this.login} title="Login" />
      //       </View>
      //     </View>
      //   </KeyboardAvoidingView>
      // </TouchableWithoutFeedback>
    )
  }

  // signup = () => {
  //   try {
  //     firebase.auth()
  //       .createUserWithEmailAndPassword(this.state.email, this.state.password);

  //     this.setState({
  //       response: "Account created"
  //     });
  //     // Navigate to the Home page, the user is auto logged in
    
  //   } catch (error) {
  //     this.setState({
  //       response: error.toString()
  //     });
  //   }
  // }

  // login = () => {
  //   try {
  //     firebase.auth()
  //       .signInWithEmailAndPassword(this.state.email, this.state.password);

  //     this.setState({
  //       response: "Logged in!"
  //     });
  //     // Navigate to the Home page

  //   } catch (error) {
  //     this.setState({
  //       response: error.toString()
  //     });
  //   }
  // }

  // logout = () => {
  //   try {
  //     firebase.auth().signOut();

  //     this.setState({
  //       response: "Logged out!"
  //     });
  //     // Navigate to Login view
    
  //   } catch (error) {
  //     this.setState({
  //       response: error.toString()
  //     });
  //   }
  // }
}

export default Login
