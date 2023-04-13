import { StyleSheet, View, Text, Button, TextInput, SafeAreaView} from 'react-native'
import React from 'react'

const SearchHistoryScreen = ({navigation}) => {
  return (

      <SafeAreaView style={styles.container}>
        <View style={styles.buttons}>
          <Text>
            Lets do a hardcode of this screen.
          </Text>
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
        buttons: {
          marginVertical: 8,
          flexDirection:'row',
          paddingTop:20,
          },
      });

export default SearchHistoryScreen;
