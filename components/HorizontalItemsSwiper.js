import React from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

import Colors from '../constants/Colors';

export default class HorizontalItemsSwiper extends React.Component {

  render() {
    let items = this.props.items;
    let _SwiperItems = Object.values(items);

    const SwiperItems = _SwiperItems.map((item, index) => {
      console.log("idx: " + index)
      console.log("item: " + JSON.stringify(item))
      return (
        <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.swiperBackground }}>
          <Text onPress={() => this.props.navigation.navigate('Item', {item: item})}>{item.name}</Text>
        </View>
      );
    })

    return (
      <Swiper showsButtons>
        { SwiperItems }
      </Swiper>
    );
  }
}