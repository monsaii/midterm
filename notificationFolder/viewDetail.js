//*
import React from 'react';
import { View, ImageBackground, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-chart-kit';
import styles from './viewDetailStyle';

const screenWidth = Dimensions.get('window').width;

export default function ViewDetails({ route, navigation }) {
  const { notification } = route.params;

  // Sample Recommendations based on Severity
  const recommendations = {
    High: [
      "Consider rerouting traffic to less congested parts of the network.",
      "Increase bandwidth allocation to prevent service disruptions.",
      "Notify relevant teams to take immediate action."
    ],
    Medium: [
      "Monitor traffic closely for any signs of increasing congestion.",
      "Prepare contingency plans to address potential congestion spikes.",
      "Evaluate non-critical traffic and optimize where possible."
    ],
    Low: [
      "Continue regular network monitoring to maintain performance.",
      "Perform routine checks on network equipment to prevent issues.",
      "Document current performance for benchmarking."
    ],
  };

  return (
    <ImageBackground 
      source={require('../assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Notification Title and Details */}
        <View style={styles.container}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.date}>{notification.date}</Text>
          <Text style={styles.description}>{notification.description}</Text>
        </View>

        {/* Recommendations Section */}
        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationsTitle}>Recommended Actions</Text>
          {recommendations[notification.severity].map((rec, index) => (
            <Text key={index} style={styles.recommendationText}>
              {`• ${rec}`}
            </Text>
          ))}
        </View>
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
    </ImageBackground>
  );
}
