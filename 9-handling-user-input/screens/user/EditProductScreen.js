import React, { useCallback, useEffect, useReducer } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/products';
import Input from '../../components/UI/Input';

const UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  switch (action.type) {
    case UPDATE:
      const { inputId, value, isValid } = action;

      const updatedValues = {
        ...state.inputValues,
        [inputId]: value,
      }

      const updatedValidities = {
        ...state.inputValidities,
        [inputId]: isValid,
      }

      const updatedIsFormValid = Object.values(updatedValidities).every(Boolean)

      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        isFormValid: updatedIsFormValid,
      }
    default:
      return state;
  }
}

const EditProductScreen = ({ navigation }) => {
  const prodId = navigation.getParam('productId');
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: !!editedProduct,
      imageUrl: !!editedProduct,
      description: !!editedProduct,
      price: !!editedProduct,
    },
    isFormValid: !!editedProduct,
  });

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod =>
      prod.id === prodId
    )
  )

  const submitHandler = useCallback(() => {
    if (!formState.isFormValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form', [{ text: 'OK' }]);
      return;
    }

    const {
      inputValue: {
        title,
        description,
        imageUrl,
        price,
      }
    } = formState;

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
  }, [dispatch, prodId, formState])

  useEffect(() => {
    navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  const inputChangeHandler = useCallback(inputId => (value, isValid) => {
    dispatchFormState({
      type: UPDATE,
      value,
      isValid,
      inputId,
    })
  }, [dispatchFormState])

  let priceInput = null

  if (!editedProduct) {
    priceInput = (
      <Input
        keyboardType='decimal-pad'
        autoCapitalize='sentences'
        autoCorrect
        returnKeyType='next'
        label="Price"
        errorText="Please enter a valid price!"
        onInputChange={inputChangeHandler('price')}
        required
        min={0.1}
      />
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            label="Title"
            errorText="Please enter a valid title!"
            onInputChange={inputChangeHandler('title')}
            initialValue={editedProduct ? editedProduct.title : ''}
            isInitiallyValid={!!editedProduct}
            required
          />
          <Input
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            label="Image URL"
            errorText="Please enter a valid image URL!"
            onInputChange={inputChangeHandler('imageUrl')}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            isInitiallyValid={!!editedProduct}
            required
          />
          {priceInput}
          <Input
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            label="Description"
            errorText="Please enter a valid description!"
            onInputChange={inputChangeHandler('description')}
            initialValue={editedProduct ? editedProduct.description : ''}
            isInitiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
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
