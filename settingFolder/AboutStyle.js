import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 10,
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
