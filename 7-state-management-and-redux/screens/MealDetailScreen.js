import React, { useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,

} from 'react-native'
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite } from '../store/actions/meals'

const ListItem = ({ children }) =>
  <View style={styles.listItem}>
    <DefaultText>{children}</DefaultText>
  </View>

const MealDetailScreen = ({ navigation }) => {
  const mealId = navigation.getParam('mealId')
  const allMeals = useSelector(({ meals: { meals }}) => meals)
  const isCurrentMealFavorite = useSelector(({ meals: { favoriteMeals } }) => 
    favoriteMeals.some(({ id }) => id === mealId)
  )
  
  const selectedMeal = allMeals.find(({ id }) => id === mealId)

  const dispatch = useDispatch()

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId))
  }, [dispatch, mealId])

  useEffect(() => {
    navigation.setParams({
      toggleFavorite: toggleFavoriteHandler
    })
  }, [toggleFavoriteHandler])

  useEffect(() => {
    navigation.setParams({
      isFavorite: isCurrentMealFavorite
    })
  }, [isCurrentMealFavorite])

  const {
    duration,
    complexity,
    affordability,
    imageUrl,
    ingredients,
    steps,
  } = selectedMeal

  return (
    <ScrollView>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{duration}m</DefaultText>
        <DefaultText>{complexity.toUpperCase()}</DefaultText>
        <DefaultText>{affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
      <Text style={styles.title}>Steps</Text>
      {steps.map(step => <ListItem key={step}>{step}</ListItem>)}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  }
})

MealDetailScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam('title'),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Favorite' 
        iconName={navigation.getParam('isFavorite') ? 'ios-star' : 'ios-star-outline'}
        onPress={navigation.getParam('toggleFavorite')}
      />
    </HeaderButtons>
  )
})

export default MealDetailScreen
