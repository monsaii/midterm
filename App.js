import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomePage from './screens/HomePage';
import AnalyticsScreen from './screens/AnalyticsScreen';
import NotificationScreen from './screens/NotificationsScreen';
import SettingScreen from './screens/SettingsScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import AboutUs from './settingFolder/AboutUs';
import ViewDetails from './notificationFolder/viewDetail';
import AboutApp from './settingFolder/AboutApp';
import ChangePass from './settingFolder/changePass';
import EditProfile from './settingFolder/editProfile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="ViewDetails" component={ViewDetails} />
        <Stack.Screen name="AboutApp" component={AboutApp} />
        <Stack.Screen name="ChangePassword" component={ChangePass} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
