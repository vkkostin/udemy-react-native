import Product from "../../models/product";
import * as Notifications from 'expo-notifications';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId

    try {
      const response = await fetch('https://rn-complete-guide-37813-default-rtdb.firebaseio.com/products.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      const loadedProducts = [];
  
      for (const key in responseData) {
        const {
          title,
          imageUrl,
          description,
          price,
          ownerId,
          ownerPushToken,
        } = responseData[key]
  
        loadedProducts.push(new Product(
          key,
          ownerId,
          ownerPushToken,
          title,
          imageUrl,
          description,
          price
        ))
      }
  
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      })
    } catch (err) {
      throw err;
    }
  }

export const deleteProduct = productId =>
  async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(`https://rn-complete-guide-37813-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    })
  }

export const createProduct = (title, description, imageUrl, price) =>
  async (dispatch, getState) => {
    let { status } = await Notifications.getPermissionsAsync()
    let ownerPushToken = null

    if (status !== 'granted') {
      status = (await Notifications.requestPermissionsAsync()).status
    }

    if (status === 'granted') {
      ownerPushToken = (await Notifications.getExpoPushTokenAsync()).data
    }

    const token = getState().auth.token;
    const ownerId = getState().auth.userId;

    const response = await fetch(`https://rn-complete-guide-37813-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId,
        ownerPushToken,
      })
    });

    const responseData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responseData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId,
        pushToken: ownerPushToken,
      },
    })
  }

export const updateProduct = (id, title, description, imageUrl) =>
  async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(`https://rn-complete-guide-37813-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: { title, description, imageUrl },
    })
  }
