import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTO_LOGIN } from "../actions/auth"

const INITIAL_STATE = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      }
    
    case SET_DID_TRY_AUTO_LOGIN:
      return {
        ...state,
        didTryAutoLogin: true,
      }

    case LOGOUT:
      return {
        ...INITIAL_STATE,
        didTryAutoLogin: true,
      };

    default:
      return state;
  }
}