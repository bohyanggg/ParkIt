import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
//import GlobalStyle from '../utils/GlobalStyle';
import MapView from 'react-native-maps';

export default function Map() {
    return (
        <View style={styles.body}>
            <MapView
                style={styles.map}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        margin: 10,
    },
    map: {
        width: '100%',
        height: '100%',
    }
});