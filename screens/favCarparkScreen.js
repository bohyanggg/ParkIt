import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

const FavCarparkScreen = ({ navigation }) => {
  // Sample data of favourite carparks
  const [favCarparks, setFavCarparks] = useState([]);

  // Render item for each favourite carpark
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.carparkItem}
        onPress={() => navigation.navigate('CarparkDetails', { carpark: item })}
      >
        <View style={styles.carparkDetails}>
          <Text style={styles.carparkName}>{item.name}</Text>
          <View style={styles.cpRateContainer}>
            <Text style={styles.cpRate}>${item.cpRate}/hr</Text>
          </View>
        </View>
        <Text style={styles.carparkLocation}>{item.location}</Text>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      {favCarparks.length > 0 ? (
        <FlatList
          data={favCarparks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noCarparks}>You have no favourite carparks!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    carparkItem: {
      backgroundColor: '#eee',
      padding: 20,
      marginBottom: 10,
      borderRadius: 10,
    },
    carparkDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    carparkName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    cpRateContainer: {
      backgroundColor: '#ADD8E6',
      borderRadius: 5,
      padding: 5,
    },
    cpRate: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    carparkLocation: {
      fontSize: 16,
    },
    noCarparks: {
      fontSize: 18,
      fontStyle: 'italic',
    },
  });
  

export default FavCarparkScreen;