
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

//screens from index.js
import {
  LoginScreen,
  Map,
  MyComponent,
  CarParkScreen,
  CPDetails,
  ForgetPasswordScreen,
  SignUpScreen1,
  SignUpScreen2,
  SignUpScreen3
} from "./screens";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Map" component={Map} options={{headerShown: false,}} />
        <Stack.Screen name="Map1" component={MyComponent} options={{headerShown: false,}} />
        <Stack.Screen name="Carpark" component={CarParkScreen} />
        <Stack.Screen name="CarparkDetails" component={CPDetails} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="SignUp1" component={SignUpScreen1} />
        <Stack.Screen name="SignUp2" component={SignUpScreen2} />
        <Stack.Screen name="SignUp3" component={SignUpScreen3} />
      </Stack.Navigator>
    </NavigationContainer>
  )
} 

export default App;
