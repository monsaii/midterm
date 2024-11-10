import { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TimerIcon from 'react-native-vector-icons/Ionicons';
import HomeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarIcon from 'react-native-vector-icons/FontAwesome';
import styles from './analyticsStyle';

export default function AnalyticsScreen({ navigation }) {
  const [showResponseTime, setShowResponseTime] = useState(true);
  const [showPacketLoss, setShowPacketLoss] = useState(true);

  const toggleResponseTime = () => {
    setShowResponseTime((prev) => !prev);
  };

  const togglePacketLoss = () => {
    setShowPacketLoss((prev) => !prev);
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
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Analytics</Text>
        </View>

        {/* Date Selector */}
        <View style={styles.dateSelector}>
          <TouchableOpacity style={styles.dateButton}>
            <TimerIcon name="timer-outline" size={25} color="black" />
            <Text style={styles.dateText}>Past 30 Days</Text>
            <Icon name="arrow-drop-down" size={25} color="black" />
          </TouchableOpacity>
        </View>

        {/* Historical Data Section */}
        <View style={styles.chartContainer}>
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

          {/* Placeholder for Chart */}
          <View style={styles.chartPlaceholder}>
            <Text style={{ fontSize: 16, color: 'gray' }}>Chart Placeholder</Text>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
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
      <View style={styles.buttonborder}>
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
