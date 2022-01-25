import React from 'react';
import { FlatList, Platform, Button, Alert, View, Text } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import COLORS from '../../constants/colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = productId => () => {
    navigation.navigate('EditProduct', { productId })
  }

  const deleteHandler = itemId => () => {
    Alert.alert(
      'Are you sure?',
      'Do you really want to delete this item?',
      [
        {
          text: 'No',
          style: 'default',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteProduct(itemId))
          },
        },
      ],
    )
  }

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No products found, maybe start creating some?</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={editProductHandler(item.id)}
        >
          <Button
            color={COLORS.primary}
            title="Edit"
            onPress={editProductHandler(item.id)}
          />
          <Button
            color={COLORS.primary}
            title="Delete"
            onPress={deleteHandler(item.id)}
          />
        </ProductItem>
      )}
    />
  )
}

export const screenOptions = ({ navigation }) => ({
  headerTitle: 'Your Products',
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
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Add"
        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        onPress={() => {
          navigation.navigate('EditProduct');
        }}
      />
    </HeaderButtons>
  )
})

export default UserProductsScreen
