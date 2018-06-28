import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
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
			<View style={{ flex: 1 }}> 
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Explore')}>
          <View>
            <SearchBar placeholder="Search..." clearIcon />
          </View>
        </TouchableWithoutFeedback>

			 	<Text>Recommendations</Text>
        <HorizontalItemsSwiper context={'recom'} items={this.state.recommendedItems} navigation={this.props.navigation} />
        <Text>{'\n'}</Text>

  			<Text>Top 10</Text>
        <HorizontalItemsSwiper context={'top 5'} items={this.state.top5} navigation={this.props.navigation} />
        <Text>{'\n'}</Text>

  			<Text>Locations</Text>
  			<HorizontalLocsList locs={locs} navigation={this.props.navigation} />
        <Text>{'\n'}</Text>
  		</View>
		);
	}
}
