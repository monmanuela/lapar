import React from 'react'
import { ScrollView, View, Text, Button, StyleSheet, Image } from 'react-native'

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;

const stall = {
	items: {
		item1: true,
		item2: true,
		item3: true
	},
	location: "Fine Food",
	lowestPrice: 4.8,
	name: "Korean & Japanese Stall",
	rating: 5,
	stallId: 's1'
}

export default class StallOwnerScreen extends React.Component {
	constructor() {
		super()
		this.state = {
			photoURL: '../assets/images/food.jpg',
			name: stall.name,
			location: stall.location,
			modalVisible: false
		}
	}

	handleEditProfile = () => {
		this.setState({
			modalVisible: true
		})
	}

	render() {
		return (
			<ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ width: scale(350), backgroundColor: 'red', color: 'white', paddingLeft: scale(20), paddingTop: 13, paddingBottom: 13, fontSize: 22, fontWeight: 'bold' }}>Stall Profile</Text>
        </View>
        <Image source={{ uri: this.state.photoURL }} style={{ width: scale(350), height: verticalScale(120) }} />
        <View style={styles.container}>
          <Text style={{ fontSize: 20, color: 'black', marginBottom: 12, marginTop: 10 }}>{stall.name}</Text>
          <Text style={{ color: 'gray', marginBottom: 5, marginRight: 20 }}>Location: {stall.location}</Text>
          <Text style={{ color: 'gray', marginBottom: 5, marginRight: 20 }}>Rating: {stall.rating}</Text>
          <Text style={{ color: 'gray', marginBottom: 10, marginRight: 20 }}>Lowest Price: ${stall.lowestPrice}</Text>
        </View>
        <View style={styles.buttonContainer}>
        	<Button title='Edit Profile' color={'red'} onPress={this.handleEditProfile} />
        </View>
        <Text>{'\n'}</Text>

        <EditStallProfileModal modalVisible={this.state.modalVisible} />
      </ScrollView>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10, 
    paddingBottom: 10,
    paddingLeft: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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