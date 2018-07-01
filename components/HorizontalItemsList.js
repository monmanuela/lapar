import React from 'react';
import { FlatList, Text, TouchableWithoutFeedback, Image, View } from 'react-native';
import { Card } from 'react-native-elements';

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;

export default class HorizontalItemsList extends React.Component {
  render() {
    return (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.props.items}
          renderItem={({ item: rowData }) => {
            return (
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Item', {item: rowData})}>
                <Card
                  title={null}
                  containerStyle={{ backgroundColor: 'red', padding: 0, width: scale(120), height: verticalScale(200), marginLeft: scale(5), marginRight: scale(5) }}
                >
                  <Image source={{ uri: rowData.photoURL }} style={{ width: scale(120), height: verticalScale(100)}} />
                    <View style={{ paddingLeft: scale(5), opacity: 0.7 }}>
                      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{rowData.name}</Text>
                      <Text style={{ color: 'white' }}>Rating: {rowData.rating}</Text>
                      <Text style={{ color: 'white' }}>Price: ${rowData.price}</Text>
                    </View>
                </Card>
              </TouchableWithoutFeedback>
            );
          }}
          keyExtractor={(item, index) => index.toString() }
        />
    );
  }
} 