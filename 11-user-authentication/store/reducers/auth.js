import { AUTHENTICATE, LOGOUT } from "../actions/auth"

const INITIAL_STATE = {
  token: null,
  userId: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      }
    
    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}