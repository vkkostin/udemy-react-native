import React, { useEffect, useState } from 'react';
import { FlatList, Platform, ActivityIndicator, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';
import { fetchOrders } from '../../store/actions/orders';
import COLORS from '../../constants/colors';

const OrdersScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      await dispatch(fetchOrders());
      setIsLoading(false);
    }

    loadOrders()
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    )
  }

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No orders found, maybe start creating some?</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <OrderItem
          amount={item.totalAmount}
          date={item.readableDate}
          items={item.items}
        />
      )}
    />
  )
}

export const screenOptions = ({ navigation }) => ({
  headerTitle: 'Your Orders',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  ),
})

export default OrdersScreen
