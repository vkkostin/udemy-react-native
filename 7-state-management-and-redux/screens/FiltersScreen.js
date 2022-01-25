import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Switch, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton'
import { COLORS } from '../constants/colors'
import { useDispatch } from 'react-redux'
import { setFilters } from '../store/actions/meals'

const FilterSwitch = ({ label, value, onChange }) =>
  <View style={styles.filterContainer}>
    <Text>{label}</Text>
    <Switch
      trackColor={{
        true: COLORS.primaryColor
      }}
      thumbColor={Platform.OS === 'android' ? COLORS.primaryColor : ''}
      value={value}
      onValueChange={onChange}
    />
  </View>

const FiltersScreen = ({ navigation }) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false)
  const [isLactoseFree, setIsLactoseFree] = useState(false)
  const [isVegan, setIsVegan] = useState(false)
  const [isVegetarian, setIsVegetarian] = useState(false)

  const dispatch = useDispatch()

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    }

    dispatch(setFilters(appliedFilters))
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch])
  
  useEffect(() => {
    navigation.setParams({ save: saveFilters })
  }, [saveFilters])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        value={isGlutenFree}
        onChange={() => setIsGlutenFree(prevState => !prevState)}
      />
      <FilterSwitch
        label="Lactose-free"
        value={isLactoseFree}
        onChange={() => setIsLactoseFree(prevState => !prevState)}
      />
      <FilterSwitch
        label="Vegan"
        value={isVegan}
        onChange={() => setIsVegan(prevState => !prevState)}
      />
      <FilterSwitch
        label="Vegetarian"
        value={isVegetarian}
        onChange={() => setIsVegetarian(prevState => !prevState)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,
  }
})

FiltersScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Filter Meals',
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
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Save"
        iconName="ios-save"
        onPress={navigation.getParam('save')}
      />
    </HeaderButtons>
  )
})

export default FiltersScreen
