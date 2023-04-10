import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, TextInput } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import proj4 from 'proj4';
import fetch from 'isomorphic-fetch';

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
function getDistanceInKm(point1, point2) {
  const [lon1, lat1] = point1;
  const [lon2, lat2] = point2;
  console.log('lon1:', lon1);
  console.log('lat1:', lat1);
  console.log('lon2:', lon2);
  console.log('lat2:', lat2);
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}





proj4.defs('EPSG:3414', '+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');


function CarParkScreen() {
  const [data, setData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // new state flag
  const [filteredData, setFilteredData] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [region] = useState({
    latitude: 1.3521,
    longitude: 103.8198,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3
  });
  const [error, setError] = useState(null);
  
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

    // Call the API to get a new token every day at 12:00 am
    const interval = setInterval(() => {
      getToken();
    }, 24 * 60 * 60 * 1000);

    // Call the API to get the initial token
    getToken();

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const url = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability';
    const accessKey = 'acb2ead0-8cef-46a5-af01-15d850b437ce';

    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            'AccessKey': accessKey,
            'Token': token
          }
        });
        const data = response.data.Result;
        setData(data);
        setDataFetched(true); // set flag to true after data is fetched successfully
        setLoading(false);
      } catch (error) {
        console.log(error);
        setTimeout(fetchData, 3000); // Retry after 5 seconds
      }
    };

    fetchData();
  }, [token]);
  
  

  const handleSearchLocationChange = (text) => {
    setSearchLocation(text);
  }

  const handleSearchLocationSubmit = async () => {
    if (!dataFetched) { // only allow search if data has been fetched successfully
      return;
    }

    try {
      setLoading(true);
  
      // Use the OpenStreetMap Nominatim API to get the coordinates of the entered location
      const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchLocation)}&format=json&addressdetails=1&limit=1`;
      const response = await fetch(geocodeUrl);
      const geocodeResponse = await response.json();
  
      if (geocodeResponse.length === 0) {
        throw new Error('No results found');
      }
  
      const location = geocodeResponse[0];
      console.log('Location:', location);
      console.log('Latitude:', location.lat);
      console.log('Longitude:', location.lon);
  
      // Convert the location coordinates to SVY21 format
      const lon = parseFloat(location.lon);
      const lat = parseFloat(location.lat);
      console.log('lon:', lon);
      console.log('lat:', lat);
      const svy21 = proj4('EPSG:4326', 'EPSG:3414', [lon, lat]);
      console.log('svy21:', svy21);

  
// Filter the car parks by distance from the entered location
      // Filter the car parks by distance from the entered location
      console.log('data:', data);
      const filtered = data.filter((carpark) => {
        const carparkCoords = carpark.geometries[0].coordinates.split(',').map(parseFloat);
        console.log('carparkCoords:', carparkCoords);
        console.log('X coordinate:', carparkCoords[0]);
        console.log('Y coordinate:', carparkCoords[1]);

        console.log('carparkCoords:', carparkCoords);
        for (let i = 0; i < carparkCoords.length; i++) {
          const coord = carparkCoords[i];
          if (isNaN(coord)) {
            console.log('Invalid coordinate:', coord);
          }
        }
        const carparkCoordsProj4 = proj4('EPSG:3414', 'EPSG:4326', carparkCoords);
        console.log('carparkCoordsProj4:', carparkCoordsProj4);
        const distance = getDistanceInKm([location.lon, location.lat], carparkCoordsProj4);
        console.log('distance:', distance);
        return distance <= 2;
      });
      


  
      // Set the filtered car parks and map region
      setFilteredData(filtered);
     
      setError(null);
    } catch (error) {
      console.log(error);
      setError('Error searching for location');
    } finally {
      setLoading(false);
    }
  };
  
  
  
      
  const renderItem = ({ item }) => {
    console.log('filteredData:', filteredData);
    return (
      <View key={`${item.carparkNo}-${item.lotType}`}>
        <Text>Parking Lot: {item.carparkNo}</Text>
        <Text>Available Lots: {item.lotsAvailable}</Text>
        <Text>Lot Type: {item.lotType}</Text>
        {item.distance !== undefined && (
          <Text>Distance: {item.distance.toFixed(2)} km</Text>
        )}
      </View>
    );
  };
  
  
      
        const keyExtractor = (item, index) => `${item.CarParkID}-${item.LotType}-${index}`;
      
        if (loading) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          );
        }
      
        return (
          <View style={{ flex: 1 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleSearchLocationChange}
        value={searchLocation}
        placeholder="Enter location"
      />
      <Button
        title="Search"
        onPress={handleSearchLocationSubmit}
      />
    </View>
    {error && <Text style={{ color: 'red' }}>{error}</Text>}
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <MapView style={{ flex: 1 }} region={region}>
            {filteredData.map((carpark) => {
              try {
                const carparkCoords = carpark.geometries[0].coordinates.split(',').map(parseFloat);
                const [x, y] = carparkCoords;
                const [longitude, latitude] = proj4('EPSG:3414', 'EPSG:4326', [x, y]);

                return (
                  <Marker
                    key={carpark.carparkNo}
                    coordinate={{
                      latitude: (latitude),
                      longitude: (longitude)
                    }}
                    title={carpark.carparkNo}
                    description={`Available Lots: ${carpark.lotsAvailable}, Lot Type: ${carpark.lotType}`}
                  />
                );
              } catch (error) {
                console.log(`Error with car park ${carpark.carparkNo}: ${error.message}`);
                return null;
              }
            })}

</MapView>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  </View>
);
}     
      export default CarParkScreen;
