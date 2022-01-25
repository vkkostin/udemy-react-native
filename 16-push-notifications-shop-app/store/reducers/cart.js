import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const INITIAL_STATE = {
  items: {},
  totalAmount: 0,
};

export default (state= INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART: 
      const { product: addedProduct } = action
      const {
        price: prodPrice,
        title: prodTitle,
        id: prodId,
        pushToken,
      } = addedProduct

      let newCartItem = new CartItem(
        1,
        prodPrice,
        prodTitle,
        pushToken,
        prodPrice
      )

      if (state.items[prodId]) {
        newCartItem = new CartItem(
          state.items[prodId].quantity + 1,
          prodPrice,
          prodTitle,
          pushToken,
          state.items[prodId].sum + prodPrice
        )
      }

      return {
        ...state,
        items: {
          ...state.items,
          [prodId]: newCartItem
        },
        totalAmount: state.totalAmount + prodPrice
      }

    case REMOVE_FROM_CART: {
      const { pid } = action;

      const {
        quantity,
        productPrice,
        productTitle,
        sum,
      } = state.items[pid];
      
      let updatedCartItems;

      if (quantity > 1) {
        const updatedCartItem = new CartItem(
          quantity - 1,
          productPrice,
          productTitle,
          sum - productPrice
        );

        updatedCartItems = {
          ...state.items,
          [pid]: updatedCartItem,
        }
      } else {
        updatedCartItems = {
          ...state.items,
        };

        delete updatedCartItems[pid]
      }
    
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - productPrice
      }
    }

    case ADD_ORDER:
      return INITIAL_STATE;

    case DELETE_PRODUCT: {
      const { pid } = action;

      if (!state.items[pid]) {
        return state
      }

      const updatedItems = { ...state.items }
      const itemTotal = state.items[pid].sum
      delete updatedItems[pid]

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      }
    }

    default: 
      return state
  }
}
