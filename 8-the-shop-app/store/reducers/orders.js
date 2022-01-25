import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orders";

const INITIAL_STATE = {
  orders: [],
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_ORDER:
      const { orderData: { items, amount } } = action

      const newOrder = new Order(
        new Date().toString(),
        items,
        amount,
        new Date()
      )

      return {
        ...state,
        orders: state.orders.concat(newOrder)
      }
    default:
      return state;
  }
}