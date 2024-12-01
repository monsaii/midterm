import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrashIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './HistoryStyle';

const HistoricalDataScreen = ({ navigation }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [fileContent, setFileContent] = useState('');
  const [csvModalVisible, setCsvModalVisible] = useState(false);
  const [fileContentModalVisible, setFileContentModalVisible] = useState(false);

  useEffect(() => {
    const loadHistoricalData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('historicalData');
        if (storedData) {
          setHistoricalData(JSON.parse(storedData));
        }

        const storedFiles = await AsyncStorage.getItem('csvFiles');
        if (storedFiles) {
          setFileList(JSON.parse(storedFiles));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load data.');
      }
    };

    loadHistoricalData();
  }, []);

  const saveCsv = async () => {
    if (historicalData.length === 0) {
      Alert.alert('No Data', 'There is no data to save.');
      return;
    }

    const headers =
      'Timestamp,Speed (Mbps),Latency (ms),Packet Loss (%)\n';
    const rows = historicalData
      .map(
        (item) =>
          `${item.timestamp},${item.speed},${item.latency},${item.packetLoss}`
      )
      .join('\n');
    const csvContent = headers + rows;
    const timestamp = new Date().toISOString();
    const fileName = `network_data_${timestamp}.csv`;

    try {
      await AsyncStorage.setItem(fileName, csvContent);
      const updatedFileList = [...fileList, fileName];
      setFileList(updatedFileList);
      await AsyncStorage.setItem('csvFiles', JSON.stringify(updatedFileList));
      Alert.alert('Success', `Data saved to ${fileName}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to save CSV data.');
    }
  };

  const clearCapturedData = async () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to clear all captured data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All Data',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('historicalData');
              setHistoricalData([]);
              Alert.alert('Success', 'Captured data cleared.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear captured data.');
            }
          },
        },
      ]
    );
  };

  const clearAllFiles = async () => {
    Alert.alert('Confirm', 'Are you sure you want to delete all uploaded files?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear All Files',
        onPress: async () => {
          try {
            await AsyncStorage.multiRemove(fileList);
            setFileList([]);
            await AsyncStorage.removeItem('csvFiles');
            Alert.alert('Success', 'All uploaded files cleared.');
          } catch (error) {
            Alert.alert('Error', 'Failed to clear uploaded files.');
          }
        },
      },
    ]);
  };

  const formatCsvContent = (content) => {
    const rows = content.split('\n').map((row) => row.split(','));
    const headers = rows[0];
    const dataRows = rows.slice(1);

    const formattedHeaders = headers.map((header) => header.padEnd(25, ' ')).join('');
    const formattedData = dataRows
      .map((row) => row.map((value) => value.padEnd(25, ' ')).join(''))
      .join('\n');

    return `${formattedHeaders}\n${formattedData}`;
  };

  const viewFileContent = async (fileName) => {
    const content = await AsyncStorage.getItem(fileName);
    if (content) {
      const formattedContent = formatCsvContent(content);
      setFileContent(formattedContent);
      setCsvModalVisible(false); // Close the file list modal
      setFileContentModalVisible(true); // Show the content modal
    }
  };

  const analyzeFile = async (content) => {
    const rows = content.split('\n').slice(1); // Skip header
    const issues = rows.filter((row) => {
      const [timestamp, speed, latency, packetLoss,] = row.split(',');
      return parseFloat(latency) > 100 || parseFloat(packetLoss) > 5;
    });

    const notification = {
      id: Date.now().toString(),
      title: `Analysis Complete: ${issues.length} Issues Found`,
      description: `Found ${issues.length} issues during analysis.`,
      details: issues.map((row, index) => {
        const [timestamp, speed, latency, packetLoss] = row.split(',');
        return {
          id: `${Date.now()}_${index}`,
          timestamp,
          speed,
          latency,
          packetLoss,
        };
      }),
      date: new Date().toLocaleString(),
    };

    try {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      const notifications = storedNotifications
        ? JSON.parse(storedNotifications)
        : [];
      notifications.push(notification);
      await AsyncStorage.setItem('notifications', JSON.stringify(notifications));

      Alert.alert(
        'Analysis Complete',
        `${issues.length} issues found. Check Notifications for details.`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save analysis result.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/monitoring.png')}
      style={styles.background}
    >
      <View style={{ flex: 1 }}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <View style={styles.bordercontent}>
          <Icon name="history" size={35} color="black" />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>
            Historical Data
          </Text>
        </View>

        {/* Data List */}
        <FlatList
          data={historicalData}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={styles.placeholderText}>No historical data available.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.dataContainer}>
              <View style={styles.otherContainer}>
                <Text style={{ fontSize: 15 }}>Time: {item.timestamp}</Text>
                <Text style={{ fontSize: 15 }}>Speed: {item.speed} Mbps</Text>
                <Text style={{ fontSize: 15 }}>Latency: {item.latency} ms</Text>
                <Text style={{ fontSize: 15 }}>Packet Loss: {item.packetLoss} %</Text>
              </View>
            </View>
          )}
        />

        {/* Save, Upload, and Delete Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={saveCsv}>
            <Icon name="save" size={33} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCsvModalVisible(true)}>
            <Icon name="upload" size={33} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={clearCapturedData}>
            <TrashIcon name="trash" size={33} color="black" />
          </TouchableOpacity>
        </View>

        {/* CSV File List Modal */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={csvModalVisible}
          onRequestClose={() => setCsvModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCsvModalVisible(false)}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Choose File</Text>
            <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
              {fileList.map((fileName, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderColor: '#ccc',
                  }}
                  onPress={() =>
                    Alert.alert('Options', 'Choose an action', [
                      {
                        text: 'View',
                        onPress: () => viewFileContent(fileName),
                      },
                      {
                        text: 'Analyze',
                        onPress: async () => {
                          const content = await AsyncStorage.getItem(fileName);
                          if (content) {
                            analyzeFile(content);
                          }
                        },
                      },
                      { text: 'Cancel', style: 'cancel' },
                    ])
                  }
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#007BFF',
                      textAlign: 'center',
                    }}
                  >
                    {fileName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.clearAllButton, { margin: 20 }]}
              onPress={clearAllFiles}
            >
              <Text style={styles.clearAllButtonText}>Clear All Files</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* CSV Content Modal */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={fileContentModalVisible}
          onRequestClose={() => setFileContentModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setFileContentModalVisible(false)}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>CSV Content</Text>
            <ScrollView horizontal>
              <ScrollView style={{ margin: 10 }}>
                <Text style={[styles.csvText, { fontFamily: 'monospace' }]}>
                  {fileContent}
                </Text>
              </ScrollView>
            </ScrollView>
          </View>
        </Modal>

        {/* Bottom Navigation */}
        <View style={styles.navButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
            <View style={{ backgroundColor: '#6BA6D4', padding: 5, borderRadius: 100 }}>
              <Icon name="analytics" size={30} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Icon name="notifications" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon name="settings" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
            <ChatIcon name="message-processing" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HistoricalDataScreen;
