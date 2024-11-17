import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slightly less transparent
    marginHorizontal: 20,
    borderRadius: 20, // More rounded corners for modern design
    padding: 25, // Increase padding for better spacing
    elevation: 8, // Stronger shadow for card effect (Android)
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4CAF50', // Subtle green for the title
  },
  input: {
    backgroundColor: '#fff', // Clean white input
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12, // Rounded corners for inputs
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Add slight elevation for inputs (Android)
  },
  button: {
    backgroundColor: '#4CAF50', // Modern green button
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Elevated button
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 5,
  },
});
