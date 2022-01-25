import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import COLORS from '../constants/Colors';

const MapScreen = ({ navigation }) => {
  const initialLocation = navigation.getParam('initialLocation')
  const readonly = navigation.getParam('readonly')
  const [selectedLocation, setSelectedLocation] = useState(initialLocation)
  
  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const selectedLocationHandler = event => {
    if (readonly) {
      return
    }

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (selectedLocation) {
      navigation.navigate('NewPlace', {
        pickedLocation: selectedLocation
      })
    }
  }, [selectedLocation])

  useEffect(() => {
    navigation.setParams({ saveLocation: savePickedLocationHandler })
  }, [savePickedLocationHandler])

  let markerCoordinates

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    }
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectedLocationHandler}
    >
      {selectedLocation ? <Marker title="Picked Location" coordinate={markerCoordinates} /> : null}
    </MapView>
  )
}

MapScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => {
    if (navigation.getParam('readonly')) {
      return null
    }

    return (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={navigation.getParam('saveLocation')}
      >
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    )
  }
})

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : COLORS.primary
  }
})

export default MapScreen;
