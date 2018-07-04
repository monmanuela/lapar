import React from 'react';
import { Text, ScrollView, View, TouchableWithoutFeedback, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';

import HorizontalItemsSwiper from '../components/HorizontalItemsSwiper';
import HorizontalLocsList from '../components/HorizontalLocsList';
import { locs, items } from '../constants/Test';

// redux
import {connect} from 'react-redux'
import {addCount} from '../redux/actions'
import store from '../redux/store'


class HomeScreen extends React.Component {
	constructor() {
    super()
    this.state = {
      currentUser: null,
      recommendedItems: {},
      top5: {},
      locations: {},
    }
  }

  componentDidMount = () => {
    console.log("home screen did mount")
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUser: user })
        console.log("currentUser: " + JSON.stringify(this.state.currentUser))
        // console.log("current user uid: " + this.state.currentUser.uid)
      } else {
        // this.setState({ currentUser: null })
        console.log("NO CURRENT USER?")
      }
    })

    const db = firebase.database()
    // fetch recommended items
    db.ref("items").orderByChild("recommended").equalTo(true).once("value").then(snapshot => {
      this.setState({ recommendedItems: snapshot.val() })
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

  // this.props.addCount(2)
  // store.dispatch(addCount(5))

	render() {
		return ( 
			<View style={{ flex: 1, backgroundColor: 'white' }}> 
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Explore')}>
          <View>
            <SearchBar inputStyle={{ backgroundColor: 'white' }} containerStyle={{ backgroundColor: 'red', borderBottomColor: 'transparent', borderTopColor: 'transparent' }} placeholder="Search..." clearIcon />
          </View>
        </TouchableWithoutFeedback>

        <Text>Counts: </Text>
        <Text>{this.props.counts}</Text>
        <Button title='ADD' onPress={() => this.props.addCount(2)}/>

			 	<Text style={{ marginTop: 10, marginLeft: 10, marginBottom: 5, fontSize: 18, color: 'black' }}>Recommendations</Text>
        
        {this.state.currentUser &&
        <HorizontalItemsSwiper items={this.state.recommendedItems} userId={this.state.currentUser.uid} navigation={this.props.navigation} />
        }

  			<Text style={{ marginTop: 10, marginLeft: 10, marginBottom: 5, fontSize: 18, color: 'black' }}>Top 5</Text>
        
        {this.state.currentUser &&
        <HorizontalItemsSwiper items={this.state.top5} userId={this.state.currentUser.uid} navigation={this.props.navigation} />
        }
        
  			<Text style={{ marginTop: 10, marginLeft: 10, fontSize: 18, color: 'black' }}>Locations</Text>
  			
        {this.state.currentUser &&
        <HorizontalLocsList locs={this.state.locations} userId={this.state.currentUser.uid} navigation={this.props.navigation} />
        }

        <Text>{'\n'}</Text>
  		</View>
		);
	}
}

const mapStateToProps = state => ({
  counts: state.counts,
})

const mapDispatchToProps = {
  addCount: addCount
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
