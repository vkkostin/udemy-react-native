import { ADD_PLACE, SET_PLACES } from "./places-actions"
import Place from "../models/place"

const INITIAL_STATE = {
  places: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const { placeData: { title, image, id, address, coords } } = action
      const { lat, lng } = coords

      const newPlace = new Place(
        id.toString(),
        title,
        image,
        address,
        lat,
        lng
      )

      return {
        ...state,
        places: state.places.concat(newPlace),
      }

    case SET_PLACES:
      const { places } = action

      return {
        ...state,
        places: places.map(pl => new Place(
          pl.id.toString(),
          pl.title,
          pl.imageUri,
          pl.address,
          pl.lat,
          pl.lng
        ))
      }

    default:
      return state
  }
}
