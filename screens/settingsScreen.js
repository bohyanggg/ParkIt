// can just implement user profile and logout
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
          <View style={styles.navigators}>
            <Text>
              This is the settings page
            </Text>
            <Button
              title="Button"
              color="#5D0EEA"
              onPress={() => { navigation.navigate("Map") }}
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
