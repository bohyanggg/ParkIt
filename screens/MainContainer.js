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
          else if (rn == "Favourite Carpark") {
            iconName = focused ? 'star' : 'star-outline';
          }
          else if (rn == "Search History") {
            iconName = focused ? 'search-circle' : 'search-circle-outline';
          }
          else if (rn == "Settings") {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        
      })}>

      <Tab.Screen name="Map" component={CPDetails} />
      <Tab.Screen name="Favourite Carpark" component={FavCarparkScreen} />
      <Tab.Screen name="Search History" component={SearchHistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>

  );
}
