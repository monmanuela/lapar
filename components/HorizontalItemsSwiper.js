import React from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

import Colors from '../constants/Colors';

export default class HorizontalItemsSwiper extends React.Component {

  render() {
    let items = this.props.items;
    let _SwiperItems;
    if (this.props.context === 'recom') {
      _SwiperItems = Object.values(items).filter(item => item.recom)
    } else if (this.props.context === 'top 10') {
      _SwiperItems = Object.values(items).filter(item => item.rank <= 10)
    } else {
      _SwiperItems = Object.values(items);
    }

    const SwiperItems = _SwiperItems.map((item, index) => {
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