import { StatusBar } from 'expo-status-bar';
import { Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnalyticsScreen from './screens/AnalyticsScreen';
import NotificationScreen from './screens/NotificationsScreen';
import SettingScreen from './screens/SettingsScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import styles from './style';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('./assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover" 
    >
      <View style={styles.HomepageText}>
        <Text style={{ fontSize: 20, fontWeight: '500' }}>Current Usage</Text>
      </View>


      <View style={styles.HomePagecontent}>
        <Text style={styles.networkTitle}>Network Status:</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.networkRow}>
            <Text style={styles.networkText}>Video Traffic</Text>
            <Text style={styles.networkValue}>20%</Text>
            <Text style={[styles.networkStatus, { color: 'green' }]}>Very Good</Text>
          </View>
          <View style={styles.networkRow}>
            <Text style={styles.networkText}>Data Traffic</Text>
            <Text style={styles.networkValue}>50%</Text>
            <Text style={[styles.networkStatus, { color: 'blue' }]}>Good</Text>
          </View>
          <View style={styles.networkRow}>
            <Text style={styles.networkText}>Voice Traffic</Text>
            <Text style={styles.networkValue}>70%</Text>
            <Text style={[styles.networkStatus, { color: 'orange' }]}>Moderate</Text>
          </View>
          <View style={styles.networkRow}>
            <Text style={styles.networkText}>Social Media</Text>
            <Text style={styles.networkValue}>80%</Text>
            <Text style={[styles.networkStatus, { color: 'red' }]}>Congested</Text>
          </View>
        </ScrollView>
      </View>

      
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
          <ChatIcon name="message-processing" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </ImageBackground>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
