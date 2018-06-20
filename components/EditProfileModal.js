import React from 'react';
import { Modal, Text, View, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements'

export default class EditProfileModal extends React.Component {
  render() {
    return(
      <Modal animationType='fade' onRequestClose={() => alert("Edit") } visible={this.props.modalVisible}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <View style={{alignItems: 'center'}}>
              { this.props.currentUser &&
                <Avatar
                  size="300"
                  rounded
                  source={this.props.currentUser && {uri: this.props.currentUser.photoURL}}
                  onPress={() => console.log("Change picture?")}
                  activeOpacity={0.7}
                />
              }
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text>Name: </Text>
              <TextInput
                style={styles.textInput}
                placeholder = { this.props.displayName }
                onChangeText = { displayName => this.props.onChangeDisplayName(displayName) }
                value = { this.props.displayName === '' ? this.props.displayName : this.props.displayName }
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text>Username: </Text>
              <TextInput
                style={styles.textInput}
                placeholder = { this.props.username }
                onChangeText = { username => this.props.onChangeUsername(username) }
                value = { this.props.username }
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text>Email: </Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder = { this.props.email }
                onChangeText = { email => this.props.onChangeEmail(email) }
                value = { this.props.email }
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text>Bio: </Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder= {this.props.bio === '' ? "About yourself" : this.props.bio}
                onChangeText={ bio => this.props.onChangeBio(bio)}
                value={this.props.bio}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text>Preferences: </Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder= {this.props.preferences === '' ? "Preferences" : this.props.preferences}
                onChangeText={ pref => this.props.onChangePreferences(pref)}
                value={this.props.preferences}
              />
            </View>

            <Button title='Save' onPress={this.props.handleSaveChanges} />
            <Button title='Close' onPress={this.props.handleClose} />

          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '70%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
