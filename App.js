import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomePage from "./screens/HomePage";
import HistoricalDataScreen from "./screens/HistoricalDataScreen";
import NotificationScreen from "./screens/NotificationsScreen";
import SettingScreen from "./screens/SettingsScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import AboutUs from "./settingFolder/AboutUs";
import ViewDetails from "./notificationFolder/viewDetail";
import AboutApp from "./settingFolder/AboutApp";
import ChangePass from "./settingFolder/changePass";
import EditProfile from "./settingFolder/editProfile";
import NetworkMonitor from "./screens/NetworkMonitor";
import ViewCsv from "./screens/ViewCsv";
import NetworkProvider from "./screens/NetworkProvider"; // Corrected import


const Stack = createStackNavigator();

export default function App() {
  return (
    <NetworkProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Analytics" component={HistoricalDataScreen} />
          <Stack.Screen name="Notifications" component={NotificationScreen} />
          <Stack.Screen name="Settings" component={SettingScreen} />
          <Stack.Screen name="Feedback" component={FeedbackScreen} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="ViewDetails" component={ViewDetails} />
          <Stack.Screen name="AboutApp" component={AboutApp} />
          <Stack.Screen name="ChangePassword" component={ChangePass} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="NetworkMonitor" component={NetworkMonitor} />
          <Stack.Screen name="ViewCsv" component={ViewCsv} />
        </Stack.Navigator>
      </NavigationContainer>
    </NetworkProvider>
  );
}
