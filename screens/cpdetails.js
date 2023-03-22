import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

function CPDetails() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details';
    const accessKey = 'acb2ead0-8cef-46a5-af01-15d850b437ce';
    const token = 'gPx2w4Xzvcx5xfqt5Gn8b13nH2sVafrfAh6kBaTf--KbCuvaDdfjCvdeuTyB3tCTm5hS21e7ku0z1@W78128e6-3f74eqFNku0xT';

    axios.get(url, {
      headers: {
        'AccessKey': accessKey,
        'Token': token
      }
    })
      .then(response => {
        const data = response.data.Result;
        setData(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
