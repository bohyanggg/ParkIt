import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

function CarParkScreen() {
    const [data, setData] = useState([]);

  useEffect(() => {
    const url = 'https://api.data.gov.sg/v1/transport/carpark-availability';
    const accessKey = 'acb2ead0-8cef-46a5-af01-15d850b437ce';
    const token = 'gPx2w4Xzvcx5xfqt5Gn8b13nH2sVafrfAh6kBaTf--KbCuvaDdfjCvdeuTyB3tCTm5hS21e7ku0z1@W78128e6-3f74eqFNku0xT';

    axios.get(url, {
      headers: {
        'AccessKey': accessKey,
        'Token': token
      }
    })
    .then(response => {
        const data = response.data.items[0].carpark_data;
        setData(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.carpark_number}</Text>
      <Text>Lots Available: {item.carpark_info[0].lots_available}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.carpark_number}
      />
    </View>
  );
}

export default CarParkScreen;

