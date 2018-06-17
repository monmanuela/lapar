import React from 'react';
import { Modal, View, Text } from 'react-native';

export default class ExploreModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,//this.props.modalVisible,
			filter = [],
			sort = ''
		}
	}

	render() {
		return (
			<Modal visible={this.state.modalVisible}>
				<View>
					<TouchableHighlight>
						<Text>Search</Text>
					</TouchableHighlight>
					<TouchableHighlight>
						<Text>Cancel</Text>
					</TouchableHighlight>
				</View>
			</Modal>
		);
	}
}