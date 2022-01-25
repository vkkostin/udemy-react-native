import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actions/products';
import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';

const INITIAL_STATE = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
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
      const { productData: { title, imageUrl, price, description } } = action;

      const newProduct = new Product(
        new Date().toString(),
        'u1',
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
    default:
      return state;
  }
}
