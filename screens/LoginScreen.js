import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './loginstyle';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <ImageBackground 
      source={require('../assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.container}>
        
        {/* Sign up prompt */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}> Sign up now</Text>
          </TouchableOpacity>
        </View>

        {/* Header */}
        <Text style={styles.header}>Nice to see you again</Text>

        <TextInput
          style={styles.input}
          placeholder="Login"
          value={login}
          onChangeText={setLogin}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <View style={styles.rememberContainer}>
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
            <Text style={styles.rememberText}>
              {rememberMe ? '✓' : '○'} Remember me
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* Handle password reset */ }}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.signInButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.googleButton} 
          onPress={() => { /* Handle Google Sign-In */ }}
        >
          <Text style={styles.googleText}>Or sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
