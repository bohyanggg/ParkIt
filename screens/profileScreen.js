//can leave out the user image
//fetch user info from database
import { StyleSheet, View, Text, Button, TextInput, SafeAreaView,Image} from 'react-native'
import React from 'react'

const Separator = () => <View style={styles.separator} />;

const ProfileScreen = ({navigation}) => {
  return (

      <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={styles.emailTextStyleStyle}>
                 Full Name
               </Text>
        </View>
      
        <View>
          <View>
            <TextInput placeholderTextColor='grey' placeholder='Full Name' />
          </View>
          <Separator />
        </View>
      </View>

      <View>
        <View>
          <Text style={styles.emailTextStyleStyle}>
                 Email Address
               </Text>
        </View>
      
        <View>
          <View>
            <TextInput placeholderTextColor='grey' placeholder='Email Address' />
          </View>
          <Separator />
        </View>
      </View>

      <View>
        <View>
          <Text style={styles.emailTextStyleStyle}>
                 Phone Number
               </Text>
        </View>
      
        <View>
          <View>
            <TextInput placeholderTextColor='grey' placeholder='Phone Number' />
          </View>
          <Separator />
        </View>
      </View>

      <View style={styles.buttons}>
            <View style={styles.navigators}>
              <Button
                title="Save"
                color="#5D0EEA"
                onPress={() => { navigation.navigate("Map") }}
              />
            </View>
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
      marginVertical: 8,
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

export default ProfileScreen;
