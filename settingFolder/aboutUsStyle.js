import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
  },
  header: {
    marginTop: 35,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 36,
    color: '#FFD700',  // Yellow color
    fontWeight: 'bold',
  },
    textWithStroke: {
      textShadowColor: 'black', // Stroke color
      textShadowOffset: { width: 1, height: 1 }, // Stroke thickness
      textShadowRadius: 1, // Blur radius for stroke
    
  },
  headerTextBlack: {
    color: 'black',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  profile: {
    alignItems: 'center',
    width: 100,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
    padding: 5
  },
  rolesContainer: {
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 2,
    borderRadius: 10
  },
  role: {
    fontSize: 12,
    color: 'black',  
    textAlign: 'center',
    paddingHorizontal: 2,
  },

  container: {
    backgroundColor: '#C3F7FF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
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
