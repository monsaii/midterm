import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  bordercontent: {
    flexDirection: 'row', 
    backgroundColor: '#8BFFBA',
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 50,
    
  },
  feedbackBorder: {
    backgroundColor: '#CDF5F8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 80,
    marginHorizontal: 20,
    borderRadius: 10,
    height: 340, 
    marginTop: 30,
    borderWidth: 1,
  },
  scrollContent: {
    paddingBottom: 20, 
  },
  container: {
  },
  buttonborder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 15,
    marginHorizontal: 50,
    marginBottom: 50,
    borderRadius: 50,
    backgroundColor: '#A0C5E5',
    paddingHorizontal: 40,
    marginBottom: 90
  },
  iconContainer: {
    backgroundColor: '#6BA6D4',  
    borderRadius: 100, 
    padding: 5                     
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 5,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#A1C7E4',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  messageInput: {
    height: 100, 
    textAlignVertical: 'top',  
  },
  submitButton: {
    backgroundColor: '#656ED3',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 90,
    marginHorizontal: 90,
  },
  submitButtonText: {
    fontWeight: 'bold',
    
  },
});
