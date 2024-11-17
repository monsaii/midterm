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

        {/* Congestion Analysis Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Congestion Analysis</Text>
          <LineChart
            data={{
              labels: ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"],
              datasets: [
                {
                  data: [8, 18, 10, 21, 14, 9, 19, 15, 25, 30], // Replace with actual data
                  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red line for congestion
                  strokeWidth: 2,
                },
              ],
            }}
            width={screenWidth - 50}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 10,
            }}
          />
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
