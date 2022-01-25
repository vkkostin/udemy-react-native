import React from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'
import Colors from '../constants/colors'

const MainButton = ({ children, onPress }) =>
  <View style={styles.buttonContainer}>
    <TouchableNativeFeedback activeOpacity={0.6} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableNativeFeedback>
  </View>

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  }
})

export default MainButton
