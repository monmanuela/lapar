import React from 'react'
import { View, Button } from 'react-native'

export default class SignUpScreen extends React.Component {
	render() {
		return (
			<View>
				<Button onPress={() => this.props.navigation.navigate('NormalSignUp')} title='Normal User' />
				<Button onPress={() => this.props.navigation.navigate('StallOwnerSignUp')} title='Stall Owner' /> 
			</View>
		);
	}
}