import React from 'react'
import { ScrollView, View, Text, Button, StyleSheet, Image, UIManager, LayoutAnimation } from 'react-native'
import firebase from 'react-native-firebase';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Octicons'

import EditStallProfileModal from '../components/EditStallProfileModal'
import AddNewItemModal from '../components/AddNewItemModal'
import VerticalItemsList from '../components/VerticalItemsList'

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;

let _listViewOffset = 0

// const stall = {
// 	items: {
// 		item1: true,
// 		item2: true,
// 		item3: true,
//     item4: true,
//     item5: true,
//     item6: true,
//     item7: true
// 	},
// 	location: "Fine Food",
// 	lowestPrice: 4.8,
// 	name: "Korean & Japanese Stall",
// 	rating: 5,
// 	stallId: 's1'
// }

export default class StallOwnerScreen extends React.Component {
	constructor() {
		super()
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
		this.state = {
      user: null,
      stallId: null,
			photoURL: null,
			name: null,
			location: null,
			items: [],
      rating: null,
      lowestPrice: null,
			modalPhotoURL: '',
			modalName: '',
			modalLocation: '',
			modalVisible: false,
      newItemName: '',
      newItemModalVisible: false,
      isActionButtonVisible: true
		}
	}

  componentDidMount = () => {
    const user = firebase.auth().currentUser
    this.setState({
      user: user,
      photoURL: user.photoURL,
      name: user.displayName,
    })
    let stallId, stallData
    
    firebase.database().ref("users/" + user.uid).once("value").then(snapshot => {
      console.log("owner data: " + JSON.stringify(snapshot.val()))
      stallId = snapshot.val().stallId
      this.setState({stallId: stallId})
    })
    .then(() => {
      firebase.database().ref("stalls/" + stallId).once("value").then(snapshot => {
        console.log("stall data: " + JSON.stringify(snapshot.val()))
        stallData = snapshot.val()
      })
      .then(() => {
        this.setState({
          location: stallData.location,
          rating: stallData.rating,
          lowestPrice: stallData.lowestPrice
        })
        if (stallData.items) {
          this.setState({items: Object.keys(stallOwnerData.items)})
        }
      })
    })
  }

  // add listener for items
  // upon adding item, add itemId to location, stall, and stall owner(?)

  handleSignOut = () => {
    firebase.auth().signOut()
    this.props.navigation.navigate('Login')
  }

	handleEditProfile = () => {
		this.setState({
			modalPhotoURL: this.state.photoURL,
			modalName: this.state.name,
			modalLocation: this.state.location,
			modalVisible: true
		})
	}

	handleSaveChanges = () => {
		this.setState({
			photoURL: this.state.modalPhotoURL,
			name: this.state.modalName,
			location: this.state.modalLocation,
			modalVisible: false
		})

    // upload to firebase
    const user = this.state.user
    
    user.updateProfile({
      displayName: this.state.modalName,
      photoURL: this.state.modalPhotoURL,
    })
    .then(() => {
      const db = firebase.database()
      db.ref("stalls/" + this.state.stallId).update({
        name: this.state.modalName,
        location: this.state.modalLocation
      })
    })
	}

  handleAddItem = () => {
    this.setState({
      newItemModalVisible: true
    })
  }

  handleSaveNewItem = () => {
    this.setState({
      items: [...this.state.items, this.state.newItemName],
      newItemModalVisible: false
    })
  }

  onScroll = (event) => {
    const CustomLayoutLinear = {
      duration: 200,
      create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
    }

    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = (currentOffset > 0 && currentOffset > this._listViewOffset) ? 'down' : 'up'
    const isActionButtonVisible = direction === 'up'
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear)
      this.setState({ isActionButtonVisible })
    }

    this._listViewOffset = currentOffset
  }

  handleSignOut = () => {
    try {
      firebase.auth().signOut()
      this.props.navigation.navigate('Login')
    } catch (err) {
      console.log(err)
    }
  }

	render() {
		return (
      <View style={{ flex: 1 }}>
  			<ScrollView onScroll={this.onScroll} style={{ backgroundColor: 'white' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ width: scale(310), backgroundColor: 'red', color: 'white', paddingLeft: scale(20), paddingTop: 13, paddingBottom: 13, fontSize: 22, fontWeight: 'bold' }}>Stall Profile</Text>
            <Icon onPress={this.handleSignOut} name='sign-out' size={scale(25)} color={'white'} style={{ backgroundColor: 'red', paddingLeft: scale(10), paddingTop: scale(15), paddingRight: scale(5) }} />
          </View>

          <Image source={{ uri: this.state.photoURL }} style={{ width: scale(350), height: verticalScale(180) }} />
          
          <View style={styles.container}>
            <Text style={{ fontSize: 20, color: 'black', marginBottom: 12, marginTop: 10 }}>{this.state.name}</Text>
            <Text style={{ color: 'gray', marginBottom: 5, marginRight: 20 }}>Location: {this.state.location}</Text>
            <Text style={{ color: 'gray', marginBottom: 5, marginRight: 20 }}>Rating: {this.state.rating}</Text>
            <Text style={{ color: 'gray', marginBottom: 10, marginRight: 20 }}>Lowest Price: ${this.state.lowestPrice}</Text>
          </View>
          
          <View style={styles.buttonContainer}>
          	<Button title='Edit Profile' color={'red'} onPress={this.handleEditProfile} />
          </View>

          <VerticalItemsList items={this.state.items} navigation={this.props.navigation} />
          
          <Text>{'\n'}</Text>

          <EditStallProfileModal
   					modalVisible={this.state.modalVisible} 
            photoURL={this.state.modalPhotoURL}
            name={this.state.modalName}
            location={this.state.modalLocation}
            onChangePhotoURL={ modalPhotoURL => this.setState({ modalPhotoURL }) }
            onChangeName={ modalName => this.setState({ modalName }) }
            onChangeLocation={ modalLocation => this.setState({ modalLocation })}
            handleSaveChanges={this.handleSaveChanges}
            handleClose={() => this.setState({ modalVisible: false })}
          />

          <AddNewItemModal
            modalVisible={this.state.newItemModalVisible}
            onAddItemName={ name => this.setState({ newItemName: name })}
            handleSaveNewItem={this.handleSaveNewItem}
            handleClose={() => this.setState({ newItemModalVisible: false })}
          />

        </ScrollView>     

        {this.state.isActionButtonVisible ? <ActionButton onPress={this.handleAddItem} /> : null}

      </View>
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