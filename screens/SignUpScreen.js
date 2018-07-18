import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;

export default class SignUpScreen extends React.Component {
	render() {
		return (
      <View style={styles.container}>
        <Image source={require('../assets/images/logo.png')} style={{ width: scale(100), height: verticalScale(150) }}/>

        <Text style={{ marginTop: 30 }}>ARE YOU A</Text>

        <Button 
          title="Normal User"
          textStyle={{ fontWeight: 'bold' }}
          buttonStyle={{ marginTop: 10, marginBottom: 10, backgroundColor: 'red', width: scale(120), borderRadius: 40 }} 
          onPress={() => this.props.navigation.navigate('NormalSignUp')} />

        <Text>- OR -</Text>

        <Button
          title="Stall Owner"
          textStyle={{ fontWeight: 'bold' }}
          buttonStyle={{ marginTop: 10, backgroundColor: 'red', width: scale(120), borderRadius: 40 }}
          onPress={() => this.props.navigation.navigate('StallOwnerSignUp')}
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