import React from 'react';
import { Modal, View, Text, FlatList, Button } from 'react-native'
import { CheckBox } from 'react-native-elements';

import { preferenceCriterias } from '../constants/Test';

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;

export default class EditPreferencesModal extends React.Component {
	render () {
		return (
			<Modal animationType='fade' onRequestClose={() => alert("Search") } visible={this.props.modalVisible}>
				<View>
          <Text style={{ marginLeft: scale(18), marginTop: scale(10), fontSize: 18, color: 'black' }}>Preferences:</Text>
          <FlatList
            numColumns={2}
           	data={preferenceCriterias}
            extraData={this.props}
            renderItem={({item: preference}) => (
              <CheckBox
                checkedColor={'red'}
                title={preference}
                textStyle={{ fontWeight: 'normal' }}
                onPress={() => this.props.onCheckPreference(preference)}
                checked={this.props.preferences.includes(preference)}
                containerStyle={{ backgroundColor: 'white', borderColor: 'transparent', width: scale(150), paddingTop: 0, paddingBottom: 0 }}
              />
            )}
            keyExtractor={(item, index) => index.toString() }
          />
        </View>

        <View style={{ marginTop: 40, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Button title='     Save      ' color={'red'} onPress={this.props.handleSaveChanges} />
        </View>

        <View style={{ marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Button title='    Close    ' color={'red'} onPress={this.props.handleClose} />
        </View>
      </Modal>
		);
	}
}