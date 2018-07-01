import React from 'react';
import { Modal, View, Text, FlatList, Picker, ScrollView } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { filterCriterias, locationCriterias, sortCriterias } from '../constants/Test';

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;

export default class ExploreModal extends React.Component {
  constructor() {
    super();
    this.state = {
      sort: 0
    }
  }

  onCheckFilter = criteria => {
    this.props.onCheckFilter(criteria);
  }

  onCheckLocation = criteria => {
    this.props.onCheckLocation(criteria);
  }

  onSortChange = (value, index) => {
    this.setState({ sort: index })
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
				<View>
          <Text style={{ marginLeft: scale(18), marginTop: scale(10), fontSize: 18, color: 'black' }}>Filter:</Text>
          <FlatList
            numColumns={2}
           	data={filterCriterias}
            extraData={this.props}
            renderItem={({item: criteria}) => (
              <CheckBox
                checkedColor={'red'}
                title={criteria}
                textStyle={{ fontWeight: 'normal' }}
                onPress={() => this.onCheckFilter(criteria)}
                checked={this.props.filters.includes(criteria)}
                containerStyle={{ backgroundColor: 'white', borderColor: 'transparent', width: scale(150), paddingTop: 0, paddingBottom: 0 }}
              />
            )}
            keyExtractor={(item, index) => index.toString() }
          />
          <Text style={{ marginLeft: scale(18), marginTop: scale(5), fontSize: 18, color: 'black' }}>Location:</Text>
          <FlatList
            numColumns={2}
            data={locationCriterias}
            extraData={this.props}
            renderItem={({item: criteria}) => (
              <CheckBox
                checkedColor={'red'}
                title={criteria}
                textStyle={{ fontWeight: 'normal' }}
                onPress={() => this.onCheckLocation(criteria)}
                checked={this.props.locations.includes(criteria)}
                containerStyle={{ backgroundColor: 'white', borderColor: 'transparent', width: scale(150), paddingTop: 0, paddingBottom: 0 }}
              />
            )}
            keyExtractor={(item, index) => index.toString() }
          />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginBottom: scale(5), fontSize: 18, color: 'black' }}>Sort by:</Text>
            <RadioForm
              buttonColor={'red'}
              selectedButtonColor={'red'}
              buttonSize={15}
              radio_props={radio_props}
              initial={this.state.sort}
              onPress={this.onSortChange}
              animation={false}
            />
            <Button 
              textStyle={{ fontSize: 14, fontWeight: 'bold' }} 
              buttonStyle={{ marginTop: 15, marginBottom: 10, borderRadius: 2, width: scale(70), backgroundColor: 'red', padding: 10}} 
              title='CLEAR' 
              onPress={this.props.onClear} />
            <Button 
              textStyle={{ fontSize: 14, fontWeight: 'bold' }} 
              buttonStyle={{ marginBottom: 25, borderRadius: 2, width: scale(70), backgroundColor: 'red', padding: 10}} 
              title='DONE' 
              onPress={this.props.onCloseModal} />
          </View>
        </View>
			</Modal>
		);
	}
}