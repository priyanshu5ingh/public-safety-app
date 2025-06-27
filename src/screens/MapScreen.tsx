import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { FAB } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

interface Incident {
  id: string;
  type: 'crime' | 'accident';
  latitude: number;
  longitude: number;
  description: string;
  timestamp: Date;
}

type RootStackParamList = {
  Map: undefined;
  Report: undefined;
};

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

interface Props {
  navigation: MapScreenNavigationProp;
}

const MapScreen: React.FC<Props> = ({ navigation }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();

    setIncidents([
      {
        id: '1',
        type: 'crime',
        latitude: 37.7749,
        longitude: -122.4194,
        description: 'Theft reported',
        timestamp: new Date(),
      },
      {
        id: '2',
        type: 'accident',
        latitude: 37.7833,
        longitude: -122.4167,
        description: 'Car accident',
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleReportPress = () => {
    navigation.navigate('Report');
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            pinColor="blue"
          />
          {incidents.map((incident) => (
            <Marker
              key={incident.id}
              coordinate={{ latitude: incident.latitude, longitude: incident.longitude }}
              title={incident.type}
              description={incident.description}
              pinColor={incident.type === 'crime' ? 'red' : 'orange'}
            />
          ))}
        </MapView>
      )}
      <FAB style={styles.fab} icon="plus" onPress={handleReportPress} label="Report Incident" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default MapScreen;
