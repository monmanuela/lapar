import React from 'react';
import { Modal, View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;

export default class AddNewItemModal extends React.Component {
	constructor() {
		super()
		this.state = {
			photoURL: null,
		}
	}

	onChangePicturePress = () => {

	}

	render() {
		return (
			<Modal animationType='fade' onRequestClose={() => alert("Add") } visible={this.props.modalVisible}>
				<View style={{ backgroundColor: 'white' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
            <Button
              title="ADD PICTURE"
              onPress= { this.onChangePicturePress }
              textStyle={{ fontWeight: 'bold', fontSize: 14 }}
              buttonStyle={{ backgroundColor: 'red', width: scale(100), borderRadius: 2, marginTop: 10, marginBottom: 10, padding: 5 }}
            />

            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: this.state.photoURL}}
            />

            <TextInput
  						style={{ height: 50, width: '90%', borderBottomColor: 'gray', borderBottomWidth: 1, paddingLeft: 8, paddingRight: 8 }} 
  						onChangeText={name => this.props.onAddItemName(name)} 
  					/>

  					<Button 
              title='SUBMIT' 
              textStyle={{ fontWeight: 'bold', fontSize: 14 }} 
              buttonStyle={{ backgroundColor: 'red', width: scale(70), borderRadius: 2, marginTop: 20, padding: 5 }} 
              onPress={this.props.handleSaveNewItem} />

  					<Button 
              title='CLOSE' 
              textStyle={{ fontWeight: 'bold', fontSize: 14 }} 
              buttonStyle={{ backgroundColor: 'red', width: scale(70), borderRadius: 2, marginTop: 20, padding: 5 }} 
              onPress={this.props.handleClose} />
          </View>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 350
  }
})