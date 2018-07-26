import React from 'react';
import { ScrollView, Text, Button, View, Image } from 'react-native';

import EditItemModal from '../components/EditItemModal';
import VerticalReviewsList from '../components/VerticalReviewsList';

const _items = {
  item1: {
  	photoURL: null,
  	name: 'item',
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
  item2: {
  	 photoURL: null,
  	name: 'item',
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
  item3: {
  	photoURL: null,
  	name: 'item',
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
  item4: {
  	photoURL: null,
  	name: 'item',
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
  item5: {
  	photoURL: null,
  	name: 'item',
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
  item6: {
  	photoURL: null,
  	name: 'item',
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
  item7: {
  	photoURL: null,
  	name: 'item',
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
}

export default class StallOwnerItemScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false,
		}
	}

	handleSaveChanges = () => {
		this.setState({
			modalVisible: true
		})
	}

	handleClose = () => {
		this.setState({
			modalVisible: false,
		})
	}

	render() {
		const item = this.props.navigation.state.params.item
		const itemTags = item.tags.map((tag, index) => {
			return (
				<Text key={index} style={{ color: 'white', backgroundColor: 'red', marginRight: 5, marginTop: 5, borderRadius: 10, padding: 7 }}>{tag}</Text>
			);
		})

		return (
			<ScrollView style={{ backgroundColor: 'white' }}>
				<View style={{ borderBottomColor: '#d9dce0', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
					<Image source={{ uri: _items[item].photoURL }} style={{ height: 150, width: 400 }} />
					<Text style={{ color: 'black', fontSize: 28, paddingLeft: 20, marginTop: 15 }}>{_items[item].name}</Text>
					<Text style={{ fontSize: 16, paddingLeft: 20 }}>Rating: {_items[item].rating}</Text>
					<Text style={{ fontSize: 16, paddingLeft: 20 }}>Price: ${_items[item].price}</Text>
					
					<View style={{ flexDirection: 'row', paddingLeft: 20 }}>
						{itemTags}
					</View>

					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Button title='Edit Item' color={'red'} onPress={() => this.setState({ modalVisible: true })} />
					</View>
				</View>

				<EditItemModal 
					modalVisible={this.state.modalVisible}
					handleSaveChanges={this.handleSaveChanges} 
					handleClose={this.handleClose} 
				/>

				<VerticalReviewsList reviews={[]} />

				<Text>{'\n'}</Text>
			</ScrollView>
		);
	}
}