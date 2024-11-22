import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
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
  const [selectedFileContent, setSelectedFileContent] = useState('');
  const [fileModalVisible, setFileModalVisible] = useState(false);
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
        console.error(error);
      }
    };

    loadHistoricalData();
  }, []);

  const viewFileContent = async (fileName) => {
    try {
      const content = await AsyncStorage.getItem(fileName);
      if (content) {
        setSelectedFileContent(content);
        setFileModalVisible(false);
        setFileContentModalVisible(true);
      } else {
        Alert.alert('Error', 'File content could not be found.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load file content.');
      console.error(error);
    }
  };

  const deleteFile = async (fileName) => {
    Alert.alert('Confirm', `Are you sure you want to delete ${fileName}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem(fileName);

            const updatedFileList = fileList.filter((file) => file !== fileName);
            setFileList(updatedFileList);
            await AsyncStorage.setItem('csvFiles', JSON.stringify(updatedFileList));

            Alert.alert('Success', `${fileName} has been deleted.`);
          } catch (error) {
            Alert.alert('Error', 'Failed to delete the file.');
            console.error(error);
          }
        },
      },
    ]);
  };

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

  const clearData = async () => {
    Alert.alert('Confirm', 'Are you sure you want to clear all data?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Clear',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('historicalData');
            setHistoricalData([]);
            Alert.alert('Success', 'All historical data cleared.');
          } catch (error) {
            Alert.alert('Error', 'Failed to clear data.');
            console.error(error);
          }
        },
      },
    ]);
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
  <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Historical Data</Text>
</View>

        {/* Data List or Placeholder */}
        <FlatList
          data={historicalData}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={styles.placeholderText}>No historical data available.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.dataContainer}>
              <View style={styles.otherContainer}>
                <Text style={{fontSize:15}}>Time: {item.timestamp}</Text>
                <Text style={{fontSize:15}}>Speed: {item.speed} Mbps</Text>
                <Text style={{fontSize:15}}>Latency: {item.latency} ms</Text>
                <Text style={{fontSize:15}}>Packet Loss: {item.packetLoss} %</Text>
              </View>
            </View>
          )}
        />

        {/* Save, View Saved Files, and Clear Data Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={saveCsv}>
            <Icon name="save" size={33} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFileModalVisible(true)}>
            <Icon name="folder" size={33} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={clearData}>
            <TrashIcon name="trash" size={33} color="black" />
          </TouchableOpacity>
        </View>

        {/* Modal to Display File List */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={fileModalVisible}
          onRequestClose={() => setFileModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setFileModalVisible(false)}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Saved Files</Text>
            <FlatList
              data={fileList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.fileRow}>
                  <TouchableOpacity
                    style={styles.fileButton}
                    onPress={() => viewFileContent(item)}
                  >
                    <Text style={styles.fileButtonText}>{item}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteFile(item)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </Modal>

        {/* Modal to Display File Content */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={fileContentModalVisible}
          onRequestClose={() => {
            setFileContentModalVisible(false);
            setFileModalVisible(true);
          }}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setFileContentModalVisible(false);
                setFileModalVisible(true);
              }}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>File Content</Text>
            <ScrollView>
              <Text style={styles.csvText}>{selectedFileContent}</Text>
            </ScrollView>
          </View>
        </Modal>

        {/* Bottom Navigation */}
        <View style={styles.navButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
            <View style={{backgroundColor: '#6BA6D4', padding: 5, borderRadius: 100}}>
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