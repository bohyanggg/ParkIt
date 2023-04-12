import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

function CarParkScreen() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

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

  //Car Park Available Lots: this returns the list of URA carparks in JSON format
  useEffect(() => {
    const url = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability';
    const accessKey = 'acb2ead0-8cef-46a5-af01-15d850b437ce';

    axios.get(url, {
      headers: {
        'AccessKey': accessKey,
        'Token': token
      }
    })
      .then(response => {
        const data = response.data.Result;
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [token]);

  const renderItem = ({ item }) => (
    <View key={`${item.carparkNo}-${item.lotType}`}>
      <Text>Parking Lot: {item.carparkNo}</Text>
      <Text>Available Lots: {item.lotsAvailable}</Text>
      <Text>Lot Type: {item.lotType}</Text>
      <Text>Coordinates:</Text>
      {item.geometries.map((geo, index) => (
        <Text key={`${item.carparkNo}-${item.lotType}-geo-${index}`}>
          {geo.coordinates}
        </Text>
      ))}
    </View>
  );

  const keyExtractor = (item, index) => `${item.CarParkID}-${item.LotType}-${index}`;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

export default CarParkScreen;

