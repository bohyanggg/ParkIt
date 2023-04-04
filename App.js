
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//TODO bottom tab navigator for main page or map screen
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

//screens from index.js
import {
  LoginScreen,
  Map,
  CarParkScreen,
  CPDetails,
  ForgetPasswordScreen,
  SignUpScreen1,
  SignUpScreen2,
  SignUpScreen3,
  FavCarparkScreen,
  SettingsScreen,
  ProfileScreen,
  SearchHistoryScreen,
} from "./screens";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Map" component={Map} options={{headerShown: false,}} />
        <Stack.Screen name="Carpark" component={CarParkScreen} />
        <Stack.Screen name="CarparkDetails" component={CPDetails} />
        <Stack.Screen name="FavouriteCarparks" component={FavCarparkScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="SignUp1" component={SignUpScreen1} />
        <Stack.Screen name="SignUp2" component={SignUpScreen2} />
        <Stack.Screen name="SignUp3" component={SignUpScreen3} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="SearchHistory" component={SearchHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
} 

export default App;
