import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewCsv = () => {
  const [csvRows, setCsvRows] = useState([]);

  useEffect(() => {
    const loadCsvContent = async () => {
      try {
        // Retrieve all keys saved in AsyncStorage
        const keys = await AsyncStorage.getAllKeys();

        // Filter keys that are related to CSV files
        const csvKeys = keys.filter((key) => key.startsWith('network_data_'));

        if (csvKeys.length > 0) {
          // Get the latest CSV file
          const latestCsvKey = csvKeys[csvKeys.length - 1];
          const csvContent = await AsyncStorage.getItem(latestCsvKey);

          if (csvContent) {
            // Parse CSV into rows and columns
            const rows = csvContent.split('\n').map((row) => row.split(','));
            setCsvRows(rows);
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
      {csvRows.length > 0 ? (
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            {csvRows[0].map((header, index) => (
              <Text key={index} style={[styles.tableCell, styles.tableHeaderCell]}>
                {header.trim()}
              </Text>
            ))}
          </View>

          {/* Table Rows */}
          {csvRows.slice(1).map((row, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {row.map((cell, cellIndex) => (
                <Text key={cellIndex} style={styles.tableCell}>
                  {cell.trim()}
                </Text>
              ))}
            </View>
          ))}
        </View>
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
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
    fontSize: 12,
    color: '#444',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: '#eaeaea',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
});

export default ViewCsv;
