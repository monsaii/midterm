import React, { useState, useEffect } from 'react';
import {View,Text,FlatList,TouchableOpacity,Alert,Modal,ScrollView,ImageBackground,
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

    const headers = 'Timestamp,Speed (Mbps),Latency (ms),Packet Loss (%)\n';
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

  const viewFileContent = async (fileName) => {
    const content = await AsyncStorage.getItem(fileName);
    if (content) {
      setFileContent(content);
      setCsvModalVisible(false);
      setFileContentModalVisible(true);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/monitoring.png')}
      style={styles.background}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <View style={styles.bordercontent}>
          <Icon name="history" size={35} color="black" />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>
            Historical Data
          </Text>
        </View>

        <FlatList
          data={historicalData}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={styles.placeholderText}>No historical data available.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.dataContainer}>
              <Text style={styles.text}>Time: {item.timestamp}</Text>
              <Text style={styles.text}>Speed: {item.speed} Mbps</Text>
              <Text style={styles.text}>Latency: {item.latency} ms</Text>
              <Text style={styles.text}>Packet Loss: {item.packetLoss} %</Text>
            </View>
          )}
        />

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
            <ScrollView>
              {fileList.map((fileName, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => viewFileContent(fileName)}
                >
                  <Text style={styles.csvFileName}>{fileName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={clearAllFiles}>
              <Text>Clear All Files</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default HistoricalDataScreen;
