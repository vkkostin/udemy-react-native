import React, { useState, useEffect } from 'react'
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native'
import COLORS from '../constants/Colors'
import * as Location from 'expo-location'
import MapPreview from './MapPreview'

const LocationPicker = ({ navigation, onLocationPicked }) => {
  const [pickedLocation, setPickedLocation] = useState()
  const [isFetching, setIsFetching] = useState(false)

  const mapPickedLocation = navigation.getParam('pickedLocation')

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation)
      onLocationPicked(mapPickedLocation)
    }
  }, [mapPickedLocation, onLocationPicked])

  const verifyPermissions = async () => {
    const result = await Location.requestForegroundPermissionsAsync()

    if (result.status === 'granted') {
      return true
    }

    Alert.alert(
      'Insufficient permissions!',
      'You need to grant location permissions to use this app',
      [{ text: 'Okay' }]
    )

    return false
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions()

    if (hasPermission) {
      try {
        setIsFetching(true)
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({
          timeInterval: 5000,
        })

        setPickedLocation({
          lat: latitude,
          lng: longitude
        })

        onLocationPicked({
          lat: latitude,
          lng: longitude
        })
      } catch (err) {
        Alert.alert(
          'Could not fetch location!',
          'Please try again later or pick a location on the map',
          [{ text: 'OK' }]
        )
      }

      setIsFetching(false)
    }
  }

  const pickOnMapHandler = () => {
    navigation.navigate('Map')
  }

  let mapContent = <Text>No location chosen yet</Text>

  if (isFetching) {
    mapContent = (
      <ActivityIndicator size="large" color={COLORS.primary} />
    )
  }

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        <MapPreview
          location={pickedLocation}
          style={styles.mapPreview}
          onPress={pickOnMapHandler}
        >
          {mapContent}
        </MapPreview>
      </View>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={COLORS.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={COLORS.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  }
})

export default LocationPicker
