import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import RealTimeGraph from './RealTimeGraph';
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

  const [isCapturing, setIsCapturing] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Buffers for per-minute averaging
  const speedBuffer = [];
  const latencyBuffer = [];
  const packetLossBuffer = [];

  const collectNetworkData = () => {
    const speed = parseFloat((Math.random() * 100).toFixed(2));
    const latency = parseFloat((Math.random() * 300).toFixed(2));
    const packetLoss = parseFloat((Math.random() * 10).toFixed(2));

    if (isFinite(speed)) speedBuffer.push(speed);
    if (isFinite(latency)) latencyBuffer.push(latency);
    if (isFinite(packetLoss)) packetLossBuffer.push(packetLoss);
  };

  const calculateAverages = () => {
    if (speedBuffer.length === 0 || latencyBuffer.length === 0 || packetLossBuffer.length === 0) return;

    const timestamp = new Date().toLocaleTimeString();

    const speedAvg = parseFloat((speedBuffer.reduce((a, b) => a + b, 0) / speedBuffer.length).toFixed(2));
    const latencyAvg = parseFloat((latencyBuffer.reduce((a, b) => a + b, 0) / latencyBuffer.length).toFixed(2));
    const packetLossAvg = parseFloat((packetLossBuffer.reduce((a, b) => a + b, 0) / packetLossBuffer.length).toFixed(2));

    setSpeedData((prev) => ({
      labels: [...prev.labels.slice(-9), timestamp],
      values: [...prev.values.slice(-9), speedAvg],
    }));
    setLatencyData((prev) => ({
      labels: [...prev.labels.slice(-9), timestamp],
      values: [...prev.values.slice(-9), latencyAvg],
    }));
    setPacketLossData((prev) => ({
      labels: [...prev.labels.slice(-9), timestamp],
      values: [...prev.values.slice(-9), packetLossAvg],
    }));

    // Clear buffers
    speedBuffer.length = 0;
    latencyBuffer.length = 0;
    packetLossBuffer.length = 0;
  };

  const startCapturing = () => {
    if (!isCapturing) {
      setIsCapturing(true);
      const dataCollectionInterval = setInterval(collectNetworkData, 1000); // Collect every second
      const averageCalculationInterval = setInterval(calculateAverages, 60000); // Calculate averages every minute
      setIntervalId({ dataCollectionInterval, averageCalculationInterval });
    }
  };

  const stopCapturing = () => {
    if (isCapturing) {
      setIsCapturing(false);
      clearInterval(intervalId.dataCollectionInterval);
      clearInterval(intervalId.averageCalculationInterval);
      setIntervalId(null);
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
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId.dataCollectionInterval);
        clearInterval(intervalId.averageCalculationInterval);
      }
    };
  }, [intervalId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Network Monitoring</Text>

      <View style={styles.chartContainer}>
        <RealTimeGraph data={speedData} title="Wi-Fi Speed (Mbps)" yAxisSuffix=" Mbps" />
      </View>
      <View style={styles.chartContainer}>
        <RealTimeGraph data={latencyData} title="Latency (ms)" yAxisSuffix=" ms" threshold={250} />
      </View>
      <View style={styles.chartContainer}>
        <RealTimeGraph data={packetLossData} title="Packet Loss (%)" yAxisSuffix=" %" threshold={9} />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, isCapturing ? styles.stopButton : styles.startButton]}
          onPress={isCapturing ? stopCapturing : startCapturing}
        >
          <Text style={styles.buttonText}>{isCapturing ? 'Stop Capturing' : 'Start Capturing'}</Text>
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
