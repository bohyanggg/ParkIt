import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Button, SafeAreaView, Alert, TextInput, Image, Pressable, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/firebaseconfig';
import { signInWithEmailAndPassword } from "firebase/auth";

const Separator = () => <View style={styles.separator} />;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isVerified = () => {
    return ( auth.currentUser !== null && auth.currentUser.emailVerified !== false ) ? true : false;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (isVerified()) {
        navigation.replace("MainContainer")
      }
    })
    return unsubscribe
  }, [])

  const handleLogin = () => {  
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
        if (!isVerified()) {
          Alert.alert('Please verify your email before signing in.');
        }
        else if (isVerified()) {
          navigation.replace("MainContainer")
        }
      })
      .catch(error => alert(error.message))
  }
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={{ paddingBottom:20, paddingTop:120}}>
            <Image source={require('../assets/images/ParkItlogo.png')} style={styles.image} />
          </View>

          <KeyboardAvoidingView> 
            <View styles={styles.textInputStyling}>
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
          </KeyboardAvoidingView>
        </View>

        <View style={styles.forgotPasswordViewStyle}>
          <Pressable onPress={() => navigation.navigate("ForgetPassword")}>
            <Text style={styles.forgotPasswordStyle}>
              Forgot Password?
            </Text>
          </Pressable>
        </View>

        <View style={styles.buttons}>
          <View style={styles.navigators}>
            <Button
              title="Login"
              color="#5D0EEA"
              onPress={handleLogin}
            />
         <Button
              title="Map Overview"
              color="#5D0EEA"
              onPress={() => { navigation.navigate('Sample List of Car Parks', { source: require('./2.html') }); }}
          /> 

         <Button
            title="Sample Direction"
            color="#5D0EEA"
            onPress={() => { navigation.navigate('mapWithoutLogin', { start: '1.3462650062349506, 103.68158398053207', end: '1.2999593486272893, 103.84275231084348' }); }}
            /> 
          </View>
        </View>

        <View style={styles.navigators}>
          <Pressable
              color="#5D0EEA"
              onPress={() => { navigation.replace("SignUp") }}
          >
            <Text style={styles.forgotPasswordStyle}>
              Or Sign Up
            </Text>
          </Pressable>
        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
} 

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

export default LoginScreen;
