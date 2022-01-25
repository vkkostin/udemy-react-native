import React from 'react'
import { View, StyleSheet } from 'react-native'
import MealList from '../components/MealList'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux'
import DefaultText from '../components/DefaultText'

const FavoritesScreen = ({ navigation }) => {
  const favMeals = useSelector(({ meals: { favoriteMeals } }) => favoriteMeals)

  if (favMeals.length) {
    return <MealList listData={favMeals} navigation={navigation} />
  }

  return (
    <View style={styles.content}>
      <DefaultText>No favorite meals found. Start adding some!</DefaultText>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

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
