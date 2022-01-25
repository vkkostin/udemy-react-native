 import React from 'react';
 import {
   StyleSheet,
   View,
   Button,
 } from 'react-native';
 import { launchImageLibrary } from 'react-native-image-picker';
 
 const App = () => {
   const pickImage = async () => {
     const response = await launchImageLibrary()
 
     if (response.didCancel) {
       console.log('User cancelled image picker')
     } else if (response.errorCode) {
       console.log('ImagePicker Error: ', response.errorCode)
     } else if (response.errorMessage) {
       console.log('User tapped custom button: ', response.errorMessage)
     } else {
       console.log(response.assets[0].uri)
     }
   }
 
   return (
     <View style={styles.screen}>
       <Button
         title="Take Image"
         onPress={pickImage}
       />
     </View>
   )
 };
 
 const styles = StyleSheet.create({
   screen: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
   }
 });
 
 export default App;
 