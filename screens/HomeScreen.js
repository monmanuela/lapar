import React from 'react';
import { Text, ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';

import HorizontalItemsSwiper from '../components/HorizontalItemsSwiper';
import HorizontalLocsList from '../components/HorizontalLocsList';
import { locs, items } from '../constants/Test';

export default class HomeScreen extends React.Component {
	constructor() {
    super()
    this.state = {
      currentUser: null,
      recommendedItems: {},
      top5: {},
    }
  }

  componentDidMount = () => {
    console.log("home screen did mount")
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUser: user })
      } else {}
    })

    const db = firebase.database()
    // fetch recommended items
    db.ref("items").orderByChild("recommended").equalTo(true).once("value").then(snapshot => {
      console.log("recom snapshot: " + JSON.stringify(snapshot.val()))
      this.setState({ recommendedItems: snapshot.val() })
    })

    // fetch top 5 items
    db.ref("items").orderByChild("ratings").limitToFirst(5).once("value").then(snapshot => {
      console.log("top5 snapshot: " + JSON.stringify(snapshot.val()))
      this.setState({ top5: snapshot.val() })
    })
  }

	render() {
		return ( 
			<View style={{ flex: 1, backgroundColor: 'white' }}> 
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Explore')}>
          <View>
            <SearchBar inputStyle={{ backgroundColor: 'white' }} containerStyle={{ backgroundColor: 'red' }} placeholder="Search..." clearIcon />
          </View>
        </TouchableWithoutFeedback>

			 	<Text style={{ marginTop: 10, marginLeft: 10, marginBottom: 5, fontSize: 18, color: 'black' }}>Recommendations</Text>
        <HorizontalItemsSwiper items={this.state.recommendedItems} navigation={this.props.navigation} />

  			<Text style={{ marginTop: 10, marginLeft: 10, marginBottom: 5, fontSize: 18, color: 'black' }}>Top 5</Text>
        <HorizontalItemsSwiper items={this.state.top5} navigation={this.props.navigation} />

  			<Text style={{ marginTop: 10, marginLeft: 10, fontSize: 18, color: 'black' }}>Locations</Text>
  			<HorizontalLocsList locs={locs} navigation={this.props.navigation} />
        <Text>{'\n'}</Text>
  		</View>
		);
	}
}
