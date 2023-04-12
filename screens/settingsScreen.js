// can just implement user profile and logout
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { auth } from '../firebase/firebaseconfig';

const SettingsScreen = ({navigation}) => {
  
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
          <View style={styles.navigators}>
            <Text>
              This is the settings page
            </Text>
            <Button
              title="Profile Page"
              color="#5D0EEA"
              onPress={() => { navigation.navigate("Profile") }}
            />
            <Text>
              The account you are in: {auth.currentUser?.email} 
            </Text>
            <Button
              title="Sign Out"
              color="#5D0EEA"
              onPress={handleSignOut}
              //onPress={() => { navigation.navigate("Login") }}
            />
          </View>
    </View>
      
      );}
      
      const styles = StyleSheet.create({
        container: {
          flex: 1000,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center'
          },
        navigators: {
          marginVertical: 2,
          paddingHorizontal:'20%',
          flex: 1,
          },
        buttons: {
          marginVertical: 8,
          flexDirection:'row',
          paddingTop:20,
          },
      });

export default SettingsScreen;
