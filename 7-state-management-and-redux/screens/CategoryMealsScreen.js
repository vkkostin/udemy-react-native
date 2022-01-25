import React from 'react'
import { View, StyleSheet } from 'react-native'
import { CATEGORIES } from '../data/dummy-data'
import MealList from '../components/MealList'
import { useSelector } from 'react-redux'
import DefaultText from '../components/DefaultText'

const CategoryMealsScreen = ({ navigation }) => {
  const categoryId = navigation.getParam('categoryId')

  const availableMeals = useSelector(({ meals: { filteredMeals } }) => filteredMeals)

  const displayedMeals = availableMeals.filter(meal => meal.categoryIds.includes(categoryId))

  if (displayedMeals.length) {
    return <MealList listData={displayedMeals} navigation={navigation} />
  }

  return (
    <View style={styles.content}>
      <DefaultText>No meals found, maybe check your filters?</DefaultText>
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

CategoryMealsScreen.navigationOptions = ({ navigation }) => {
  const categoryId = navigation.getParam('categoryId')
  const { title } = CATEGORIES.find(({ id }) => id === categoryId)

  return {
    headerTitle: title,
  }
}

export default CategoryMealsScreen
