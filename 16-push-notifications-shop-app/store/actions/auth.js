// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AUTO_LOGIN = 'SET_DID_TRY_AL'
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = 'AIzaSyDMkSw8KpcqswOZgtMHwrQWpcSIRyr55DQ';

let timer;

export const setDidTryAutoLogin = () => ({
  type: SET_DID_TRY_AUTO_LOGIN
})

export const authenticate = (userId, token, expiryTime) =>
  dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId,
      token,
    })
  }

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');

  return {
    type: LOGOUT,
  }
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
}

const setLogoutTimer = expirationTime =>
  dispatch => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }

export const signup = (email, password) =>
  async dispatch => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      })
    });

    if (!response.ok) {
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;
      let message;

      switch (errorId) {
        case 'EMAIL_EXISTS':
          message = 'This email exists already.';
          break;
        default:
          message = 'Something went wrong!';
      }

      throw new Error(message);
    }

    const { idToken, localId, expiresIn } = await response.json();

    dispatch({
      type: SIGNUP,
      token: idToken,
      userId: localId,
    });

    dispatch(authenticate(localId, idToken, parseInt(expiresIn) * 1000))

    const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000);

    saveDataToStorage(idToken, localId, expirationDate);
  }

export const login = (email, password) =>
  async dispatch => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      })
    });

    if (!response.ok) {
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;
      let message;

      switch (errorId) {
        case 'EMAIL_NOT_FOUND':
          message = 'This email could not be found';
          break;
        case 'INVALID_PASSWORD':
          message = 'This password is not valid';
          break;
        default:
          message = 'Something went wrong!';
      }

      throw new Error(message);
    }

    const { idToken, localId, expiresIn } = await response.json();

    dispatch(authenticate(localId, idToken, parseInt(expiresIn) * 1000))

    const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000);

    saveDataToStorage(idToken, localId, expirationDate);
  }

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
    userId,
    expiryDate: expirationDate.toISOString()
  }));
}
