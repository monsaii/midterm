import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoBackground: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100, 
    height: 100, 
    borderRadius: 50,
  },
  signupContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  signupText: {
    color: '#333',
  },
  signupLink: {
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  rememberText: {
    color: '#333',
  },
  forgotText: {
    color: '#1a73e8',
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#1a73e8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
  },
  googleButton: {
    width: '100%',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  googleText: {
    color: '#fff',
    fontSize: 16,
  },  
});
