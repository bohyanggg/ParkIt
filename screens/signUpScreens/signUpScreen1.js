import { StyleSheet, View, Text, Button, Image, TextInput, Pressable, SafeAreaView, } from 'react-native';
import React from 'react';

const Separator = () => <View style={styles.separator} />;

const SignUpScreen1 = ({ navigation }) => (
//     <SafeAreaView style={styles.container}>
//      <View>
//       <View style={{ paddingBottom: 20 }}>
//         <Image source={require('../../assets/images/ParkItlogo.png')} style={styles.image} />
//       </View>

//       <View style={styles.emailPaddingStyleStyle}>
//         <Text style={styles.emailTextStyleStyle}>
//           Enter your email address
//         </Text>
//       </View>
//      </View>
//       <View styles={styles.textInputStyling}>
//         <TextInput placeholderTextColor='grey' placeholder='Email Address' />
//         <Separator/>
//       </View>  
        
//       <View style = {{paddingTop: 20}}>
//         <Button
//           title="SignUp2"
//           color="#800080"
//           onPress={() => { navigation.navigate("SignUp2") }}
//         />
//       </View>
      
//     </SafeAreaView>
//     );


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   emailTextStyleStyle: {
//     color: 'black',
//   },
//   emailPaddingStyleStyle: {
//     paddingBottom:20
//   },
//   separator: {
//     //marginVertical: 8,
//     borderBottomColor: '#737373',
//     borderBottomWidth: StyleSheet.hairlineWidth,
//   },
// });




<SafeAreaView style={styles.container}>
<View>
  <View style={{ paddingBottom:20}}>
    <Image source={require('../../assets/images/ParkItlogo.png')} style={styles.image} />
    <Text style={styles.emailTextStyleStyle}>
           Enter your email address
         </Text>
  </View>

  <View>
    <View style={{ paddingTop:20}} >
      <TextInput placeholderTextColor='grey' placeholder='Email Address' />
    </View>
    <Separator />
  </View>
</View>

<View style={styles.buttons}>
      <View style={styles.navigators}>
        <Button
          title="Next"
          color="#5D0EEA"
           
          onPress={() => { navigation.navigate("SignUp2") }}
        />
      </View>
    </View>

<View style={styles.navigators}>
 
  </View>


</SafeAreaView>
);

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


export default SignUpScreen1;
