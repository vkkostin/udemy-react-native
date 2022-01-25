import React from 'react'
import { Platform, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import FiltersScreen from '../screens/FiltersScreen'
import { Ionicons } from '@expo/vector-icons'

import { COLORS } from '../constants/colors'

const getTabIcon = name => ({ tintColor }) =>
  <Ionicons
    name={name}
    size={25}
    color={tintColor}
  />

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? COLORS.primaryColor : 'white',
  },
  haderTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primaryColor,
  headerTitle: 'A Screen',
}

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
  },
  CategoryMeals: CategoryMealsScreen,
  MealDetail: MealDetailScreen,
}, { defaultNavigationOptions })

const FavoritesNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen,
}, { defaultNavigationOptions })

const tabs = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: getTabIcon('ios-restaurant'),
      tabBarColor: COLORS.primaryColor,
      tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text> : 'Meals'
    }
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
      tabBarIcon: getTabIcon('ios-star'),
      tabBarColor: COLORS.accentColor,
      tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text> : 'Favorites'
    }
  },
}

const tabsConfig = {
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'open-sans-bold',
    },
    activeTintColor: COLORS.accentColor,
  }
}

const materialTabsConfig = {
  activeColor: 'white',
  shifting: true,
  barStyle: {
    backgroundColor: COLORS.primaryColor,
  }
}

const MealsFavTabNavigator = Platform.OS === 'android'
  ? createMaterialBottomTabNavigator(tabs, materialTabsConfig)
  : createBottomTabNavigator(tabs, tabsConfig)

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}, { defaultNavigationOptions })

const drawerScreens = {
  Meals: MealsFavTabNavigator,
  Filters: FiltersNavigator,
}

const drawerScreenOptions = {
  contentOptions: {
    activeTintColor: COLORS.accentColor,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
}

const MainNavigator = createDrawerNavigator(drawerScreens, drawerScreenOptions)

export default createAppContainer(MainNavigator)
