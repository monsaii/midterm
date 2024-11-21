import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const RealTimeGraph = ({ data, title, yAxisSuffix = " Mbps" }) => {
  const screenWidth = Dimensions.get('window').width;

  const labelsToShow = data.labels.map((label, index) =>
    index % 2 === 0 ? label : ''
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={{
          labels: labelsToShow.slice(0, data.values.length),
          datasets: [{ data: data.values }],
        }}
        width={screenWidth - 70} // Adjust width to fit screen
        height={250}
        yAxisSuffix={yAxisSuffix} // Dynamic suffix
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
            stroke: '#ffa726',
          },
          paddingLeft: 20, // Add space between Y-axis labels and graph
        }}
        style={{
          borderRadius: 16,
          marginVertical: 10,
          
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default RealTimeGraph;
