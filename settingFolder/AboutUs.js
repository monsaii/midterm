import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './aboutUsStyle';

export default function AboutUs({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover"
    >
        <View style={styles.logoBackground}>
        <Image source={require('../assets/user1.png')} 
        style={styles.logo}/>
        </View>
        
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>About Us</Text>
        <Text style={styles.descriptionText}>
          This app provides users with network analytics and monitoring features, including real-time updates, notifications on network health, and historical analysis.
        </Text>
      </View>

      {/* Back Button to navigate back to Settings */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Settings')}
      >
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
    </ImageBackground>
  );
}
