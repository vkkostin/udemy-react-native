import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () =>
  async dispatch => {
    try {
      const response = await fetch('https://rn-complete-guide-37813-default-rtdb.firebaseio.com/orders/u1.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      const loadedOrders = [];
  
      for (const key in responseData) {
        const { cartItems, totalAmount, date } = responseData[key]
  
        loadedOrders.push(new Order(
          cartItems,
          totalAmount,
          new Date(date),
        ))
      }
  
      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      })
    } catch (err) {
      throw err;
    }
  }

export const addOrder = (cartItems, totalAmount) =>
  async dispatch => {
    const date = new Date();
    const response = await fetch('https://rn-complete-guide-37813-default-rtdb.firebaseio.com/orders/u1.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString(),
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const responseData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        items: cartItems,
        amount: totalAmount,
        id: responseData.name,
        date,
      }
    })
  }
