import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Text, Button, Image, TextInput, Alert, Pressable, TouchableWithoutFeedback, TouchableOpacity, Keyboard, SafeAreaView, } from 'react-native';
import { auth, db } from '../firebase/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const Separator = () => <View style={styles.separator} />;

const SignUpScreen = ({ navigation }) => {

  const [fullname, setfullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('');

  const createUserDocument = async (user, additionalData) => {
    if (!user) return;

    if (user) {
      try {
        console.log('reached here');
        await setDoc(doc(db, "users", user.uid), {
          fullName: additionalData,
          email: user.email,
          createdAt: new Date(),
        });
      } catch (error) {
        console.log("Error in creating user", error);
      }
    }
  
  };

  const handleSignUp = async () => {
    try {
      if (password == confirmpassword) {
        await createUserWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Registered with: ", user.email);
            sendEmailVerification(auth.currentUser);
            alert('Verification mail has been sent to your email')
            createUserDocument(user, fullname);
            navigation.replace("Login")
          })
          .catch(error => {alert(error.message)})

      } else {
        alert("Passwords dont match");
      }

    } catch (error) {
      const errorCode = error.code;
      let errorMessage;
      switch (errorCode) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/weak-password":
          errorMessage =
            "Password must have minimum of eight characters, at least one letter and one number";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email";
          break;
        default:
          errorMessage = "Something went wrong";
          break;
      } 
      return { error: errorMessage };
    }
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
                  Enter your account details!
            </Text>

            <View styles={styles.textInputStyling}>
              <TextInput
                placeholderTextColor='grey'
                placeholder='Full Name'
                autoCapitalize='none'
                autoCorrect={false}
                value = {fullname}
                onChangeText = {text => setfullname(text)}
              />
            </View>
            <Separator />

            <View style={{ paddingTop:20}}>
              <TextInput
                placeholderTextColor='grey'
                placeholder='Email'
                autoCapitalize='none'
                autoCorrect={false}
                value = {email}
                onChangeText = {text => setEmail(text)}
              />
            </View>
            <Separator />

            <View style={{ paddingTop:20}} >
              <TextInput
                placeholderTextColor='grey'
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                value = {password}
                onChangeText = {text => setPassword(text)}
              />
            </View>
            <Separator />
            <View style={{ paddingTop:20}} >
              <TextInput
                placeholderTextColor='grey'
                placeholder='Confirm password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                value = {confirmpassword}
                onChangeText = {text => setconfirmpassword(text)}
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
                onPress={() => { handleSignUp() }}
              />
            </View>
        </View>

        <View style={styles.navigators}>
          <Text style={{textAlign:'center', paddingTop: 20}}>
            Already got an account?
          </Text>
            <Button 
              title="Login instead"
              color="#5D0EEA"
              onPress={() => { navigation.replace("Login") }}
            />
        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  separator: {
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
