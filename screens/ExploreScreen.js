import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import VerticalStallsList from '../components/VerticalStallsList';
import { stalls } from '../constants/Test';
import ExploreModal from '../components/ExploreModal'

export default class ExploreScreen extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		search: '',
      modalVisible: false,
      sort: 'rating',
      filters: [],
      locations: this.props.navigation.state.params === undefined ? [] : [this.props.navigation.state.params.locs],
      locs: this.props.navigation.state.params === undefined ? '' : this.props.navigation.state.params.locs
  	}
  }

  handleNavigation = () => {
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
          <Icon onPress={this.onOpenModal} name='md-menu' size={40} color={'white'} style={{ backgroundColor: 'red', paddingLeft: 10, paddingTop: 8, paddingRight: 5 }} />
        	<SearchBar lightTheme inputStyle={{ backgroundColor: 'white' }} containerStyle={{ backgroundColor: 'red', width: 340, borderBottomColor: 'transparent', borderTopColor: 'transparent'}} onChangeText={this.handleSearch} placeholder="Search..." clearIcon />
        </View>

        <VerticalStallsList sort={this.state.sort} filters={this.state.filters} locations={this.state.locations} search={this.state.search} stalls={stalls} navigation={this.props.navigation} />
      </View>
    );
  }
}
