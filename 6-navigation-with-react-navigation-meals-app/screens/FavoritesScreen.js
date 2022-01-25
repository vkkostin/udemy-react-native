import React from 'react'
import MealList from '../components/MealList'
import { MEALS } from '../data/dummy-data'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton'

const FavoritesScreen = ({ navigation }) => {
  const favMeals = MEALS.filter(({ id }) => id === 'm1' || id === 'm2')

  return <MealList listData={favMeals} navigation={navigation} />
}

FavoritesScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Your Favorites',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName="ios-menu"
        onPress={() => {
          navigation.toggleDrawer()
        }}
      />
    </HeaderButtons>
  )
})

export default FavoritesScreen
