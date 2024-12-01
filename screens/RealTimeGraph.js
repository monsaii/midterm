import React from 'react';
import { Dimensions, View, Text, ScrollView, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const RealTimeGraph = ({ data, title, yAxisSuffix = " Mbps", thresholds = {} }) => {
  const screenWidth = Dimensions.get('window').width;

  // Filter labels to show only every alternate label for better readability
  const labelsToShow = data.labels.map((label, index) =>
    index % 2 === 0 ? label : ''
  );

  // Determine colors for the graph dynamically based on thresholds
  const datasetColor = data.values.some((value) => {
    if (thresholds.max !== undefined && value > thresholds.max) return true;
    if (thresholds.min !== undefined && value < thresholds.min) return true;
    return false;
  })
    ? 'rgba(255, 99, 132, 1)' // Exceeded: Red
    : 'rgba(0, 99, 132, 1)'; // Normal: Default Blue/Gray

  return (
    <View style={styles.container}>
      {/* Title for the graph */}
      <Text style={styles.title}>{title}</Text>

      {/* Horizontal ScrollView for the chart */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true} // Display horizontal scroll indicator
        contentContainerStyle={styles.scrollContainer}
      >
        {/* LineChart with dynamic width for horizontal scrolling */}
        <LineChart
          data={{
            labels: labelsToShow.slice(0, data.values.length), // Limit labels to data length
            datasets: [{ data: data.values }], // Pass data values to the chart
          }}
          width={Math.max(labelsToShow.length * 60, screenWidth)} // Dynamic width for scrolling
          height={250}
          yAxisSuffix={yAxisSuffix} // Suffix for Y-axis values
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2, // Number of decimal places for values
            color: () => datasetColor, // Line color based on conditions
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
            propsForHorizontalLabels: {
              fontSize: 9, // Horizontal label font size
            },
            propsForVerticalLabels: {
              fontSize: 10, // Vertical label font size
            },
            propsForDots: {
              r: '6', // Dot size
              strokeWidth: '2', // Dot stroke width
              stroke: datasetColor, // Dot stroke color based on thresholds
            },
          }}
          style={{
            borderRadius: 16, // Chart corner radius
            marginVertical: 10,
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10, // Space above and below the graph container
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    borderRadius: 30, // Rounded corners
    padding: 15, // Inner padding
  },
  title: {
    fontSize: 18, // Title font size
    fontWeight: 'bold', // Title font weight
    textAlign: 'center', // Centered title
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
});

export default RealTimeGraph;
