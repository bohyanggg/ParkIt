import React from 'react';
//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Alert, TextInput, Image, Pressable } from 'react-native';
//import { useState } from 'react';



const Separator = () => <View style={styles.separator} />;

/*
-error, invalid hook
const [enteredPasswordText, setEnteredPasswordText] = useState('Password') //declare password object
const [enteredNameText, setEnteredNameText] = useState('Username')  //declare username object
function nameInputHandler(enteredText) {  //set function to mutate username
  setEnteredNameText(enteredText);
}
function passwordInputHandler(enteredText) {  //set function to mutate password
  setEnteredPasswordText(enteredText);
}
function loginHandler(){  //login handler will take in username and password on button press login, and send to dashboard
  if(enteredNameText==='' || enteredPasswordText===''){
    console.log('Invalid');
  }
  else{
    console.log('Valid');
  }
}*/



const LoginScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View>
      <View>
        <Image source={require('../assets/images/ParkItlogo.png')} style={styles.image} />
      </View>
      <View styles={styles.textInputLayout}>
        <View styles={styles.textInputStyling}>
          <TextInput placeholderTextColor='grey' placeholder='Input Username' />
        </View>
        <View >
          <TextInput placeholderTextColor='grey' placeholder='Input Password' />
        </View>
      </View>
    </View>



    <View style={styles.buttons}>
      <View style={styles.navigators}>
        <Button
          title="Login"
          color="#800080"
          onPress={() => Alert.alert('Left button pressed')}
        //to change onpress to lead to main page
        />
      </View>
      <View style={styles.navigators}>
        <Button
          title="Sign Up"
          color="#800080"
          onPress={() => Alert.alert('Right button pressed')}
        //to change onpress to lead to sign up pages
        />
      </View>
      <Separator/>
      <View>
        <Pressable>
          <Text style={styles.forgotPasswordStyle}>
            Forgot Password?
          </Text>
        </Pressable>
        
        
      </View>
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
    marginVertical: 2
  },
  buttons: {
    marginVertical: 8
  },
  image: {
    width: 200,
    height: 100,
    margin: 20,
    padding: 16,
  },
  textInputLayout: {
    flexDirection: 'row',
    //flex:1,
    margin: 5,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#cccccc',
    loginButton: {
      border: 3,
      backgroundColor: 'blue',
      padding: 20,

    }
  },
  textInputStyling: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 16,
    margin: 5,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
  },
  forgotPasswordStyle:{
    color:'purple',
    fontSize:10,
  }
});


export default LoginScreen;
