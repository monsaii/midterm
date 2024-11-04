import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default function App() {
  return (   
    <ImageBackground 
      source={require('./assets/monitoring.png')} 
      style={styles.image}
      resizeMode="cover" 
    >
      <View style={styles.container}>
        <View style={styles.content}>

        </View>

        
        <StatusBar style="auto" />
      </View>

      <View style={styles.border}>
        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    
    flex: 1, 
  },
  border: {
    borderWidth: 2,
    borderColor: 'black',
    paddingBottom: 60,
    marginLeft: 50, 
    marginRight: 50,
    marginBottom: 50,
    marginTop: 50,
    borderRadius: 50,
    backgroundColor: '#A0C5E5'
  },
  content: {
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'black',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#A0C5E5',
    marginTop: 230,
    borderRadius: 30,
    padding: 130,
  },


});

