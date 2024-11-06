import { View, ImageBackground, TouchableOpacity, Text, Switch, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SettingIcon from 'react-native-vector-icons/Feather';
import ChatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './settingStyle';

export default function SettingScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.bordercontent}>
          <SettingIcon name="settings" size={35} color="black" />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Settings</Text>
        </View>
        
        <View style={styles.settingsBorder}>
          <ScrollView>
            <Text style={styles.sectionHeader}>Account Settings</Text>
            <TouchableOpacity style={styles.settingsItem}>
              <Text style={styles.settingsText}>Edit profile</Text>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <Text style={styles.settingsText}>Change password</Text>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.settingsItem}>
              <Text style={styles.settingsText}>Push notifications</Text>
              <Switch value={true} onValueChange={() => {}} />
            </View>
            
            <Text style={styles.sectionHeader}>More</Text>
            <TouchableOpacity style={styles.settingsItem}>
              <Text style={styles.settingsText}>About us</Text>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <Text style={styles.settingsText}>Privacy policy</Text>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <Text style={styles.settingsText}>Terms and conditions</Text>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
          </ScrollView>
        </View>
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
        
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="notifications" size={30} color="black" />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <Icon name="settings" size={30} color="black" />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
          <ChatIcon name="message-processing" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
