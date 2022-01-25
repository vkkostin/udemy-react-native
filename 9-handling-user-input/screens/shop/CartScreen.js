import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import COLORS from '../../constants/colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';
import Card from '../../components/UI/Card';

const CartScreen = () => {
  const dispatch = useDispatch();

  const cartTotalAmount = useSelector(state => state.cart.totalAmount)

  const cartItems = useSelector(state => {
    const transformedCartItems = [];

    for (const key in state.cart.items) {
      const {
        productTitle,
        productPrice,
        quantity,
        sum,
      } = state.cart.items[key];


      transformedCartItems.push({
        productId: key,
        productTitle,
        productPrice,
        quantity,
        sum,
      })
    };

    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        <Button
          color={COLORS.accent}
          title="Order Now"
          onPress={() => {
            dispatch(addOrder(cartItems, cartTotalAmount))
          }}
          disabled={cartItems.length === 0}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={({ productId }) => productId}
        renderItem={({ item }) =>
          <CartItem
            quantity={item.quantity}
            title={item.productTitle}
            amount={item.sum}
            deletable
            onRemove={() => {
              dispatch(removeFromCart(item.productId))
            }}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: COLORS.primary
  },
})

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
}

export default CartScreen
