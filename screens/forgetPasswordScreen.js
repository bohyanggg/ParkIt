import { StyleSheet, View, Text, Button, TextInput, SafeAreaView,Image} from 'react-native'
import React from 'react'

const Separator = () => <View style={styles.separator} />;

const ForgetPasswordScreen = ({navigation}) => {
  return (

      <SafeAreaView style={styles.container}>
      <View>
        <View style={{ paddingBottom:20}}>
          <Image source={require('../assets/images/ParkItlogo.png')} style={styles.image} />
          <Text style={styles.emailTextStyleStyle}>
                 Enter your Username
               </Text>
        </View>
      
        <View>

          <View style={{ paddingTop:20}} >
            <TextInput placeholderTextColor='grey' placeholder='Username' />
          </View>
          <Separator />
        </View>
      </View>
      
      <View style={styles.buttons}>
            <View style={styles.navigators}>
              <Button
                title="Change Password"
                color="#5D0EEA"
                 
                onPress={() => { navigation.navigate("SignUp3") }}
              />
            </View>
          </View>
      
      <View style={styles.navigators}>
       
        </View>
      
      
      </SafeAreaView>
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
