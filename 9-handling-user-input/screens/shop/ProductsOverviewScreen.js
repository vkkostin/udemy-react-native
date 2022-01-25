import React from 'react'
import { FlatList, Platform, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import { addToCart } from '../../store/actions/cart'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import COLORS from '../../constants/colors'

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector(state => state.products.availableProducts)
  const dispatch = useDispatch()

  const selectItemHandler = (productId, productTitle) => () => {
    navigation.navigate('ProductDetail',
      {
        productId,
        productTitle,
      }
    )
  }

  return (
    <FlatList
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
