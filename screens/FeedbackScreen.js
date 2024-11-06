import { View, ImageBackground, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './feedbackStyle';

export default function FeedbackScreen({ navigation }) {
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

        <View style={styles.feedbackBorder}>
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>Full Name:</Text>
            <TextInput style={styles.input} placeholder="Enter your full name" />

            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" />

            <Text style={styles.label}>Message:</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Enter your message"
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
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
