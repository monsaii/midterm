import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './loginstyle';
import { useNavigation } from '@react-navigation/native';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore'; // Firestore functions
import * as Google from 'expo-auth-session/providers/google';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      '765445786482-rlnji9222456ksum7miclc71n3a1k0vq.apps.googleusercontent.com',
  });

  // Save user data to Firestore
  const saveUserToFirestore = async (user) => {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        uid: user.uid,
        provider: user.providerId,
      });
      console.log('User data saved to Firestore');
    } catch (error) {
      console.error('Error saving user to Firestore:', error);
      Alert.alert('Error', 'Failed to save user data.');
    }
  };

  const handleSignUp = async () => {
    if (!login || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, login, password);
      console.log('User signed up:', userCredential.user);
      await saveUserToFirestore(userCredential.user);
      Alert.alert('Success', 'Account created successfully!');
      setIsSignUpMode(false); // Switch back to Sign-In mode after sign-up
    } catch (error) {
      console.error('Error during sign-up:', error.message);
      Alert.alert('Error', 'Unable to create an account. Please try again.');
    }
  };

  const handleSignIn = async () => {
    if (!login || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, login, password);
      console.log('User signed in:', userCredential.user);
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error during sign-in:', error.message);
      Alert.alert('Error', 'Invalid email or password.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await promptAsync();
      if (result.type === 'success') {
        const { id_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        console.log('User signed in with Google:', userCredential.user);
        await saveUserToFirestore(userCredential.user);
        Alert.alert('Success', 'Logged in with Google!');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error.message);
      Alert.alert('Error', 'Unable to sign in with Google.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/monitoring.png')}
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.logoBackground}>
        <Image source={require('../assets/logo(1).png')} style={styles.logo} />
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>{isSignUpMode ? 'Create an Account' : 'Welcome Back'}</Text>

        {/* Login Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={login}
          onChangeText={setLogin}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input with Toggle */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Sign In / Sign Up Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={isSignUpMode ? handleSignUp : handleSignIn}
        >
          <Text style={styles.signInText}>{isSignUpMode ? 'Sign Up' : 'Sign In'}</Text>
        </TouchableOpacity>

        {/* Google Sign In Button */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          disabled={!request}
        >
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>

        {/* Toggle between Sign-In and Sign-Up */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            {isSignUpMode ? 'Already have an account?' : "Don't have an account?"}
          </Text>
          <TouchableOpacity onPress={() => setIsSignUpMode(!isSignUpMode)}>
            <Text style={styles.signupLink}>{isSignUpMode ? ' Sign In' : ' Sign Up'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
