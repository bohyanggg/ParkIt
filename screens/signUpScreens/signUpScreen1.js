import { StyleSheet, View, Text, Button } from 'react-native'
import React from 'react'

const SignUpScreen1 = ({navigation}) => {
  return (
    <View>
      <View style={styles.container}>
        <Text>signUpScreen</Text>
      </View>
      <View>
        <Button
            title="SignUp2"
            color="#800080"
            onPress={() => {navigation.navigate("SignUp2")}}
          />
      </View>
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

export default SignUpScreen1;