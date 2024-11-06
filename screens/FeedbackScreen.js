import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './analyticsStyle'; 

export default function AnalyticsScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.bordercontent}>
        <ChatIcon name="message-question-outline" size={35} color="black" />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Contact</Text>
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

    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
    <Icon name="settings" size={30} color="black" />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
    <View style={styles.iconContainer}>
    <ChatIcon name="message-processing" size={30} color="black" />
    </View>
    </TouchableOpacity>

</View>
    </ImageBackground>
  );
}
