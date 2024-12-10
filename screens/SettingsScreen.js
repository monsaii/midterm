import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SettingIcon from "react-native-vector-icons/Feather";
import ChatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./settingStyle";

export default function SettingScreen({ navigation }) {
  const [pushNotifications, setPushNotifications] = useState(true);

  useEffect(() => {
    // Load the push notification preference from AsyncStorage on mount
    const loadPreference = async () => {
      try {
        const storedPreference = await AsyncStorage.getItem("pushNotifications");
        setPushNotifications(storedPreference === "true");
      } catch (error) {
        console.error("Error loading push notification preference:", error);
      }
    };

    loadPreference();
  }, []);

  const handleTogglePushNotifications = async (value) => {
    setPushNotifications(value);

    try {
      // Save the push notification preference to AsyncStorage
      await AsyncStorage.setItem("pushNotifications", value.toString());
    } catch (error) {
      console.error("Error saving push notification preference:", error);
    }

    if (!value) {
      Alert.alert("Push Notifications", "You will no longer receive alerts.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/monitoring.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.bordercontent}>
          <SettingIcon name="settings" size={35} color="black" />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
            Settings
          </Text>
        </View>

        <View style={styles.settingsBorder}>
          <ScrollView>
            <Text style={styles.sectionHeader}>Account Settings</Text>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text style={styles.settingsText}>Edit profile</Text>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => navigation.navigate("ChangePassword")}
            >
              <Text style={styles.settingsText}>Change password</Text>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.settingsItem}>
              <Text style={styles.settingsText}>Push notifications</Text>
              <Switch
                value={pushNotifications}
                onValueChange={handleTogglePushNotifications}
              />
            </View>

            <Text style={styles.sectionHeader}>More</Text>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => navigation.navigate("AboutUs")}
            >
              <Text style={styles.settingsText}>About us</Text>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => navigation.navigate("AboutApp")}
            >
              <Text style={styles.settingsText}>About App</Text>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <View style={styles.buttonborder}>
        <TouchableOpacity onPress={() => navigation.navigate("Analytics")}>
          <Icon name="analytics" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Icon name="notifications" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Icon name="settings" size={30} color="black" />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Feedback")}>
          <ChatIcon name="message-processing" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
