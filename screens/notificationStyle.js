import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Keeps "Clear All" and header apart
    paddingHorizontal: 30,
    marginTop: 50,
    paddingBottom: 10, // Adds space below the header
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#8BFFBA',
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 50,
  },
  notificationHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  clearAllButton: {
    backgroundColor: '#FF6F61',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  clearAllButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notificationsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  notificationHigh: {
    backgroundColor: '#F8D7DA',
  },
  notificationMedium: {
    backgroundColor: '#FFF3CD',
  },
  notificationLow: {
    backgroundColor: '#D1E7DD',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  notificationDate: {
    fontSize: 12,
    color: '#555',
    marginLeft: 10,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    marginBottom: 10,
  },
  detailsButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#007BFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    elevation: 2,
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  highlightedText: {
    fontWeight: 'bold',
    color: '#FF0000',
  },
  placeholderText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
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
  },
  iconContainer: {
    backgroundColor: '#6BA6D4',
    borderRadius: 100,
    padding: 5,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailCard: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
