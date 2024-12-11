import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RealTimeGraph from "./RealTimeGraph";
import Icon from "react-native-vector-icons/MaterialIcons";

const NetworkMonitor = ({ navigation }) => {
  const [speedData, setSpeedData] = useState({
    labels: Array(10).fill(""),
    values: Array(10).fill(0),
  });
  const [latencyData, setLatencyData] = useState({
    labels: Array(10).fill(""),
    values: Array(10).fill(0),
  });
  const [packetLossData, setPacketLossData] = useState({
    labels: Array(10).fill(""),
    values: Array(10).fill(0),
  });

  const [isCapturing, setIsCapturing] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);

  // Load and sync push notification preference on mount
  useEffect(() => {
    const syncPushNotificationPreference = async () => {
      try {
        const storedPreference = await AsyncStorage.getItem("pushNotifications");
        const isEnabled = storedPreference === "true";
        setPushNotificationsEnabled(isEnabled);
      } catch (error) {
        console.error("Error syncing push notification preference:", error);
      }
    };

    // Sync push notification preference every second
    const interval = setInterval(syncPushNotificationPreference, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Save notification to AsyncStorage
  const saveNotification = async (title, description, severity) => {
    if (!pushNotificationsEnabled) return; // Skip notifications if disabled

    const timestamp = new Date().toLocaleTimeString();
    const notification = {
      id: Date.now().toString(),
      title,
      description,
      date: timestamp,
      severity,
    };

    try {
      const existingNotifications = await AsyncStorage.getItem("notifications");
      const updatedNotifications = existingNotifications
        ? [...JSON.parse(existingNotifications), notification]
        : [notification];
      await AsyncStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error("Failed to save notification:", error);
    }
  };

  // Save historical data to AsyncStorage
  const saveHistoricalData = async (data) => {
    try {
      const existingData = await AsyncStorage.getItem("historicalData");
      const historicalData = existingData ? JSON.parse(existingData) : [];

      const updatedData = [...historicalData, data];
      await AsyncStorage.setItem("historicalData", JSON.stringify(updatedData));
    } catch (error) {
      console.error("Failed to save historical data:", error);
    }
  };

  // Collect network data
  const collectNetworkData = () => {
    const speed = parseFloat((Math.random() * 100).toFixed(2));
    const latency = parseFloat((Math.random() * 300).toFixed(2));
    const packetLoss = parseFloat((Math.random() * 10).toFixed(2));

    const timestamp = new Date().toLocaleTimeString();
    const data = { timestamp, speed, latency, packetLoss };

    // Update graph data
    setSpeedData((prev) => ({
      labels: [...prev.labels.slice(1), timestamp],
      values: [...prev.values.slice(1), speed],
    }));

    setLatencyData((prev) => ({
      labels: [...prev.labels.slice(1), timestamp],
      values: [...prev.values.slice(1), latency],
    }));

    setPacketLossData((prev) => ({
      labels: [...prev.labels.slice(1), timestamp],
      values: [...prev.values.slice(1), packetLoss],
    }));

    // Save historical data
    saveHistoricalData(data);

    // Trigger notifications if enabled
    if (latency > 155) {
      saveNotification(
        "High Latency Alert",
        `Latency: ${latency} ms exceeds the threshold!`,
        "High"
      );
    }

    if (packetLoss > 6) {
      saveNotification(
        "Packet Loss Alert",
        `Packet Loss: ${packetLoss}% exceeds the threshold!`,
        "Medium"
      );
    }
  };

  // Start capturing network data
  const startCapturing = () => {
    if (!isCapturing) {
      setIsCapturing(true);
      const id = setInterval(() => {
        collectNetworkData();
      }, 60000); // Collect data every minute
      setIntervalId(id);
    }
  };

  // Stop capturing network data
  const stopCapturing = () => {
    if (isCapturing) {
      setIsCapturing(false);
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Reload graph data
  const reloadGraphs = () => {
    setSpeedData({
      labels: Array(10).fill(""),
      values: Array(10).fill(0),
    });
    setLatencyData({
      labels: Array(10).fill(""),
      values: Array(10).fill(0),
    });
    setPacketLossData({
      labels: Array(10).fill(""),
      values: Array(10).fill(0),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Network Monitoring</Text>

      <View style={styles.chartContainer}>
        <RealTimeGraph data={speedData} title="Wi-Fi Speed (Mbps)" yAxisSuffix=" Mbps" />
      </View>
      <View style={styles.chartContainer}>
        <RealTimeGraph data={latencyData} title="Latency (ms)" yAxisSuffix=" ms" />
      </View>
      <View style={styles.chartContainer}>
        <RealTimeGraph data={packetLossData} title="Packet Loss (%)" yAxisSuffix=" %" />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, isCapturing ? styles.stopButton : styles.startButton]}
          onPress={isCapturing ? stopCapturing : startCapturing}
        >
          <Text style={styles.buttonText}>{isCapturing ? "Stop Capturing" : "Start Capturing"}</Text>
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
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    backgroundColor: "#94DEA5",
    borderRadius: 30,
    paddingVertical: 20,
    marginHorizontal: 40,
  },
  chartContainer: {
    borderRadius: 12,
    marginVertical: 10,
    backgroundColor: "#99cccc",
    padding: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    padding: 12,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  startButton: {
    backgroundColor: "#28a745",
  },
  stopButton: {
    backgroundColor: "#dc3545",
  },
  reloadButton: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NetworkMonitor;
