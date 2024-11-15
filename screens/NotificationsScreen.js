import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NotificationIcon from 'react-native-vector-icons/Ionicons';
import ChatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './notificationStyle';

export default function NotificationScreen({ navigation }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Action Required: Network Congestion Detected",
      description: "High congestion levels detected. Immediate action is recommended to prevent service disruption.",
      severity: "High",
      date: "04/11/2024",
    },
    {
      id: 2,
      title: "Potential Congestion: Elevated Traffic Levels",
      description: "Monitor closely and prepare to implement congestion control measures if levels continue to rise.",
      severity: "Medium",
      date: "04/11/2024",
    },
    {
      id: 3,
      title: "Network Performance Stable",
      description: "Traffic levels are within normal operating parameters. No immediate action is needed.",
      severity: "Low",
      date: "04/11/2024",
    },
  ]);

  const removeNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <ImageBackground 
      source={require('../assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.bordercontent}>
          <NotificationIcon name="notifications-outline" size={35} color="black" />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Notifications</Text>
        </View>

        <ScrollView style={styles.notificationsContainer} contentContainerStyle={styles.scrollContent}>
          {notifications.map((notification) => (
            <View
              key={notification.id}
              style={[
                styles.notificationCard,
                notification.severity === "High" && styles.notificationHigh,
                notification.severity === "Medium" && styles.notificationMedium,
                notification.severity === "Low" && styles.notificationLow,
              ]}
            >
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationDate}>{notification.date}</Text>
                <TouchableOpacity onPress={() => removeNotification(notification.id)}>
                  <Icon name="close" size={20} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.notificationDescription}>{notification.description}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ViewDetails", { notification }) // Pass notification data
                }
              >
                <Text style={styles.viewDetails}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <View style={styles.buttonborder}>
        <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
          <Icon name="analytics" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Icon name="notifications" size={30} color="black" />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
          <ChatIcon name="message-processing" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
