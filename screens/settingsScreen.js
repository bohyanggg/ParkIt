// can just implement user profile and logout
import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
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

  const user = auth.currentUser;
  if (user != null) {
    //can use these for the user profile

    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }

  return (
    <View style={styles.container}>
      <View style = {styles.titleview} >
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style = {{    alignItems: 'center',justifyContent: 'center',}}>
        <View style={{ paddingBottom: 20 }}>
          <Image source={require('../assets/images/manuser.png')} style={styles.image} />
        </View>
        <View style={styles.navigators}>

          <Button
            title="Edit Profile Info"
            color="#5D0EEA"
            onPress={() => { navigation.navigate("Profile") }}
          />
          <Text>
            The account you are in: {user?.email}
          </Text>
          <Text>
            The user's display name is {user?.displayName}, uid is {user?.uid}
          </Text>
          <Button
            title="Sign Out"
            color="#5D0EEA"
            onPress={handleSignOut}
          //onPress={() => { navigation.navigate("Login") }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  navigators: {
    marginVertical: 2,
    paddingHorizontal: '20%',
    //flex: 1,
  },
  buttons: {
    marginVertical: 8,
    flexDirection: 'row',
    paddingTop: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    // backgroundColor: '#0a9',
    padding: 5,
    marginBottom: 20,
    fontWeight: 'bold',
    
  },
  titleview:{
    padding:50,
    paddingBottom: 100,

    
  }
});

export default SettingsScreen;
