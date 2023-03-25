import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const ForgetPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text>forgetPasswordScreen</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default ForgetPasswordScreen;