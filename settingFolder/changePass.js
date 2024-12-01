import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import Firebase auth instance
import styles from './changePassStyle';

export default function ChangePass({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match!');
      return;
    }

    try {
      // Reauthenticate the user
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('Error', 'No user is logged in.');
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update the password
      await updatePassword(user, newPassword);

      Alert.alert('Success', 'Password changed successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error changing password:', error);
      let errorMessage = 'An error occurred. Please try again.';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'The current password is incorrect.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The new password is too weak.';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Change Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
    </ImageBackground>
  );
}
