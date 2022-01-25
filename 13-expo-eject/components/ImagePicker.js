import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import COLORS from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera';

const ImgPicker = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState()

  const verifyPermissions = async () => {
    const result = await Camera.requestCameraPermissionsAsync()

    if (result.status === 'granted') {
      return true
    }

    Alert.alert(
      'Insufficient permissions!',
      'You need to grant camera permissions to use this app',
      [{ text: 'Okay' }]
    )

    return false
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions()

    if (hasPermission) {
      const { uri } = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      })

      setPickedImage(uri)
      onImageTaken(uri)
    }
  }

  let imageContent = <Text>No image picked yet.</Text>

  if (pickedImage) {
    imageContent = <Image style={styles.image} source={{ uri: pickedImage }} />
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
      {imageContent}
      </View>
      <Button
        title="Take Image"
        color={COLORS.primary}
        onPress={takeImageHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default ImgPicker