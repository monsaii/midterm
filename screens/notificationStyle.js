import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  bordercontent: {
    flexDirection: 'row', 
    backgroundColor: '#8BFFBA',
    alignItems: 'center',
    marginTop: 65,
    marginLeft: 100,
    marginRight: 100,
    padding: 15,
    borderRadius: 50,
  },
  notificationsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20
  },
  scrollContent: {
    paddingBottom: 20,
  },
  notificationCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  notificationHigh: {
    backgroundColor: '#F8D7DA', // Red background for high severity
  },
  notificationMedium: {
    backgroundColor: '#FFF3CD', // Yellow background for medium severity
  },
  notificationLow: {
    backgroundColor: '#D1E7DD', // Green background for low severity
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
  viewDetails: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 14,
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
});
