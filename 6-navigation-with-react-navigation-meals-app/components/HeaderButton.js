import React from 'react'
import { Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants/colors'

const CustomHeaderButton = props =>
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={23}
    color={Platform.OS === 'android' ? 'white' : COLORS.primaryColor}
  />

export default CustomHeaderButton
