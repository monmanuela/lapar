import React from 'react'
import { ScrollView, View, Text, Button, StyleSheet, Image, UIManager, LayoutAnimation, ActivityIndicator, Alert } from 'react-native'
import firebase from 'react-native-firebase';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Octicons'

import EditStallProfileModal from '../components/EditStallProfileModal'
import AddNewItemModal from '../components/AddNewItemModal'
import VerticalItemsList from '../components/VerticalItemsList'

import { Dimensions } from 'react-native';

import {connect} from 'react-redux'


const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;

let _listViewOffset = 0

class StallOwnerScreen extends React.Component {
	constructor() {
		super()
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
		this.state = {
      user: null,
      stallId: null,
			photoURL: null,
			name: null,
			location: null,
			items: {},
      rating: null,
      lowestPrice: null,
			modalPhotoURL: '',
			modalName: '',
			modalLocation: '',
			modalVisible: false,
      newItemName: '',
      newItemPrice: 0,
      newItemModalVisible: false,
      isActionButtonVisible: true,
      isLoading: false
		}
	}

  // when stallId is stored in redux store, then trigger the logic in did mount
  // use stallId from redux instead of firebase

  componentDidUpdate(prevProps) {
    // console.log("stall owner screen DID UPDATE")
    // console.log("currentstate: " + JSON.stringify(this.state))
    // console.log("prevprops: " + JSON.stringify(prevProps))
    // console.log("currentprops: " + JSON.stringify(this.props))
    // let stallData
    // if (!prevProps.userData && !this.props.userData) {
    //   console.log("enter if")
    // } else if (this.props.userData && this.props.userData.stallId 
    //     && (this.props.userData.stallId !== prevProps.userData.stallId)) {
    //   const user = firebase.auth().currentUser
    //   console.log("user in did mount: " + JSON.stringify(user))
    //   this.setState({
    //     user: user,
    //     photoURL: user.photoURL,
    //     name: user.displayName,
    //   })
    //   console.log("enter else if")
    //   const stallId = this.props.userData.stallId
    //   console.log("stall id: " + stallId)
    //   // this.setState({stallId: stallId})

    //   const db = firebase.database()

    //   db.ref("stalls/" + stallId).once("value").then(snapshot => {
    //     console.log("stall data: " + JSON.stringify(snapshot.val()))
    //     stallData = snapshot.val()
    //   })
    //   .then(() => {
    //     this.setState({
    //       // name: stallData.name,
    //       location: stallData.location,
    //       rating: stallData.rating,
    //       lowestPrice: stallData.lowestPrice
    //     })
    //     if (stallData.items) {
    //       console.log(stallId)
    //       this.setState({items: stallData.items})
    //     }
    //   }).then(() => {
    //     // let itemIds

    //     // db.ref("stalls/" + stallId + "/items/").on("child_added", snapshot => {
    //     //   db.ref("stalls/" + stallId).once("value").then(snapshot => {
    //     //     itemIds = snapshot.val().items
    //     //   })
    //     //   .then(() => {
    //     //     Object.keys(itemIds).map((itemId, index) => {
    //     //       db.ref("items/" + itemId).once("value")
    //     //         .then(snapshot => snapshot.val())
    //     //         .then(i => {
    //     //           let newItem = this.state.items
    //     //           newItem[itemId] = i
    //     //           this.setState({ items: newItem })
    //     //         })
    //     //     })
    //     //   })
    //     //   .then(() => console.log("ITEMS IN STALL " + JSON.stringify(this.state.items)))
    //     // })
    //     this.setState({isLoading: false})
    //   })
    // }
  }

  componentDidMount = () => {
    console.log("stall owner screen DID MOUNT")
    // this.setState({user: null})
    const user = firebase.auth().currentUser
    console.log("user in did mount: " + JSON.stringify(user))
    this.setState({
      user: user,
      photoURL: user.photoURL,
      name: user.displayName,
    })
    let stallId, stallData
    const db = firebase.database()

    db.ref("users/" + user.uid).once("value").then(snapshot => {
      console.log("owner data: " + JSON.stringify(snapshot.val()))
      stallId = snapshot.val().stallId
      this.setState({stallId: stallId})
    })
    .then(() => {
      db.ref("stalls/" + stallId).once("value").then(snapshot => {
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
          console.log(stallId)
          this.setState({items: stallData.items})
        }
      }).then(() => {
        let itemIds

        db.ref("stalls/" + stallId + "/items/").on("child_added", snapshot => {
          db.ref("stalls/" + stallId).once("value").then(snapshot => {
            itemIds = snapshot.val().items
          })
          .then(() => {
            Object.keys(itemIds).map((itemId, index) => {
              db.ref("items/" + itemId).once("value")
                .then(snapshot => snapshot.val())
                .then(i => {
                  let newItem = this.state.items
                  newItem[itemId] = i
                  this.setState({ items: newItem })
                })
            })
          })
          .then(() => console.log("ITEMS IN STALL " + JSON.stringify(this.state.items)))
        })
      })
    })
  }

  // add listener for items
  // upon adding item, add itemId to location, stall, and stall owner(?)

  // make an activity indicator to wait for result?

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
    return Alert.alert(
      'Sign Out',
      'Are you sure you want to quit?',
      [
        {text: 'Sign Out', onPress: () => this.onSignOut()},
        {text: 'Cancel', onPress: () => {}}
      ],
      { cancelable: false }
    );
  }

  onSignOut = () => {
    try {
      firebase.auth().signOut()
      this.props.navigation.navigate('Login')
    } catch (err) {
      console.log(err)
    }
  }

	render() {
		let screen

    // if (this.state.isLoading) {
    //   screen = <ActivityIndicator size="large" color="#0000ff" />
    // } else {
      screen = 
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
          
          <VerticalItemsList items={Object.values(this.state.items)} navigation={this.props.navigation} />
          
          <Text>{'\n'}</Text>

          <EditStallProfileModal
            stallId={this.state.stallId}
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
            stallId={this.state.stallId}
            handleClose={() => this.setState({ newItemModalVisible: false })}
          />

        </ScrollView>     

        {this.state.isActionButtonVisible ? <ActionButton onPress={this.handleAddItem} /> : null}
    // }

		return (
      <View style={{ flex: 1, alignItems: 'center' }}>{screen}</View>
    );
	}
}

const mapStateToProps = state => ({
  userData: state.user.userData
})

export default connect(mapStateToProps)(StallOwnerScreen)

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