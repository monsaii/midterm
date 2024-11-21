import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, Text, Dimensions, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TimerIcon from 'react-native-vector-icons/Ionicons';
import HomeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarIcon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import styles from './analyticsStyle';
import Modal from 'react-native-modal';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen({ navigation }) {
  const [showResponseTime, setShowResponseTime] = useState(true);
  const [showPacketLoss, setShowPacketLoss] = useState(true);
  const [dateRange, setDateRange] = useState("Past 30 Days");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleResponseTime = () => {
    setShowResponseTime((prev) => !prev);
  };

  const togglePacketLoss = () => {
    setShowPacketLoss((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const selectDateRange = (range) => {
    setDateRange(range);
    setIsModalVisible(false);
  };

  const dateOptions = ["Past 7 Days", "Past 14 Days", "Past 30 Days", "Past 60 Days", "Past 90 Days"];

  const chartData = {
    labels: ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"],
    datasets: [
      {
        data: [8, 18, 10, 21, 14, 9, 19, 15, 25, 30],
        color: (opacity = 1) => `rgba(0, 0, 255, ${showResponseTime ? opacity : 0})`, // Blue for Response Time
        strokeWidth: 2,
      },
      {
        data: [20, 35, 45, 30, 20, 25, 20, 40, 30, 10],
        color: (opacity = 1) => `rgba(255, 0, 0, ${showPacketLoss ? opacity : 0})`, // Red for Packet Loss
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ImageBackground 
      source={require('../assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.container}>
        
        <View style={styles.bordercontent}>
          <HomeIcon name="home-analytics" size={35} color="black" />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Historical Data</Text>
        </View>

        {/* Date Selector */}
        <View style={styles.dateSelector}>
          <TouchableOpacity style={styles.dateButton} onPress={toggleModal}>
            <TimerIcon name="timer-outline" size={25} color="black" />
            <Text style={styles.dateText}>{dateRange}</Text>
            <Icon name="arrow-drop-down" size={25} color="black" />
          </TouchableOpacity>
        </View>

        {/* Improved Modal for Date Options */}
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date Range</Text>
            <FlatList
              data={dateOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalOption} onPress={() => selectDateRange(item)}>
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>

        {/* Historical Data Section */}
        <View style={[styles.chartContainer, { paddingVertical: 20 }]}>
          <View style={styles.titleAndDateRangeContainer}>
            <Text style={styles.chartTitle}>Historical Data</Text>
            <View style={styles.dateRangeContainer}>
              <View style={styles.dateRange}>
                <CalendarIcon name="calendar" size={20} color="black" />
                <TouchableOpacity>
                  <Text style={styles.dateText}>11/1/2024</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.toText}>to</Text>
              <View style={styles.dateRange}>
                <CalendarIcon name="calendar" size={20} color="black" />
                <TouchableOpacity>
                  <Text style={styles.dateText}>11/9/2024</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Line Chart */}
          <LineChart
            data={chartData}
            width={screenWidth - 80}
            height={200}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Default label color
              style: {
                borderRadius: 16,
                marginVertical: 10,
              },
              propsForLabels: {
                fontSize: 10,
              },
              propsForDots: {
                r: '4',
              },
            }}
            style={{ marginVertical: 20 }}
          />
        </View>

        {/* Legend */}
        <View style={[styles.legend, { marginTop: 10 }]}>
          <TouchableOpacity style={styles.legendItem} onPress={toggleResponseTime}>
            <View style={[styles.legendBox, styles.legendBoxBlue, { opacity: showResponseTime ? 1 : 0.3 }]}>
              {showResponseTime && <Icon name="check" size={17} color="white" />}
            </View>
            <Text style={styles.legendText}>Response Time</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.legendItem} onPress={togglePacketLoss}>
            <View style={[styles.legendBox, styles.legendBoxRed, { opacity: showPacketLoss ? 1 : 0.3 }]}>
              {showPacketLoss && <Icon name="check" size={17} color="white" />}
            </View>
            <Text style={styles.legendText}>Packet Loss</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={[styles.buttonborder, { marginTop: 15 }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
          <View style={styles.iconContainer}>
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
          <HomeIcon name="message-processing" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
