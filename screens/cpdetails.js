import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

function CPDetails() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');

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

  const renderItem = ({ item }) => (
    <View key={item.ppCode}>
      <Text>Parking Lot: {item.ppName}</Text>
      <Text>Available Lots: {item.parkCapacity}</Text>
      <Text>Weekday Rate: {item.weekdayRate}</Text>
      <Text>Saturday Rate: {item.satdayRate}</Text>
      <Text>Sunday/PH Rate: {item.sunPHRate}</Text>
      <Text>Parking System: {item.parkingSystem}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.ppCode + index}
      />
    </View>
  );
}

export default CPDetails;
