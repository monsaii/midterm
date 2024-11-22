import React from 'react';
import { ScrollView, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import NetworkMonitor from './NetworkMonitor'; // The network monitor component
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomePage({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/monitoring.png')} // Your background image
      style={styles.image}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Real-Time Network Monitor Section */}
        <NetworkMonitor />

        {/* Bottom Navigation */}
        <View style={styles.buttonborder}>
          <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
            <Icon name="analytics" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Icon name="notifications" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon name="settings" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
            <ChatIcon Icon name="message-processing" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  buttonborder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 15,
    marginHorizontal: 50,
    borderRadius: 50,
    backgroundColor: '#A0C5E5',
    paddingHorizontal: 40,
  },
});
