import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const Input = ({
  style,
  blurOnSubmit,
  autoCapitalize,
  autoCorrect,
  keyboardType,
  maxLength,
  value,
  onChangeText,
}) => 
  <TextInput
    blurOnSubmit={blurOnSubmit}
    autoCapitalize={autoCapitalize}
    autoCorrect={autoCorrect}
    keyboardType={keyboardType}
    maxLength={maxLength}
    value={value}
    onChangeText={onChangeText}
    style={{...styles.input, ...style}}
  />

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  }
})

export default Input