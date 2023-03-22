
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
  CPDetails
} from "./screens";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CarparkDetails"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0080ff'
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Map1"
          component={MyComponent}
          options={{
            headershown: false,
          }}
        />

        <Stack.Screen
          name="Carpark"
          component={CarParkScreen}
          options={{
            headershown: false,
          }}
        />

        <Stack.Screen
          name="CarparkDetails"
          component={CPDetails}
          options={{
            headershown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
