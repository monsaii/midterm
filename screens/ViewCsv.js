import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewCsv = () => {
  const [csvContent, setCsvContent] = useState('');

  useEffect(() => {
    const loadCsvContent = async () => {
      try {
        // Retrieve all keys saved in AsyncStorage
        const keys = await AsyncStorage.getAllKeys();

        // Filter CSV-related keys (if multiple files are stored)
        const csvKeys = keys.filter((key) => key.startsWith('network_data_'));

        if (csvKeys.length > 0) {
          // Retrieve the latest saved CSV content
          const latestCsvKey = csvKeys[csvKeys.length - 1];
          const csv = await AsyncStorage.getItem(latestCsvKey);

          if (csv) {
            setCsvContent(csv);
          } else {
            Alert.alert('No CSV Found', 'Please save CSV data first.');
          }
        } else {
          Alert.alert('No CSV Found', 'Please save CSV data first.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load CSV data.');
      }
    };

    loadCsvContent();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>CSV Content</Text>
      {csvContent ? (
        <Text style={styles.csvText}>{csvContent}</Text>
      ) : (
        <Text style={styles.noDataText}>No CSV data available to display.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  csvText: {
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
});

export default ViewCsv;
