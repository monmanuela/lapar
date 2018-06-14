import React from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors.js';

export default () => <Swiper showsButtons>
  <View style={ styles.container }>
    <Text>Item 1</Text>
  </View>
  <View style={ styles.container }>
    <Text>Item 2</Text>
  </View>
  <View style={ styles.container }>
    <Text>Item 3</Text>
  </View>
</Swiper>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.swiperBackground  	
  }
});