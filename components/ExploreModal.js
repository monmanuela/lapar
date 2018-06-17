import React from 'react';
import { Modal, View, Text } from 'react-native';

export default class ExploreModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: this.props.modalVisible,
			filter = [],
			sort = ''
		}
	}

	onSearch = () => {
		
	}

	render() {
		return (
			<Modal visible={this.state.modalVisible}>
				<View>
					<TouchableHighlight onPress={this.onSearch}>
						<Text>Search</Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={this.onCancel}>
						<Text>Cancel</Text>
					</TouchableHighlight>
				</View>
			</Modal>
		);
	}
}