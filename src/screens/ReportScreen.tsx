import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const ReportScreen = () => {
  const [incidentType, setIncidentType] = useState('crime');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleSubmit = async () => {
    if (!location) {
      alert('Please enable location services to report an incident');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement API call to submit incident
      const incidentData = {
        type: incidentType,
        description,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: new Date(),
      };

      // Mock API call
      console.log('Submitting incident:', incidentData);
      await new Promise(resolve => setTimeout(resolve, 1000));

      navigation.goBack();
    } catch (error) {
      console.error('Error submitting incident:', error);
      alert('Failed to submit incident. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Report an Incident</Text>
        
        <Text style={styles.label}>Incident Type</Text>
        <RadioButton.Group onValueChange={value => setIncidentType(value)} value={incidentType}>
          <View style={styles.radioGroup}>
            <RadioButton.Item label="Crime" value="crime" />
            <RadioButton.Item label="Accident" value="accident" />
          </View>
        </RadioButton.Group>

        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading || !description.trim()}
          style={styles.button}
        >
          Submit Report
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  radioGroup: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default ReportScreen; 