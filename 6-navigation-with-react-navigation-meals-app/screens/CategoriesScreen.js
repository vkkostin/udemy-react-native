import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton'

const renderGridItem = ({ navigate }) => ({ item: { title, id, color } }) =>
  <CategoryGridTile
    title={title}
    color={color}
    onSelect={() => {
      navigate({
        routeName: 'CategoryMeals',
        params: {
          categoryId: id
        }
      })
    }}
  />

const CategoriesScreen = ({ navigation }) => {
  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderGridItem(navigation)}
      numColumns={2}
      keyExtractor={({ id }) => id}
    />
  )
}

CategoriesScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Meal Categories',
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CategoriesScreen
