import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  
    alignItems: 'center', // Centers content horizontally
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    alignItems: 'center',
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
  logo: {
    width: 100, 
    height: 100, 
    marginBottom: 20,
    borderRadius: 100,
    marginTop: 40,
    padding: 70
  },

});
