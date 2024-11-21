import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BarChart } from 'react-native-chart-kit';
import styles from './HomePageStyle'; // Assuming the styles are in a central style.js

const screenWidth = Dimensions.get('window').width;

export default function HomePage({ navigation }) {
  const data = {
    labels: ['Video', 'Data', 'Voice', 'Social'],
    datasets: [
      {
        data: [20, 50, 70, 80],
      },
    ],
  };

  return (
    <ImageBackground 
      source={require('../assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover" 
    >
      <View style={styles.HomepageText}>
        <Text style={{ fontSize: 20, fontWeight: '500' }}>Current Usage</Text>
      </View>

      {/* Bar Chart Section */}
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={screenWidth - 40}
          height={220}
          fromZero
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: 'rgba(255, 255, 255, 0.1)',
            backgroundGradientTo: 'rgba(0, 255, 255, 0)',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.HomePagecontent}>
        <Text style={styles.networkTitle}>Network Status:</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.networkRow}>
            <Text style={styles.networkText}>Video Traffic</Text>
            <Text style={styles.networkValue}>20%</Text>
            <Text style={[styles.networkStatus, { color: 'green' }]}>Very Good</Text>
          </View>
          <View style={styles.networkRow}>
            <Text style={styles.networkText}>Data Traffic</Text>
            <Text style={styles.networkValue}>50%</Text>
            <Text style={[styles.networkStatus, { color: 'blue' }]}>Good</Text>
          </View>
          <View style={styles.networkRow}>
            <Text style={styles.networkText}>Voice Traffic</Text>
            <Text style={styles.networkValue}>70%</Text>
            <Text style={[styles.networkStatus, { color: 'orange' }]}>Moderate</Text>
          </View>
          <View style={styles.networkRow}>
            <Text style={styles.networkText}>Social Media</Text>
            <Text style={styles.networkValue}>80%</Text>
            <Text style={[styles.networkStatus, { color: 'red' }]}>Bad</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.buttonborder}>
        <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
          <Icon name="analytics" size={30} color="black" />
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
    </ImageBackground>
  );
}
