import { StyleSheet, View, FlatList, Text, TextInput, SafeAreaView, Pressable} from 'react-native'
import { useRoute } from '@react-navigation/native';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HistoryItem from './historyItem';
import {  addToHistory,historyState,history } from './history'


const SearchHistoryScreen = ({navigation}) => {
  
function pressHandler(){
  addToHistory("history");
  console.log(history);
}
function onGoHandler(text){
  navigation.replace("MainContainer");
  console.log(text);
}
  return (

      <SafeAreaView style={styles.container}>

      <View style={styles.goalsContainer}>
     <Pressable  title='Search History'/>
        <FlatList
          data={history}
          renderItem={(itemData) => {
            return (
              <HistoryItem text={itemData.item} onGo={onGoHandler}  id={Math.random().toString()} />
            );
          }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        />
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
          goalText: {
            padding: 8,
            //borderRadius: 600,
            color: 'purple',
          },
      });

export default SearchHistoryScreen;
