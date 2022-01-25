import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Product from '../../models/product';

const INITIAL_STATE = {
  availableProducts: [],
  userProducts: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_PRODUCT: {
      const { pid } = action

      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== pid),
        availableProducts: state.availableProducts.filter(product => product.id !== pid),
      }
    }

    case CREATE_PRODUCT: {
      const {
        productData: {
          id,
          title,
          imageUrl,
          price,
          description,
          ownerId,
          pushToken,
        }
      } = action;

      const newProduct = new Product(
        id,
        ownerId,
        pushToken,
        title,
        imageUrl,
        description,
        price
      )

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      }
    }

    case UPDATE_PRODUCT: {
      const {
        pid,
        productData: { title, imageUrl, description }
      } = action;

      const userProductIndex = state.userProducts.findIndex(
        prod => prod.id === pid
      )

      const updatedProduct = new Product(
        pid,
        state.userProducts[userProductIndex].ownerId,
        state.userProducts[userProductIndex].pushToken,
        title,
        imageUrl,
        description,
        state.userProducts[userProductIndex].price
      )

      const updatedUserProducts = [...state.userProducts]
      updatedUserProducts[userProductIndex] = updatedProduct

      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === pid
      )

      const updatedAvailableProducts = [...state.availableProducts]
      updatedAvailableProducts[availableProductIndex] = updatedProduct

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      }
    }

    case SET_PRODUCTS: {
      const { products, userProducts } = action;

      return {
        ...state,
        availableProducts: products,
        userProducts,
      }
    }

    default:
      return state;
  }
}
