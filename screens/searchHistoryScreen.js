//can skip this screen if we dont have time - not an essential component

import { StyleSheet, View, Text, Button, TextInput, SafeAreaView} from 'react-native'
import React from 'react'

const SearchHistoryScreen = ({navigation}) => {
  return (

      <SafeAreaView style={styles.container}>
      <View style={styles.buttons}>
            <View style={styles.navigators}>
              <Button
                title="Button"
                color="#5D0EEA"
                onPress={() => { navigation.navigate("Map") }}
              />
            </View>
      </View>
      
      </SafeAreaView>
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

export default SearchHistoryScreen;
