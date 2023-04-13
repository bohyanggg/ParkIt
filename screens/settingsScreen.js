import React from 'react'
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';
import { auth } from '../firebase/firebaseconfig';
import Ionicons from 'react-native-vector-icons/Ionicons'

const SettingsScreen = ({ navigation }) => {

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <View style={styles.flexboxcontainer}>
        <Pressable style={styles.boxes}>
          <Ionicons name={'notifications-circle-outline'} size={40} color="white" padding='10%' />
          <Text style={styles.itemcolor}>
            Notifications
          </Text>
        </Pressable>
        <Pressable style={styles.boxes} onPress={() => { navigation.navigate("Profile") }}>
          <Ionicons name={'person-circle-outline'} size={40} color="white" padding='10%'/>
          <Text style={styles.itemcolor}>
            Profile
          </Text>
        </Pressable>
      </View>

      <View style={styles.flexboxcontainer}>
        <Pressable style={styles.boxes}>
          <Ionicons name={'language-outline'} size={40} color="white" padding='10%' />
          <Text style={styles.itemcolor}>
            Language
          </Text>
        </Pressable>
        <Pressable style={styles.boxes}>
          <Ionicons name={'reader-outline'} size={40} color="white" padding='10%'/>
          <Text style={styles.itemcolor}>
            Terms of Use
          </Text>
        </Pressable>
      </View>

      <View style={styles.flexboxcontainer}>
        <Pressable style={styles.boxes}>
          <Ionicons name={'information-circle-outline'} size={40} color="white" padding='10%'/>
          <Text style={styles.itemcolor}>
            Privacy Policy
          </Text>
        </Pressable>
        <Pressable style={styles.boxes} onPress={handleSignOut}>
          <Ionicons name={'power-outline'} size={35} color="white" padding='10%'/>
          <Text style={styles.itemcolor}>
            Log Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 2,
    flexDirection: 'column',
    paddingHorizontal: '5%',
  },

  flexboxcontainer: {
    flex: 1,
    flexDirection: 'row',
  },
  boxes: {
    padding: '5%',
    margin: '3%',
    flex: 1,
    backgroundColor: "#5D0EEA",
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemcolor: {
    color: '#fff',
    fontSize: 18
  },

  buttons: {
    marginVertical: 8,
    flexDirection: 'row',
    paddingTop: 20,
  },

});

export default SettingsScreen;
