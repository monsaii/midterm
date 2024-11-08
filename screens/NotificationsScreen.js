import { View, ImageBackground, TouchableOpacity, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NotificationIcon from 'react-native-vector-icons/Ionicons';
import ChatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './notificationStyle';

export default function NotificationScreen({ navigation }) {
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
        
          <View style={[styles.notificationCard, styles.notificationHigh]}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>Action Required: Network Congestion Detected</Text>
              <Text style={styles.notificationDate}>04/11/2024</Text>
              <Icon name="close" size={20} color="black" />
            </View>
            <Text style={styles.notificationDescription}>
              High congestion levels detected. Immediate action is recommended to prevent service disruption. Check network traffic and consider rerouting or bandwidth adjustments.
            </Text>
            <Text style={styles.viewDetails}>View Details</Text>
          </View>

          <View style={[styles.notificationCard, styles.notificationMedium]}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>Potential Congestion: Elevated Traffic Levels</Text>
              <Text style={styles.notificationDate}>04/11/2024</Text>
              <Icon name="close" size={20} color="black" />
            </View>
            <Text style={styles.notificationDescription}>
              Monitor closely and prepare to implement congestion control measures if levels continue to rise.
            </Text>
            <Text style={styles.viewDetails}>View Details</Text>
          </View>

        
          <View style={[styles.notificationCard, styles.notificationLow]}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>Network Performance Stable</Text>
              <Text style={styles.notificationDate}>04/11/2024</Text>
              <Icon name="close" size={20} color="black" />
            </View>
            <Text style={styles.notificationDescription}>
              Traffic levels are within normal operating parameters. No immediate action is needed, but regular monitoring is recommended to maintain optimal performance.
            </Text>
            <Text style={styles.viewDetails}>View Details</Text>
          </View>
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
