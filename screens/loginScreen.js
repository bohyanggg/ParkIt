import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Alert } from 'react-native';

const Separator = () => <View style={styles.separator} />;

const LoginScreen = ({navigation}) => (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
        -To add ParkIt Logo 
        -To add TextInput field for username and password
        -To add button below for 'forgot password'
      </Text>
    </View>

    <Separator />
    
    <View style={styles.buttons}>
      <Button style={styles.navigators}
        title="Login"
        color="#800080"
        onPress={() => Alert.alert('Left button pressed')}
        //to change onpress to lead to main page
      />
      <Button style={styles.navigators}
        title="Sign Up"
        color="#800080"
        onPress={() => Alert.alert('Right button pressed')}
        //to change onpress to lead to sign up pages
      />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  navigators: {
    marginVertical: 8
  },
  buttons: {
    marginVertical: 8
  }
});

export default LoginScreen;