import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import COLORS from '../../constants/colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';
import Card from '../../components/UI/Card';

const CartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
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
        productPushToken,
      } = state.cart.items[key];


      transformedCartItems.push({
        productId: key,
        productTitle,
        productPrice,
        quantity,
        sum,
        productPushToken,
      })
    };

    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  let orderNowButton = (
    <Button
      color={COLORS.accent}
      title="Order Now"
      onPress={sendOrderHandler}
      disabled={cartItems.length === 0}
    />
  )

  if (isLoading) {
    orderNowButton = (
      <ActivityIndicator size="small" color={COLORS.primary} />
    )
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        {orderNowButton}
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

export const screenOptions = {
  headerTitle: 'Your Cart',
}

export default CartScreen
