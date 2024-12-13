import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NotificationIcon from 'react-native-vector-icons/Ionicons';
import ChatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './notificationStyle';

export default function NotificationScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load notifications.');
        console.error(error);
      }
    };

    loadNotifications();
  }, []);

  const removeNotification = async (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);

    try {
      await AsyncStorage.setItem(
        'notifications',
        JSON.stringify(updatedNotifications)
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update notifications.');
      console.error(error);
    }
  };

  const clearAllNotifications = async () => {
    Alert.alert('Confirm', 'Are you sure you want to clear all notifications?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        onPress: async () => {
          try {
            await AsyncStorage.setItem('notifications', JSON.stringify([]));
            setNotifications([]);
            Alert.alert('Success', 'All notifications cleared.');
          } catch (error) {
            Alert.alert('Error', 'Failed to clear notifications.');
            console.error(error);
          }
        },
      },
    ]);
  };

  const viewDetails = (notification) => {
    setSelectedNotification(notification);
    setDetailsModalVisible(true);
  };

  return (
    <ImageBackground
      source={require('../assets/monitoring.png')}
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header with Centered Notifications Title and Clear All Button */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <NotificationIcon name="notifications-outline" size={35} color="black" />
            <Text style={styles.notificationHeaderText}>Notifications</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.clearAllButton,
              notifications.length === 0 && { backgroundColor: '#ddd' },
            ]}
            onPress={clearAllNotifications}
            disabled={notifications.length === 0}
          >
            <Text
              style={[
                styles.clearAllButtonText,
                notifications.length === 0 && { color: '#aaa' },
              ]}
            >
              Clear All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <ScrollView
          style={styles.notificationsContainer}
          contentContainerStyle={styles.scrollContent}
        >
          {notifications.map((notification) => (
            <View
              key={notification.id}
              style={[
                styles.notificationCard,
                notification.severity === 'High' && styles.notificationHigh,
                notification.severity === 'Medium' && styles.notificationMedium,
                notification.severity === 'Low' && styles.notificationLow,
              ]}
            >
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationDate}>{notification.date}</Text>
                <TouchableOpacity onPress={() => removeNotification(notification.id)}>
                  <Icon name="close" size={20} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.notificationDescription}>
                {notification.description}
              </Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => viewDetails(notification)}
              >
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
          {notifications.length === 0 && (
            <Text style={styles.placeholderText}>No notifications available.</Text>
          )}
        </ScrollView>
      </View>

      {/* Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailsModalVisible}
        onRequestClose={() => setDetailsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notification Details</Text>
            <ScrollView style={{ marginVertical: 10 }}>
              {selectedNotification?.details?.map((issue, index) => {
                const latencyExceeded = parseFloat(issue.latency) > 100;
                const packetLossExceeded = parseFloat(issue.packetLoss) > 5;
                return (
                  <View key={index} style={styles.detailCard}>
                    <Text style={styles.detailText}>
                      <Text style={styles.detailLabel}>Issue {index + 1}</Text>
                    </Text>
                    <Text style={styles.detailText}>
                      Time: {issue.timestamp}
                    </Text>
                    <Text
                      style={[
                        styles.detailText,
                        latencyExceeded && { color: 'red', fontWeight: 'bold' },
                      ]}
                    >
                      Latency: {issue.latency} ms {latencyExceeded && '(Exceeded)'}
                    </Text>
                    <Text
                      style={[
                        styles.detailText,
                        packetLossExceeded && { color: 'red', fontWeight: 'bold' },
                      ]}
                    >
                      Packet Loss: {issue.packetLoss}%{' '}
                      {packetLossExceeded && '(Exceeded)'}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setDetailsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
