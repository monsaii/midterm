import React from 'react';
import { Dimensions, View, Text, ScrollView, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const RealTimeGraph = ({ data, title, yAxisSuffix = " Mbps", threshold }) => {
  const screenWidth = Dimensions.get('window').width;

  // Filter labels to show only every alternate label for better readability
  const labelsToShow = data.labels.map((label, index) =>
    index % 2 === 0 ? label : ''
  );

  // Adjust chart color based on threshold
  const datasetColor = data.values.some((value) => value > (threshold || Infinity))
    ? 'rgba(255, 99, 132, 1)' // Exceeded: Red
    : 'rgba(0, 99, 132, 1)'; // Normal: Default Blue/Gray

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollContainer}
      >
        <LineChart
          data={{
            labels: labelsToShow.slice(0, data.values.length),
            datasets: [{ data: data.values }],
          }}
          width={Math.max(labelsToShow.length * 30, screenWidth)} // Adjust width multiplier for more points
          height={250}
          yAxisSuffix={yAxisSuffix}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: () => datasetColor,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForHorizontalLabels: {
              fontSize: 9,
            },
            propsForVerticalLabels: {
              fontSize: 10,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: datasetColor,
            },
          }}
          style={{
            borderRadius: 16,
            marginVertical: 10,
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 30,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
});

export default RealTimeGraph;
