import { StatusBar } from 'expo-status-bar';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
      <View style={styles.container}>
        <View style={styles.content}>
         
        </View>
        
        <StatusBar style="auto" />
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
        <Icon name="feedback" size={30} color="black" />
          </TouchableOpacity>

      </View>
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
