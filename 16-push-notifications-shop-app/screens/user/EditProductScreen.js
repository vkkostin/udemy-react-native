import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/products';
import Input from '../../components/UI/Input';
import COLORS from '../../constants/colors';

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

const EditProductScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const prodId = route.params ? route.params.productId : null;
  const dispatch = useDispatch();

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod =>
      prod.id === prodId
    )
  )

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

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error, [{ text: 'OK' }])
    }
  }, [error])

  const submitHandler = useCallback(async () => {
    if (!formState.isFormValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form', [{ text: 'OK' }]);
      return;
    }

    const {
      inputValues: {
        title,
        description,
        imageUrl,
        price,
      }
    } = formState;

    setError(null)
    setIsLoading(true)
    
    try {
      if (editedProduct) {
        await dispatch(updateProduct(
          prodId,
          title,
          description,
          imageUrl
        ))
      } else {
        await dispatch(createProduct(
          title,
          description,
          imageUrl,
          +price
        ))
      }
      
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, prodId, formState])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
            onPress={submitHandler}
          />
        </HeaderButtons>
      )
    })
  }, [submitHandler])

  const inputChangeHandler = useCallback((inputId, value, isValid) => {
    dispatchFormState({
      type: UPDATE,
      value,
      isValid,
      inputId,
    })
  }, [dispatchFormState])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    )
  }

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
        onInputChange={inputChangeHandler}
        required
        min={0.1}
        id="price"
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
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            isInitiallyValid={!!editedProduct}
            required
            id="title"
          />
          <Input
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            label="Image URL"
            errorText="Please enter a valid image URL!"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            isInitiallyValid={!!editedProduct}
            required
            id="imageUrl"
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
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            isInitiallyValid={!!editedProduct}
            required
            minLength={5}
            id="description"
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export const screenOptions = ({ route }) => ({
  headerTitle: route.params && route.params.productId ? 'Edit Product' : 'Add Product',
})

export default EditProductScreen
