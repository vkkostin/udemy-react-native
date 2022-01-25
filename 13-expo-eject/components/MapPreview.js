import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import ENV from '../env'

const MapPreview = props => {

  const { location, children, style, onPress } = props

  let imagePreviewUrl

  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${ENV.googleApiKey}`
  }

  let content = children

  if (location) {
    content = (
      <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
    )
  }

  return (
    <TouchableOpacity onPress={onPress} style={{...styles.mapPreview, ...style}}>
      {content}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  }
})

export default MapPreview