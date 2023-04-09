import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

//screens from index.js
import {
  Map,
  CarParkScreen,
  CPDetails,
  FavCarparkScreen,
  SettingsScreen,
  SearchHistoryScreen,
} from "../screens";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName="Map" 
      screenOptions={({ route }) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn == "Map") {
            iconName = focused ? 'home' : 'home-outline';
          }
          else if (rn == "FavCarparkScreen") {
            iconName = focused ? 'star' : 'star-outline';
          }
          else if (rn == "SearchHistoryScreen") {
            iconName = focused ? 'search-circle' : 'search-circle-outline';
          }
          else if (rn == "SettingsScreen") {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        
      })}>

      <Tab.Screen name="Map" component={Map} options={{headerShown: false,}}/>
      <Tab.Screen name="FavCarparkScreen" component={CPDetails} options={{headerShown: false,}}/>
      <Tab.Screen name="SearchHistoryScreen" component={SearchHistoryScreen} options={{headerShown: false,}}/>
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false,}}/>
    </Tab.Navigator>

  );
}
