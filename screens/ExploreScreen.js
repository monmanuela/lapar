import React from 'react';
import { Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import VerticalStallsList from '../components/VerticalStallsList';
import { stalls } from '../constants/Test';
import ExploreModal from '../components/ExploreModal'

import { Dimensions } from 'react-native';
import firebase from 'react-native-firebase';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;

export default class ExploreScreen extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		search: '',
      modalVisible: false,
      sort: 'rating',
      filters: [],
      locations: this.props.navigation.state.params === undefined ? [] : [this.props.navigation.state.params.locs],
      locs: this.props.navigation.state.params === undefined ? '' : this.props.navigation.state.params.locs,
      locationObj: {},
      locationNames: null, // array of location names ["Fine Food", "Techno Edge", ...]
      stallObj: null,
      itemObj: null,
  	}
  }

  componentDidMount = () => {
    console.log("state locations: " + this.state.locations)
    console.log("state locs: " + this.state.locs)

    // fetch location names
    const db = firebase.database()
    db.ref("locations").once("value").then(snapshot => {
      this.setState({ locationObj: snapshot.val() })
      let locationIds = Object.keys(this.state.locationObj)
      const locNameArr = locationIds.map((key, idx) => {
        return this.state.locationObj[key].name
      })
      this.setState({ locationNames: locNameArr })
    })

    // fetch stalls
    db.ref("stalls").once("value").then(snapshot => {
      this.setState({ stallObj: snapshot.val() })
      console.log("stall obj: " + JSON.stringify(this.state.stallObj))
    })

    // fetch items
    db.ref("items").once("value").then(snapshot => {
      this.setState({ itemObj: snapshot.val() })
      console.log("item obj: " + JSON.stringify(this.state.itemObj))
    })
  }

  handleNavigation = () => {
    console.log("handleNavigation")
    if (this.props.navigation.state.params !== undefined && this.props.navigation.state.params.locs !== this.state.locs) {
      this.setState({
        locs: this.props.navigation.state.params.locs,
        locations: [this.props.navigation.state.params.locs]
      })  
    }
  }

  handleSearch = text => {
    this.setState({ search: text });
  }

  onOpenModal = () => {
    this.setState({ modalVisible: true });
  }

  onCloseModal = () => {
    this.setState({ modalVisible: false });
  }

  onCheckFilter = criteria => {
    const { filters } = this.state;

    if (!filters.includes(criteria)) {
      this.setState({ filters: [...filters, criteria] });
    } else {
      this.setState({ filters: filters.filter( c => c !== criteria) });
    }
  }

  onCheckLocation = criteria => {
    const { locations } = this.state;

    if (!locations.includes(criteria)) {
      this.setState({ locations: [...locations, criteria] });
    } else {
      this.setState({ locations: locations.filter( loc => loc !== criteria) });
    }
  }

  onSortChange = (value, index) => {
    this.setState({ sort: value });
  }

  onClear = () => {
    this.setState({ sort: 'rating', filters: [], locations: [] });
  }

  render() {
    this.handleNavigation();  

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ExploreModal
          modalVisible={this.state.modalVisible} 
          sort={this.state.sort} 
          filters={this.state.filters}
          locations={this.state.locations}
          onCheckFilter={this.onCheckFilter}
          onCheckLocation={this.onCheckLocation}
          onSortChange={this.onSortChange}
          onClear={this.onClear}
          onCloseModal={this.onCloseModal}
        />

        <View style={{ flexDirection: 'row' }}>
          <Icon onPress={this.onOpenModal} name='md-menu' size={scale(30)} color={'white'} style={{ backgroundColor: 'red', paddingLeft: scale(12), paddingTop: scale(10), paddingRight: scale(7) }} />
        	<SearchBar lightTheme inputStyle={{ backgroundColor: 'white' }} containerStyle={{ backgroundColor: 'red', width: scale(310), borderBottomColor: 'transparent', borderTopColor: 'transparent'}} onChangeText={this.handleSearch} placeholder="Search..." clearIcon />
        </View>

        {/*<VerticalStallsList sort={this.state.sort} filters={this.state.filters} locations={this.state.locations} search={this.state.search} stalls={stalls} navigation={this.props.navigation} />*/}
        { this.state.itemObj && this.state.stallObj &&
        <VerticalStallsList sort={this.state.sort} filters={this.state.filters} locations={this.state.locations} search={this.state.search} stalls={this.state.stallObj} items={this.state.itemObj} navigation={this.props.navigation} /> 
        }
      </View>
    );
  }
}
