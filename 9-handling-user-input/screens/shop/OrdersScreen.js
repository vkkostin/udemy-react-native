import React from 'react';
import { Text, FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = () => {
  const orders = useSelector(state => state.orders.orders)

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

OrdersScreen.navigationOptions = ({ navigation }) => ({
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
