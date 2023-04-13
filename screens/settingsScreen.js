import React from 'react'
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';
import { auth } from '../firebase/firebaseconfig';

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
          <Text>
            Notifications
          </Text>
        </Pressable>
        <Pressable style={styles.boxes} onPress={() => { navigation.navigate("Profile") }}>
          <Text>
            Profile
          </Text>
        </Pressable>
      </View>

      <View style={styles.flexboxcontainer}>
        <Pressable style={styles.boxes}>
          <Text>
            Language
          </Text>
        </Pressable>
        <Pressable style={styles.boxes}>
          <Text>
            Terms of Use
          </Text>
        </Pressable>
      </View>

      <View style={styles.flexboxcontainer}>
        <Pressable style={styles.boxes}>
          <Text>
            Privacy Policy
          </Text>
        </Pressable>
        <Pressable style={styles.boxes} onPress={handleSignOut}>
          <Text>
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
    backgroundColor: "#5D0EEA"
  },

  buttons: {
    marginVertical: 8,
    flexDirection: 'row',
    paddingTop: 20,
  },

});

export default SettingsScreen;
