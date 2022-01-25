import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import COLORS from '../../constants/colors'
import { addToCart } from '../../store/actions/cart'

const ProductDetailScreen = ({ navigation }) => {
  const productId = navigation.getParam('productId')
  const dispatch = useDispatch()

  const selectedProduct = useSelector(
    state => state.products.availableProducts.find(
      prod => prod.id === productId
    )
  )

  const {
    imageUrl,
    price,
    description,
  } = selectedProduct

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.actions}>
        <Button color={COLORS.primary} title="Add to Cart" onPress={() => {
          dispatch(addToCart(selectedProduct))
        }} />
      </View>
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans',
  },
})

ProductDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam('productTitle')
  }
}

export default ProductDetailScreen
