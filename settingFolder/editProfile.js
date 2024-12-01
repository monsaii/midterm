import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth } from '../firebaseConfig'; // Import Firebase auth instance
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import styles from './editProfileStyle';

const db = getFirestore(); // Firestore instance

export default function EditProfile({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'No user is logged in.');
        return;
      }

      const userDoc = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setName(userData.name || '');
        setEmail(userData.email || user.email || '');
        setPhone(userData.phone || '');
      } else {
        Alert.alert('Error', 'User profile not found.');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'Unable to fetch user profile.');
    }
  };

  const handleProfileUpdate = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'No user is logged in.');
        return;
      }

      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, { name, email, phone });

      Alert.alert('Success', 'Profile updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <ImageBackground 
      source={require('../assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleProfileUpdate}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </ImageBackground>
  );
}
