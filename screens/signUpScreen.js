import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Text, Button, Image, TextInput, Alert, Pressable, TouchableWithoutFeedback, TouchableOpacity, Keyboard, SafeAreaView, } from 'react-native';
import { auth } from '../firebase/firebaseconfig';
import { createUserWithEmailAndPassword } from "firebase/auth";

const Separator = () => <View style={styles.separator} />;

const SignUpScreen = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("MainContainer")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {  
    //const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log("Registered with: ", user.email);
      })
      .catch(error => alert(error.message))
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={{ paddingBottom:20}}>
            <Image source={require('../assets/images/ParkItlogo.png')} style={styles.image} />
          </View>

          <KeyboardAvoidingView> 
            <Text style={{ paddingBottom:20 }}>
                  Enter your email address and password
            </Text>

            <View styles={styles.textInputStyling}>
              <TextInput
                placeholderTextColor='grey'
                placeholder='Email'
                value = {email}
                onChangeText = {text => setEmail(text)}
              />
            </View>
            <Separator />
            <View style={{ paddingTop:20}} >
              <TextInput
                placeholderTextColor='grey'
                placeholder='Password'
                secureTextEntry
                value = {password}
                onChangeText = {text => setPassword(text)}
              />
            </View>
            <Separator />
          </KeyboardAvoidingView>
        </View>

        <View style={styles.buttons}>
            <View style={styles.navigators}>
              <Button
                title="Sign Up"
                color="#5D0EEA"
                onPress={() => { handleSignUp(); Alert.alert('Successfully signed up'); }}
              />
            </View>
        </View>

        <View style={styles.navigators}>
      
        </View>


      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
container: {
  flex: 1000,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center'
},
// title: {
//   textAlign: 'center',
//   marginVertical: 8,
// },
separator: {
  //marginVertical: 8,
  borderBottomColor: '#737373',
  borderBottomWidth: StyleSheet.hairlineWidth,
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
image: {
  margin: 20,
  padding: 16,
},


textInputStyling: {
  borderWidth: 1,
  justifyContent: 'center',
},
forgotPasswordStyle: {
  color: '#5D0EEA',
  fontSize: 10,
  textAlign: 'right',
},
forgotPasswordViewStyle: {
  width: '52%',
  paddingTop:10,

}
});


export default SignUpScreen;
