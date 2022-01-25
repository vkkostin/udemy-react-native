import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/products';

const EditProductScreen = ({ navigation }) => {
  const prodId = navigation.getParam('productId');
  const dispatch = useDispatch();

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod =>
      prod.id === prodId
    )
  )

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
  const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')

  let priceInput = null

  if (!editedProduct) {
    priceInput = (
      <View style={styles.formControl}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={text => setPrice(text)}
        />
      </View>
    )
  }

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(updateProduct(
        prodId,
        title,
        description,
        imageUrl
      ))
    } else {
      dispatch(createProduct(
        title,
        description,
        imageUrl,
        +price
      ))
    }
    navigation.goBack()
  }, [dispatch, prodId, title, description, imageUrl, price])

  useEffect(() => {
    navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {priceInput}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

EditProductScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Save"
        iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
        onPress={navigation.getParam('submit')}
      />
    </HeaderButtons>
  )
})

export default EditProductScreen
