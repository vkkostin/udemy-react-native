import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import MealItem from './MealItem'

const renderMealItem = ({ navigate }) => ({
  item: {
    id,
    title,
    duration,
    complexity,
    affordability,
    imageUrl
  }
}) =>
  <MealItem
    title={title}
    duration={duration}
    affordability={affordability}
    complexity={complexity}
    imageUrl={imageUrl}
    onSelectMeal={() => {
      navigate({
        routeName: 'MealDetail',
        params: {
          mealId: id,
        }
      })
    }}
  />

const MealList = ({ listData, navigation }) => {
  return (
    <View style={styles.list}>
      <FlatList
        data={listData}
        keyExtractor={item => item.id}
        renderItem={renderMealItem(navigation)}
        style={{ width: '100%' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  }
})

export default MealList
