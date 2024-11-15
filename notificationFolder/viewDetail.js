import React from 'react';
import { View, ImageBackground, TouchableOpacity, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-chart-kit';
import styles from './viewDetailStyle';

const screenWidth = Dimensions.get('window').width;

export default function ViewDetails({ route, navigation }) {
  const { notification } = route.params;

  // Sample chart data (based on AnalyticsScreen)
  const chartData = {
    labels: ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"],
    datasets: [
      {
        data: [8, 18, 10, 21, 14, 9, 19, 15, 25, 30], // Replace with actual congestion data if available
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red for congestion
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
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.date}>{notification.date}</Text>
        <Text style={styles.description}>{notification.description}</Text>

        {/* Line Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Congestion Analysis</Text>
          <LineChart
            data={chartData}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Line and label color
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForLabels: {
                fontSize: 10,
                
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
              },
            }}
            style={{
              marginVertical: 9,
              borderRadius: 10,
            }}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
    </ImageBackground>
  );
}
