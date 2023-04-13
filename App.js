import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

//screens from index.js
import {
  LoginScreen,
  Map,
  mapWithoutLogin,
  CarParkScreen,
  CPDetails,
  ForgetPasswordScreen,
  SignUpScreen,
  ProfileScreen,
  Html
} from "./screens";

import MainContainer from "./screens/MainContainer"

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false,}}/>
        <Stack.Screen name="MainContainer" component={MainContainer} options={{headerShown: false,}} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="mapWithoutLogin" component={mapWithoutLogin} options={{headerShown: false,}} />
        <Stack.Screen name="Sample List of Car Parks" component={Html} />
        <Stack.Screen name="Carpark" component={CarParkScreen} options={{headerShown: false,}} />
        <Stack.Screen name="CarparkDetails" component={CPDetails} options={{headerShown: false,}} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen}   />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
} 

export default App;
