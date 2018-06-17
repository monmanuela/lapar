import React from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Colors from '../constants/Colors';
// import { StackNavigator } from 'react-navigation';
import Item from './Item';

export default class HorizontalItemsSwiper extends React.Component {

  render() {
    let items = this.props.items;
    let _SwiperItems;
    if (this.props.context === 'recom') {
      _SwiperItems = items.filter(item => item.recom)
    } else if (this.props.context === 'top 10') {
      _SwiperItems = items.filter(item => item.rank <= 10)
    } else {
      _SwiperItems = items;
    }

    const SwiperItems = _SwiperItems.map((_item, index) => {
      return (
        <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.swiperBackground }}>
          <Item item={_item} onPress={() => this.props.navigation.navigate('Item', {item: _item})} />
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