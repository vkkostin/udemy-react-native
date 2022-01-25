import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, Platform, Button, ActivityIndicator, View, StyleSheet, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import { addToCart } from '../../store/actions/cart'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import COLORS from '../../constants/colors';
import { fetchProducts } from '../../store/actions/products'

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true)
    
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message)
    } finally {
      setIsRefreshing(false)
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadProducts);

    return () => {
      willFocusSub.remove();
    }
  }, [loadProducts])

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (productId, productTitle) => () => {
    navigation.navigate('ProductDetail',
      {
        productId,
        productTitle,
      }
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadProducts} color={COLORS.primary} />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some.</Text>
      </View>
    )
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) =>
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={selectItemHandler(item.id, item.title)}
        >
          <Button
            color={COLORS.primary}
            title="View Details"
            onPress={selectItemHandler(item.id, item.title)}
          />
          <Button
            color={COLORS.primary}
            title="To Cart"
            onPress={() => {
              dispatch(addToCart(item))
            }}
          />
        </ProductItem>
      }
    />
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

ProductsOverviewScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'All Products',
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
        title="Cart"
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => {
          navigation.navigate('Cart')
        }}
      />
    </HeaderButtons>
  )
})

export default ProductsOverviewScreen
