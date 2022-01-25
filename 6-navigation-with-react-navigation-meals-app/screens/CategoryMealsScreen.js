import React from 'react'
import { CATEGORIES, MEALS } from '../data/dummy-data'
import MealList from '../components/MealList'

const CategoryMealsScreen = ({ navigation }) => {
  const categoryId = navigation.getParam('categoryId')

  const displayedMeals = MEALS.filter(meal => meal.categoryIds.includes(categoryId))

  return <MealList listData={displayedMeals} navigation={navigation} />
}

CategoryMealsScreen.navigationOptions = ({ navigation }) => {
  const categoryId = navigation.getParam('categoryId')
  const { title } = CATEGORIES.find(({ id }) => id === categoryId)

  return {
    headerTitle: title,
  }
}

export default CategoryMealsScreen
