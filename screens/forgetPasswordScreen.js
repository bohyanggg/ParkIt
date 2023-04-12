import { StyleSheet, View, Text, Button, TextInput, SafeAreaView, Image, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/firebaseconfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const Separator = () => <View style={styles.separator} />;

const ForgetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const resetUserPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
      setError(null);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('User not found');
      } else {
        setError('There was a problem with your request');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={{ paddingBottom:20}}>
            <Image source={require('../assets/images/ParkItlogo.png')} style={styles.image} />
          </View>
        
          <View>
            <View>
              {error && <Text style={styles.error}>{error}</Text>}
              <Text style={styles.header}> Enter your email </Text>
              
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="Email address"
                autoCapitalize="none"
                placeholderTextColor='grey'
              />
            </View>
            <Separator />
          </View>
        </View>
        
        <View style={styles.buttons}>
              <View style={styles.navigators}>
              {submitted ? (<Text>Please check your junk email for a reset password link.</Text>) : (
                <>
                  <Button
                    title="Reset Password"
                    color="#5D0EEA"
                    onPress={resetUserPassword}
                    disabled={!email}
                  />
                </>
              )}
              </View>
            </View>
        
        <View style={styles.navigators}>
          <Button 
              title="Back to Login"
              color="#5D0EEA"
              onPress={() => { navigation.navigate("Login") }}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );}
      
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

      error: {
        marginBottom: 20,
        color: 'red',
      },

      header: {
        paddingBottom: 20,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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

export default ForgetPasswordScreen;
