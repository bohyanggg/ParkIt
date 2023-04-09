import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
function CPDetails() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();
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
//search function
  const handleSearch = (text) => {
    setSearchTerm(text);
    setSelectedLocation(null); // Reset the selected location when a new search term is entered
  };

  const filteredData = data.filter((item) => {
    const ppNameMatch = item.ppName.toLowerCase().includes(searchTerm.toLowerCase());
    const geoMatch = item.geometries.some((geo) =>
      geo.coordinates.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return ppNameMatch || geoMatch;
  });
//navigate to Map scren after pressing button
  const handleSelect = (coordinates) => {
    setSelectedLocation(coordinates);
    console.log('Selected location:', coordinates); // Add this line to verify that the selected coordinates are being passed correctly
    navigation.navigate('Map', { selectedLocation: coordinates });
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
          onPress={() => handleSelect(geo.coordinates)}
        />
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10, borderColor: 'gray', borderWidth: 1, borderRadius: 4, marginBottom: 10 }}>
        <TextInput
          placeholder="Search car park"
          onChangeText={handleSearch}
          value={searchTerm}
        />
      </View>
      <MapView style={{ flex: 1 }} initialRegion={{ latitude: 1.3521, longitude: 103.8198, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
  {selectedLocation && <Marker coordinate={{ latitude: Number(selectedLocation.split(',')[0]), longitude: Number(selectedLocation.split(',')[1]) }} />}
</MapView>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.ppCode + index}
      />
    </View>
  );
}

export default CPDetails;