import * as FileSystem from 'expo-file-system'
import { insertPlace, fetchPlaces } from '../helpers/db'
import ENV from '../env'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export const addPlace = (title, image, { lat, lng }) =>
  async dispatch => {
    // const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${ENV.googleApiKey}`)

    // if (!response.ok) {
    //   throw new Error('Something went wrong')
    // }

    // const responseData = await response.json()

    // if (!responseData.results) {
    //   throw new Error('Something went wrong')
    // }

    const address = '400 N 4th St. Gentrys Landing, St. Louis, MO 63102'

    const fileName = image.split('/').pop()
    const newPath = `${FileSystem.documentDirectory}${fileName}`

    let dbResult

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      })

      dbResult = await insertPlace(
        title,
        newPath,
        address,
        lat,
        lng
      )

    } catch (err) {
      console.log(err)
      throw err
    }

    dispatch({
      type: ADD_PLACE,
      placeData: {
        id: dbResult.insertId,
        title,
        image: newPath,
        address,
        coords: { lat, lng }
      }
    })
  }

export const loadPlaces = () =>
  async dispatch => {
    try {
      const dbResult = await fetchPlaces()

      dispatch({
        type: SET_PLACES,
        places: dbResult.rows._array,
      })
    } catch (err) {
      throw err
    }
  }
