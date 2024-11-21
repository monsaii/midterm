import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import RealTimeGraph from './RealTimeGraph'; // Import the graph component

const NetworkMonitor = () => {
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

  const fetchNetworkData = () => {
    const simulatedSpeed = Math.random() * 100;
    const simulatedLatency = Math.random() * 300;
    const simulatedPacketLoss = Math.random() * 10;

    const timestamp = new Date().toLocaleTimeString();

    // Update Speed Data
    setSpeedData((prev) => ({
      labels: [...prev.labels.slice(-9), timestamp],
      values: [...prev.values.slice(-9), simulatedSpeed],
    }));

    // Update Latency Data
    setLatencyData((prev) => ({
      labels: [...prev.labels.slice(-9), timestamp],
      values: [...prev.values.slice(-9), simulatedLatency],
    }));

    // Update Packet Loss Data
    setPacketLossData((prev) => ({
      labels: [...prev.labels.slice(-9), timestamp],
      values: [...prev.values.slice(-9), simulatedPacketLoss],
    }));
  };

  useEffect(() => {
    const interval = setInterval(fetchNetworkData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Network Monitoring</Text>
      <RealTimeGraph data={speedData} title="Wi-Fi Speed (Mbps)" />
      <RealTimeGraph data={latencyData} title="Latency (ms)" yAxisSuffix=" ms" />
      <RealTimeGraph data={packetLossData} title="Packet Loss (%)" yAxisSuffix=" %" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 30,
    marginTop: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default NetworkMonitor;
