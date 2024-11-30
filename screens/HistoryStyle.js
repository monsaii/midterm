import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 5,
    zIndex: 10,
  },
  bordercontent: {
    flexDirection: 'row', 
    backgroundColor: '#8BFFBA',
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 50,
    marginLeft: 10
  },

  dataContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    padding: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 60,
  },
  otherContainer: {
    alignSelf: 'center',

  },
  placeholderText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    marginTop: 190,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 70,
    borderRadius: 30,
  },
  navButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 15,
    marginHorizontal: 50,
    marginBottom: 20,
    borderRadius: 50,
    backgroundColor: '#A0C5E5',
    paddingHorizontal: 40,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  fileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  fileButton: {
    flex: 1,
    padding: 8,
  },
  fileButtonText: {
    fontSize: 16,
    color: '#1e90ff',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  csvText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },

  analysisResult: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  csvText: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: 'black',
    textAlign: 'left', // Aligns content properly for readability
    lineHeight: 20, // Adds spacing between rows for better visibility
  },
});

export default styles;
