import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

//screens from index.js
import {
  LoginScreen,
  Map,
  CarParkScreen,
  CPDetails,
  ForgetPasswordScreen,
  SignUpScreen,
  FavCarparkScreen,
  SettingsScreen,
  ProfileScreen,
  SearchHistoryScreen,
} from "./screens";

import MainContainer from "./screens/MainContainer"

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false,}}/>
        <Stack.Screen name="MainContainer" component={MainContainer}  />
        <Stack.Screen name="Map" component={Map} options={{headerShown: false,}} />
        <Stack.Screen name="Carpark" component={CarParkScreen} options={{headerShown: false,}} />
        <Stack.Screen name="CarparkDetails" component={CPDetails} options={{headerShown: false,}} />
        <Stack.Screen name="FavouriteCarparks" component={FavCarparkScreen}  />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen}   />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false,}} />
        <Stack.Screen name="Profile" component={ProfileScreen}  />
        <Stack.Screen name="SearchHistory" component={SearchHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
} 

export default App;
