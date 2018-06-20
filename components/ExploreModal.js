import React from 'react';
import { Modal, View, Text, FlatList, Picker, Button } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { filterCriterias } from '../constants/Test';

export default class ExploreModal extends React.Component {
  onCheckFilter = criteria => {
    this.props.onCheckFilter(criteria);
  }

  onSortChange = (value, index) => {
  	this.props.onSortChange(value, index);
  }

  onClear = () => {
  	this.props.onClear();
  }

	render() {
		return (
			<Modal animationType='fade' onRequestClose={() => alert("Search") } visible={this.props.modalVisible}>
				<View>
          <Text>Filter:</Text>
          <FlatList
           	data={filterCriterias}
            extraData={this.props}
            renderItem={({item: criteria}) => (
              <CheckBox
                title={criteria}
                onPress={() => this.onCheckFilter(criteria)}
                checked={this.props.filters.includes(criteria)}
              />
            )}
            keyExtractor={(item, index) => index.toString() }
          />

          <Text>Sort by:</Text>
          <Picker
            selectedValue={this.props.sort}
            onValueChange={this.onSortChange}
          >
            <Picker.Item label='Rating' value='rating' />
            <Picker.Item label='Price' value='price' />
          </Picker>

          <Button title='Clear' onPress={this.props.onClear} />
          <Text>{'\n'}</Text>
          <Button title='Done' onPress={this.props.onCloseModal} />
        </View>
			</Modal>
		);
	}
}