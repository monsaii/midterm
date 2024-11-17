import { View, ImageBackground, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './aboutUsStyle';

export default function AboutUs({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover"
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, styles.textWithStroke]}>WHO <Text style={styles.headerTextBlack}>WE ARE</Text></Text>
      </View>

      {/* Profile Images, Names, and Roles */}
      <View style={styles.profileContainer}>
        <View style={styles.profile}>
          <Image source={require('../assets/user1.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>Symon Capeña</Text>
          <View style={styles.rolesContainer}>
            <Text style={styles.role}>- UI/UX Designer</Text>
            <Text style={styles.role}>- FrontEnd Development</Text>
          </View>
        </View>

        <View style={styles.profile}>
          <Image source={require('../assets/user2.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>Karlo Santos</Text>
          <View style={styles.rolesContainer}>
            <Text style={styles.role}>-System Administration</Text>
            <Text style={styles.role}>-Development</Text>
          </View>
        </View>

        <View style={styles.profile}>
          <Image source={require('../assets/user3.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>Byron Aler</Text>
          <View style={styles.rolesContainer}>
            <Text style={styles.role}>-System Administration</Text>
            <Text style={styles.role}>-Development</Text>
          </View>
        </View>
      </View>

      {/* About Us Content */}
      <View style={styles.container}>
        <Text style={styles.descriptionText}>
          The development team for NetGest consists of BS Computer Engineering students: Karlo Santos, Symon Capeña, and Byron Aler, all specializing in system administration.
          They also possess skills in JavaScript and React Native, which were utilized in developing NetGest, a mobile application for monitoring network congestion.
          The application is designed with accessibility and portability in mind, allowing users to monitor network performance anywhere.
        </Text>

      </View>

      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Settings')}
      >
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
    </ImageBackground>
  );
}
