import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  FlatList,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import proj4 from 'proj4';
export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const svy21Projection = '+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs';
  const wgs84Projection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';


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

  useEffect(() => {
    const accessKey = 'acb2ead0-8cef-46a5-af01-15d850b437ce';
    const tokenUrl = 'https://www.ura.gov.sg/uraDataService/insertNewToken.action';

    const getToken = async () => {
      try {
        const response = await axios.post(tokenUrl, null, {
          headers: {
            'AccessKey': accessKey
          }
        });
        setToken(response.data.Result);
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(() => {
      getToken();
    }, 24 * 60 * 60 * 1000);

    getToken();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const url = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details';
    const accessKey = 'acb2ead0-8cef-46a5-af01-15d850b437ce';

    axios.get(url, {
      headers: {
        'AccessKey': accessKey,
        'Token': token
      }
    })
      .then(response => {
        const data = response.data.Result;
        setData(data.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.ppCode === item.ppCode
          ))
        ));
      })
      .catch(error => {
        console.log(error);
      });
  }, [token]);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredData = data.filter((item) => {
    const ppNameMatch = item.ppName.toLowerCase().includes(searchTerm.toLowerCase());
    const geoMatch = item.geometries.some((geo) =>
      geo.coordinates.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return ppNameMatch || geoMatch;
  });

  const handleSelect = (coordinates) => {
    const [x, y] = coordinates.split(',');
    const svy21Coordinates = [parseFloat(x), parseFloat(y)];
    const wgs84Coordinates = proj4(svy21Projection, wgs84Projection, svy21Coordinates);
    setSelectedCoordinates({ latitude: wgs84Coordinates[1], longitude: wgs84Coordinates[0] });
  };

  const renderItem = ({ item }) => (
    <View key={item.ppCode}>
      <Text>Parking Lot: {item.ppName}</Text>
      <Text>Available Lots: {item.parkCapacity}</Text>
      <Text>Weekday Rate: {item.weekdayRate}</Text>
      <Text>Saturday Rate: {item.satdayRate}</Text>
      <Text>Sunday/PH Rate: {item.sunPHRate}</Text>
      <Text>Parking System: {item.parkingSystem}</Text>
      <Text>Coordinates:</Text>
      {item.geometries.map((geo, index) => (
        <Button
          key={`${item.carparkNo}-${item.lotType}-geo-${index}`}
          title={`Select`}
          color="#5D0EEA"
          onPress={() => handleSelect(geo.coordinates)}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Destination"
        onChangeText={handleSearch}
        value={searchTerm}
        containerStyle={{backgroundColor: '#fff'}}
        inputContainerStyle={{ backgroundColor: '#eee' }}
        inputStyle={{ fontSize: 16 }}
      />

      <View style={styles.mapContainer}>
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
  {console.log('Selected coordinates:', selectedCoordinates)}
  {selectedCoordinates && (
    <Marker coordinate={selectedCoordinates} pinColor="green" />
  )}
</MapView>
        )}
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.ppCode + index}
        />
      </View>

      <View>
        <Button
          title="Back"
          color="blue"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});

/*import React, { useState, useEffect } from 'react';
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
