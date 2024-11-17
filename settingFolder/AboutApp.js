import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './AboutStyle';

export default function AboutApp({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.descriptionText}>
          Welcome to our Analytics & Monitoring App! Our mission is to provide seamless, real-time insights into network performance, empowering users to make informed decisions and optimize their digital experiences.
          With tools to track data traffic, response times, and packet loss, we aim to make monitoring accessible, actionable, and efficient.
        </Text>
        <Text style={styles.descriptionText}>
          Our app offers advanced visualization tools to present complex data in simple, understandable formats. We are committed to continuously improving the app to address user needs, making it an essential tool for both professionals and everyday users.
        </Text>
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
