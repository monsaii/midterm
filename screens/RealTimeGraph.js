import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const RealTimeGraph = ({ data, title, yAxisSuffix = " Mbps" }) => {
  const screenWidth = Dimensions.get('window').width;

  // Reduce the number of labels shown
  const labelsToShow = data.labels.map((label, index) =>
    index % 2 === 0 ? label : '' // Show every second label to prevent overcrowding
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={{
          labels: labelsToShow.slice(0, data.values.length),
          datasets: [{ data: data.values }],
        }}
        width={screenWidth - 50} // Adjust width to fit screen
        height={220}
        yAxisSuffix={yAxisSuffix} // Dynamic suffix
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForHorizontalLabels: {
            fontSize: 10, // Decrease font size for timestamps
          },
          propsForVerticalLabels: {
            fontSize: 10, // Decrease font size for Y-axis labels
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
          
        }}
        style={{
          borderRadius: 16,
          marginVertical: 10, // Add space above and below the chart
          
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20, // Add space between graphs vertically
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Light background for contrast
    borderRadius: 10,
    padding: 10, // Add padding inside the graph container
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8, // Space between title and graph
  },
});

export default RealTimeGraph;
