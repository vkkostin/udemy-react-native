import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Colors from '../constants/colors'
import TitleText from './TitleText'

const { OS, select } = Platform

const Header = ({ title }) => 
  <View style={{
      ...styles.headerBase,
      ...select({
        ios: styles.headerIOS,
        android: styles.headerAndroid
      })
    }}
  >
    <TitleText style={styles.title}>{title}</TitleText>
  </View>

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  title: {
    color: OS === 'ios' ? Colors.primary : 'white',
  }
})

export default Header