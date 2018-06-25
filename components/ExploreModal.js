import React from 'react';
import { Modal, View, Text, FlatList, Picker, Button, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { filterCriterias, locationCriterias, sortCriterias } from '../constants/Test';

export default class ExploreModal extends React.Component {
  onCheckFilter = criteria => {
    this.props.onCheckFilter(criteria);
  }

  onCheckLocation = criteria => {
    this.props.onCheckLocation(criteria);
  }

  onSortChange = (value, index) => {
  	this.props.onSortChange(value, index);
  }

  onClear = () => {
  	this.props.onClear();
  }

	render() {
    const radio_props = sortCriterias.map(c => {
      return {label: c, value: c};
    });

		return (
			<Modal animationType='fade' onRequestClose={() => alert("Search") } visible={this.props.modalVisible}>
				<ScrollView>
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
          <FlatList
            data={locationCriterias}
            extraData={this.props}
            renderItem={({item: criteria}) => (
              <CheckBox
                title={criteria}
                onPress={() => this.onCheckLocation(criteria)}
                checked={this.props.locations.includes(criteria)}
              />
            )}
            keyExtractor={(item, index) => index.toString() }
          />

          <Text>Sort by:</Text>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={this.onSortChange}
            animation={false}
          />
          <Text>{'\n'}</Text>
          <Button title='Clear' onPress={this.props.onClear} />
          <Text>{'\n'}</Text>
          <Button title='Done' onPress={this.props.onCloseModal} />
        </ScrollView>
			</Modal>
		);
	}
}