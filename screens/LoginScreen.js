import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './loginstyle';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <ImageBackground 
      source={require('../assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover"
    >
      


      <View style={styles.logoBackground}>
        <Image 
          source={require('../assets/logo(1).png')} 
          style={styles.logo}
        />
      </View>


      <KeyboardAvoidingView></KeyboardAvoidingView>
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

        {/* Login Input */}
        <TextInput
          style={styles.input}
          placeholder="Login (Email or Phone)"
          value={login}
          onChangeText={setLogin}
          keyboardType="default" // Accepts both text and numbers
        />

        {/* Password Input with Eye Toggle */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible} // Show asterisks when typing
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon 
              name={isPasswordVisible ? "visibility" : "visibility-off"} 
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        </View>

        {/* Remember Me and Forgot Password */}
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

        {/* Sign In Button */}
        <TouchableOpacity 
          style={styles.signInButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>

        {/* Google Sign In Button */}
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
