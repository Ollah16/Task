import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { functions } from './firebase';
import { httpsCallable } from 'firebase/functions';

export default function App() {
  const [temperature, setTemperature] = useState(null);

  const getWeather = async () => {
    try {
      // Call the getWeather function from Firebase Cloud Functions
      const weatherFunction = httpsCallable(functions, 'getWeather');
      const result = await weatherFunction();

      // Log the result and handle the response
      if (result.data && result.data.current_weather) {
        console.log('Weather data received:', result.data);
        setTemperature(Math.round(result.data.current_weather.temperature));
      } else {
        console.error('Unexpected response format:', result.data);
      }

    } catch (error) {
      console.error("Error fetching weather:", error.message);
      console.error("Stack trace:", error.stack);
    }
  };


  return (
    <View style={styles.container}>

      <Pressable
        style={styles.button}
        onPress={getWeather}>
        <Text style={styles.pressableText}>Get Weather</Text>
      </Pressable>
      {temperature !== null && <Text style={styles.temperature}>Current Temperature: {temperature}°C</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 50
  },
  button: {
    borderRadius: 20,
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  pressableText: {
    color: 'white',
    fontWeight: '600'
  },
  temperature: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
