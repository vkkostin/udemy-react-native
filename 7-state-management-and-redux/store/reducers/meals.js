import { MEALS } from '../../data/dummy-data'
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals'

const INITIAL_STATE = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
}

const mealsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const { mealId } = action

      const existingMeal = state.favoriteMeals.find(({ id }) => id === mealId)
      
      if (existingMeal) {
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.filter(meal => meal !== existingMeal)
        }
      }

      const meal = state.meals.find(({ id }) => id === mealId)

      return {
        ...state,
        favoriteMeals: state.favoriteMeals.concat(meal)
      }

    case SET_FILTERS:
      const { appliedFilters } = action

      const filteredMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false
        }

        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false
        }

        if (appliedFilters.vegan && !meal.isVegan) {
          return false
        }

        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false
        }

        return true
      })

      return {
        ...state,
        filteredMeals,
      }

    default:
      return state
  }
}

export default mealsReducer
