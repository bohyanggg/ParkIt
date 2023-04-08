import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SearchBar } from 'react-native-elements';



export default function Map({navigation}) {
  const [currentLocation, setCurrentLocation] = useState(null);

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

  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  //call api here
  };


  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Destination"
        onChangeText={handleSearch}
        value={searchText}
        containerStyle={{backgroundColor: '#fff'}}
        inputContainerStyle={{ backgroundColor: '#eee' }}
        inputStyle={{ fontSize: 16 }}
      />

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
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});



/* import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SearchBar } from 'react-native-elements';

export default function Map({navigation}) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [carparks, setCarparks] = useState([]);

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

  const handleSearch = async (text) => {
    try {
      const ura_api = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details';
      return fetch(ura_api, {headers: {
        AccessKey: 'f5dc3346-1b8a-4165-81e6-215ae3fef6c6',
        Token: 'accessToken',
    }}) 
    .then(response => response.json)
    .then(data => data)
    .catch(error => console.log(error))
      setSearchText(text);
  } catch (error) {
    console.error(error);
      
      // Filter carparks by proximity to destination
      let destination = await Location.geocodeAsync(text);
      let sortedCarparks = data.Result.sort((a, b) => {
        let distanceA = Location.distanceBetweenPoints(
          destination[0],
          { latitude: a.Lat, longitude: a.Lng }
        );
        let distanceB = Location.distanceBetweenPoints(
          destination[0],
          { latitude: b.Lat, longitude: b.Lng }
        );
        return distanceA - distanceB;
      });

      // Set the closest 3 carparks
      setCarparks(sortedCarparks.slice(0, 3));
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Destination"
        onChangeText={handleSearch}
        value={searchText}
        containerStyle={{backgroundColor: '#fff'}}
        inputContainerStyle={{ backgroundColor: '#eee' }}
        inputStyle={{ fontSize: 16 }}
      />  

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
          {carparks.map(carpark => (
            <Marker
              key={carpark.CarParkID}
              coordinate={{ latitude: carpark.Lat, longitude: carpark.Lng }}
              title={carpark.Development}
              description={`Rate: $${carpark.Lots[0].AvailableLots}`}
            />
          ))}
          <Marker coordinate={currentLocation.coords} />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomView:{
    width: '100%', 
    height: 60, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  bottomText:{
    fontSize: 18,
    fontWeight: 'bold'
  }

   
  });
*/


//generated token on 8/4/2023: 
//'fYYacj@18e1t12Mq4gb3acekHEJS81dYfGCDW2G3KrNxquR1@71-mph549R9U1xA3yTa3cYzE4eWEdw8R@51da3fGnkp5t-Me--5
//access key for URA carparks list & rates: f5dc3346-1b8a-4165-81e6-215ae3fef6c6