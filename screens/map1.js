import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import proj4 from 'proj4';


export default function App({navigation}) {
const svy21 = '+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +datum=WGS84 +to_meter=1';
const wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
  const [currentLocation, setCurrentLocation] = useState(null);
  const [parkingLocations, setParkingLocations] = useState([]);
  useEffect(() => {
    const url = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details';
    const accessKey = 'acb2ead0-8cef-46a5-af01-15d850b437ce';

    // Make an API request to get car park details
    axios.get(url)
      .then(response => {
        const carParkDetails = response.data.Result;
        // Extract coordinates and convert from SVY21 to WGS84
        const coordinates = carParkDetails.map(park => {
          const [longitude, latitude] = proj4(svy21, wgs84, [park.x_coord, park.y_coord]);
          return { latitude, longitude };
        });
        setParkingLocations(coordinates);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={currentLocation.coords} />
        </MapView>
      )}
      <View>
        <Button
          title="Back"
          color='blue'
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>

  );
}

