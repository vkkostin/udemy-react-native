import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'
// import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
})

const store = createStore(rootReducer)

const fetchFonts = () =>
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (fontLoaded) {
    return (
      <Provider store={store}>
        <ShopNavigator />
      </Provider>
    );
  }

  return (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={(err) => console.log(err)}
    />
  );
}
