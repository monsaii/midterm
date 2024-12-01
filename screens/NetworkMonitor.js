import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RealTimeGraph from './RealTimeGraph'; // Ensure RealTimeGraph exists and is correctly implemented
import Icon from 'react-native-vector-icons/MaterialIcons';

const NetworkMonitor = ({ navigation }) => {
  const [speedData, setSpeedData] = useState({
    labels: Array(10).fill(''),
    values: Array(10).fill(0),
  });
  const [latencyData, setLatencyData] = useState({
    labels: Array(10).fill(''),
    values: Array(10).fill(0),
  });
  const [packetLossData, setPacketLossData] = useState({
    labels: Array(10).fill(''),
    values: Array(10).fill(0),
  });
  const [bandwidthUtilizationData, setBandwidthUtilizationData] = useState({
    labels: Array(10).fill(''),
    values: Array(10).fill(0),
  });

  const [isCapturing, setIsCapturing] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Simulate network data collection
  const collectNetworkData = async () => {
    const timestamp = new Date().toLocaleTimeString();

    const speed = parseFloat((Math.random() * 100).toFixed(2)); // Random Wi-Fi speed
    const latency = parseFloat((Math.random() * 300).toFixed(2)); // Random latency
    const packetLoss = parseFloat((Math.random() * 10).toFixed(2)); // Random packet loss
    const bandwidthUtilization = parseFloat((Math.random() * 100).toFixed(2)); // Random bandwidth utilization

    // Update the graph data with new points
    setSpeedData((prev) => ({
      labels: [...prev.labels.slice(-9), timestamp],
      values: [...prev.values.slice(-9), speed],
    }));
    setLatencyData((prev) => ({
      labels: [...prev.labels.slice(-9), timestamp],
      values: [...prev.values.slice(-9), latency],
    }));
    setPacketLossData((prev) => ({
      labels: [...prev.labels.slice(-9), timestamp],
      values: [...prev.values.slice(-9), packetLoss],
    }));
    setBandwidthUtilizationData((prev) => ({
      labels: [...prev.labels.slice(-9), timestamp],
      values: [...prev.values.slice(-9), bandwidthUtilization],
    }));

    // Check for threshold breaches and raise alerts
    if (latency > 250 || packetLoss > 9) {
      const severity = latency > 200 ? 'High' : 'Medium';
      const notification = {
        id: Date.now().toString(),
        title: 'Threshold Alert',
        description: `Latency: ${latency.toFixed(2)} ms, Packet Loss: ${packetLoss.toFixed(2)}%`,
        date: timestamp,
        severity,
      };

      try {
        const existingNotifications = await AsyncStorage.getItem('notifications');
        const updatedNotifications = existingNotifications
          ? [...JSON.parse(existingNotifications), notification]
          : [notification];
        await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        Alert.alert('Alert', notification.description);
      } catch (error) {
        console.error('Error saving notification:', error);
      }
    }
  };

  // Start capturing data
  const startCapturing = () => {
    if (!isCapturing) {
      setIsCapturing(true);
      const id = setInterval(collectNetworkData, 1000); // Collect data every second
      setIntervalId(id);
    }
  };

  // Stop capturing and save data locally
  const stopCapturing = async () => {
    if (isCapturing) {
      setIsCapturing(false);
      clearInterval(intervalId);
      setIntervalId(null);

      try {
        const existingData = await AsyncStorage.getItem('historicalData');
        const historicalData = existingData ? JSON.parse(existingData) : [];

        const updatedData = [
          ...historicalData,
          ...speedData.labels
            .map((label, index) =>
              label
                ? {
                    timestamp: label,
                    speed: speedData.values[index],
                    latency: latencyData.values[index],
                    packetLoss: packetLossData.values[index],
                    bandwidthUtilization: bandwidthUtilizationData.values[index],
                  }
                : null
            )
            .filter(Boolean),
        ];

        await AsyncStorage.setItem('historicalData', JSON.stringify(updatedData));
        Alert.alert('Data Saved', 'Captured data has been saved.');
      } catch (error) {
        Alert.alert('Error', 'Failed to save captured data.');
        console.error(error);
      }
    }
  };

  const reloadGraphs = () => {
    setSpeedData({
      labels: Array(10).fill(''),
      values: Array(10).fill(0),
    });
    setLatencyData({
      labels: Array(10).fill(''),
      values: Array(10).fill(0),
    });
    setPacketLossData({
      labels: Array(10).fill(''),
      values: Array(10).fill(0),
    });
    setBandwidthUtilizationData({
      labels: Array(10).fill(''),
      values: Array(10).fill(0),
    });
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Network Monitoring</Text>

      <View style={styles.chartContainer}>
        <RealTimeGraph data={speedData} title="Wi-Fi Speed (Mbps)" />
      </View>
      <View style={styles.chartContainer}>
        <RealTimeGraph data={latencyData} title="Latency (ms)" yAxisSuffix=" ms" />
      </View>
      <View style={styles.chartContainer}>
        <RealTimeGraph data={packetLossData} title="Packet Loss (%)" yAxisSuffix=" %" />
      </View>
      <View style={styles.chartContainer}>
        <RealTimeGraph data={bandwidthUtilizationData} title="Bandwidth Utilization (%)" yAxisSuffix=" %" />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, isCapturing ? styles.stopButton : styles.startButton]}
          onPress={isCapturing ? stopCapturing : startCapturing}
        >
          <Text style={styles.buttonText}>
            {isCapturing ? 'Stop Capturing' : 'Start Capturing'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.reloadButton]} onPress={reloadGraphs}>
          <Icon name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    backgroundColor: '#8BFFBA',
    borderRadius: 30,
    marginTop: 20,
    paddingVertical: 20,
    marginHorizontal: 40,
  },
  chartContainer: {
    borderRadius: 12,
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    padding: 12,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  startButton: {
    backgroundColor: '#28a745',
  },
  stopButton: {
    backgroundColor: '#dc3545',
  },
  reloadButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NetworkMonitor;
