import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';

import { Dimensions } from 'react-native';
import firebase from 'react-native-firebase';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;

const _items = {
  item1: {
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
  item2: {
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
  item3: {
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
  item4: {
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
  item5: {
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
  item6: {
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
  item7: {
    price: 1,
    rating: 1,
    tags: ['a', 'b']
  },
}

export default class VerticalItemsList extends React.Component {
	render() {
    const items = this.props.items.map((item, index) => {
      return(
        <Card key={index}>
        	<View style={{ flexDirection: 'row' }}>
            <View style={{ width: scale(270) }}>
              <Text style={{ color: 'black', fontSize: 16 }}>
                {item.name}
              </Text>
              <Text style={{ color: 'gray', fontSize: 14 }}>
                Rating: {item.rating}
              </Text>
              <Text style={{ color: 'gray', fontSize: 14 }}>
                Price: ${item.price}
              </Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
              <Icon name='ios-arrow-forward' size={25} color={'grey'} onPress={() => this.props.navigation.navigate('EditItem', { item: item })} />
          	</View>
          </View>
        </Card>
      )
    });

    return (
      <View style={{ zIndex: -1 }} >
        {items}
      </View>
    );
  }
}