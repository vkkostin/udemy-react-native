import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,

} from 'react-native'
import { MEALS } from '../data/dummy-data'
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'

const ListItem = ({ children }) =>
  <View style={styles.listItem}>
    <DefaultText>{children}</DefaultText>
  </View>

const MealDetailScreen = ({ navigation }) => {
  const mealId = navigation.getParam('mealId')

  const {
    duration,
    complexity,
    affordability,
    imageUrl,
    ingredients,
    steps,
  } = MEALS.find(({ id }) => id === mealId)

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

MealDetailScreen.navigationOptions = ({ navigation }) => {
  const mealId = navigation.getParam('mealId')
  const { title } = MEALS.find(({ id }) => id === mealId)

  return {
    headerTitle: title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Favorite' 
          iconName='ios-star'
          onPress={() => console.log('Mark As Favorite')}
        />
      </HeaderButtons>
    )
  }
}

export default MealDetailScreen
