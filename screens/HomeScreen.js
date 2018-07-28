import React from 'react';
import { Text, ScrollView, View, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';
import HorizontalItemsSwiper from '../components/HorizontalItemsSwiper';
import HorizontalLocsList from '../components/HorizontalLocsList';
import { locs, items } from '../constants/Test';

// redux
import {connect} from 'react-redux'
import {addCount} from '../redux/actions'

class HomeScreen extends React.Component {
	constructor() {
    super()
    this.state = {
      recommendedItems: {},
      top5: {},
      locations: {},
    }
  }

  componentDidMount = () => {
    console.log("didMount")
    const db = firebase.database()
    db.ref("items").orderByChild("name").once("value").then(snapshot => {
      const items = snapshot.val()
      const filteredArray = Object.keys(items).filter(item => this.props.userData.preferences === undefined ? item : this.props.userData.preferences.every(pref => items[item].tags.includes(pref))).slice(0, 5)
      const itemsArray = filteredArray.length === 0 ? Object.keys(items).slice(0, 5) : filteredArray
      const filteredObject = itemsArray.reduce((obj, key) => { 
        obj[key] = items[key]; 
        return obj;
      }, {})
      this.setState({ recommendedItems: filteredObject })
    })

    // fetch top 5 items
    db.ref("items").orderByChild("ratings").limitToFirst(5).once("value").then(snapshot => {
      this.setState({ top5: snapshot.val() })
    })

    // fetch locations
    db.ref("locations").orderByChild("name").once("value").then(snapshot => {
      this.setState({ locations: snapshot.val() })
    })
  }

	render() {
		return ( 
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, backgroundColor: 'white' }}> 
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Explore')}>
            <View>
              <SearchBar inputStyle={{ backgroundColor: 'white' }} containerStyle={{ backgroundColor: 'red', borderBottomColor: 'transparent', borderTopColor: 'transparent' }} placeholder="Search..." clearIcon />
            </View>
          </TouchableWithoutFeedback>
         
  			 	<Text style={{ marginTop: 10, marginLeft: 10, marginBottom: 5, fontSize: 18, color: 'black' }}>Recommendations</Text>
          
          <HorizontalItemsSwiper items={this.state.recommendedItems} navigation={this.props.navigation} />

    			<Text style={{ marginTop: 10, marginLeft: 10, marginBottom: 5, fontSize: 18, color: 'black' }}>Top 5</Text>
          
          <HorizontalItemsSwiper items={this.state.top5} navigation={this.props.navigation} />
          
    			<Text style={{ marginTop: 10, marginLeft: 10, fontSize: 18, color: 'black' }}>Locations</Text>
    			
          <HorizontalLocsList locs={this.state.locations} navigation={this.props.navigation} />

          <Text>{'\n'}</Text>
  		  </View>
      </TouchableWithoutFeedback>
		);
	}
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  userData: state.user.userData
})

const mapDispatchToProps = {
  addCount: addCount
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
