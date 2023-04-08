import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Html({ route }) {
  const { source } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        source={source}
        originWhitelist={['*']}
        style={styles.map}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
