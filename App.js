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
  MainContainer
} from "./screens";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map1">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false,}}/>
        <Stack.Screen name="MainContainer" component={MainContainer} options={{headerShown: false,}} />
        <Stack.Screen name="Map" component={Map} options={{headerShown: false,}} />
        <Stack.Screen name="Carpark" component={CarParkScreen} options={{headerShown: false,}} />
        <Stack.Screen name="CarparkDetails" component={CPDetails} options={{headerShown: false,}} />
        <Stack.Screen name="FavouriteCarparks" component={FavCarparkScreen} options={{headerShown: false,}} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={{headerShown: false,}}  />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false,}} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false,}} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false,}} />
        <Stack.Screen name="SearchHistory" component={SearchHistoryScreen} options={{headerShown: false,}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
} 

export default App;
