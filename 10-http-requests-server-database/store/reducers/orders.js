import Order from "../../models/order";
import { ADD_ORDER, SET_ORDERS } from "../actions/orders";

const INITIAL_STATE = {
  orders: [],
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_ORDER:
      const { orderData: { id, date, items, amount } } = action

      const newOrder = new Order(
        id,
        items,
        amount,
        date,
      )

      return {
        ...state,
        orders: state.orders.concat(newOrder)
      }

    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      }

    default:
      return state;
  }
}