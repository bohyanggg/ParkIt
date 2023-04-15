import React from 'react';
import { WebView } from 'react-native-webview';
import { KeyboardAvoidingView, StyleSheet, Text, View, Button, SafeAreaView, Alert, TextInput, Image, Pressable, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

export default function Map({ route, navigation }) {

  const { start, end } = route.params;
  const url = `https://www.google.com/maps/dir/${start}/${end}?hl=en`;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  navigators: {
    marginVertical: 2,
    paddingHorizontal:'20%',
    flex: 1,
  },
});


