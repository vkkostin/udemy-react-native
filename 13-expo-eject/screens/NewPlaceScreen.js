import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import COLORS from '../constants/Colors';
import { addPlace } from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const [selectedImage, setSelectedImage] = useState()
  const [selectedLocation, setSelectedLocation] = useState()
  const dispatch = useDispatch()

  const titleChangeHandler = text => setTitle(text)

  const savePlaceHandler = () => {
    dispatch(addPlace(title, selectedImage, selectedLocation))
    navigation.goBack()
  }

  const imageTakenHandler = imagePath => setSelectedImage(imagePath)

  const locationPickedHandler = useCallback(location => {
    setSelectedLocation(location)
  }, [])

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={title} />

        <ImagePicker onImageTaken={imageTakenHandler} />

        <LocationPicker navigation={navigation} onLocationPicked={locationPickedHandler} />

        <Button title="Save Place" color={COLORS.primary} onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  }
})

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place',
}

export default NewPlaceScreen;
