import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  buttonborder: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    paddingVertical: 15,
    marginHorizontal: 50,  
    marginBottom: 50,
    borderRadius: 50,
    backgroundColor: '#A0C5E5',
    paddingHorizontal: 40, 
  },
  content: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    marginHorizontal: 20, 
    marginTop: 230,
    borderRadius: 50,
    padding: 130,
  },
  backButton: {
    position: 'absolute',
    top: 40, 
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',  
    borderRadius: 20,
    padding: 5,
  },
  
});
