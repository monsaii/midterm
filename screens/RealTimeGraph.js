import React from 'react';
import { Dimensions, View, Text, ScrollView, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const RealTimeGraph = ({ data, title, yAxisSuffix = " Mbps" }) => {
  const screenWidth = Dimensions.get('window').width;

  // Filter labels to show only every alternate label for better readability
  const labelsToShow = data.labels.map((label, index) =>
    index % 2 === 0 ? label : ''
  );

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
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Line and text color
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
              stroke: '#ffa726', // Dot color
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
    marginVertical: 20, // Space above and below the graph container
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
    borderRadius: 30, // Rounded corners
    padding: 15, // Inner padding
  },
  title: {
    fontSize: 18, // Title font size
    fontWeight: 'bold', // Title font weight
    textAlign: 'center', // Centered title
    marginBottom: 8, // Space below the title
  },
  scrollContainer: {
    paddingHorizontal: 10, // Horizontal padding inside the scrollable area
  },
});

export default RealTimeGraph;
