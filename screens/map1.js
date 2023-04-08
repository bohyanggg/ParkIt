import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Map({ route }) {

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
});
