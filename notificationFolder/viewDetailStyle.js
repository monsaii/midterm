import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    marginTop: 70
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
    
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  recommendationsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  recommendationText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 5,
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
