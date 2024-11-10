// analyticsStyle.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  bordercontent: {
    flexDirection: 'row', 
    backgroundColor: '#8BFFBA',
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 65,
    
  },
  dateSelector: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20,
    
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  dateText: {
    fontSize: 14,
    marginHorizontal: 5,
  },
  titleAndDateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateRange: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3C0',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  toText: {
    fontSize: 16,
    color: 'gray',
    
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    marginTop:10,
    borderRadius: 20,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    marginHorizontal: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    marginTop: 10,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: '#D8EFFF',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 40
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendBoxBlue: {
    width: 18,
    height: 18,
    backgroundColor: 'blue',
    marginRight: 5,
    borderRadius: 3,
  },
  legendBoxRed: {
    width: 18,
    height: 18,
    backgroundColor: 'red',
    marginRight: 5,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 17,
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
});
