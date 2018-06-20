import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import VerticalItemsList from '../components/VerticalItemsList';
import { items } from '../constants/Test';
import ExploreModal from '../components/ExploreModal'

export default class ExploreScreen extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		search: '',
      modalVisible: false,
      sort: 'rating',
      filters: []
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

  onSortChange = (value, index) => {
    this.setState({ sort: value });
  }

  onClear = () => {
    this.setState({ sort: 'rating', filters: [] })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ExploreModal
          modalVisible={this.state.modalVisible} 
          sort={this.state.sort} 
          filters={this.state.filters}
          onCheckFilter={this.onCheckFilter}
          onSortChange={this.onSortChange}
          onClear={this.onClear}
          onCloseModal={this.onCloseModal}
        />

        <View>
        	<SearchBar onChangeText={this.handleSearch} placeholder="Search..." clearIcon />
        </View>

        <TouchableHighlight onPress={this.onOpenModal}>
          <Text>Criteria</Text>
        </TouchableHighlight>

        <VerticalItemsList sort={this.state.sort} filters={this.state.filters} search={this.state.search} items={items} navigation={this.props.navigation} />
      </View>
    );
  }
}

        // View>
        //   <Icon name='navicon'/>
        // </View>