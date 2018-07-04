import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AppNavigator from "./navigation/AppNavigator";
import firebase from 'react-native-firebase';

import store from './redux/store'
import {Provider} from 'react-redux'


class App extends React.Component {
  render() {
    const Layout = AppNavigator();
    // return <Layout />;
    
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    )
  }
}

export default App

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
