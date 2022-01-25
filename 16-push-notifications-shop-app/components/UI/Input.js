import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      const { value, isValid } = action;

      return {
        ...state,
        value,
        isValid,
      }

    case INPUT_BLUR: 
      return {
        ...state,
        touched: true,
      }

    default:
      return state;
  }
}

const Input = props => {
  const {
    label,
    errorText,
    initialValue,
    isInitiallyValid,
    required,
    email,
    min,
    max,
    minLength,
    onInputChange,
    id,
  } = props;

  const checkValidity = text => {
    if (required && text.trim().length === 0) {
      return false;
    }
    if (email && !EMAIL_REGEX.test(text.toLowerCase())) {
      return false;
    }
    if (min != null && +text < min) {
      return false;
    }
    if (max != null && +text > max) {
      return false;
    }
    if (minLength != null && text.length < minLength) {
      return false;
    }

    return true
  }

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isValid: isInitiallyValid,
    touched: false,
  })

  const textChangeHandler = text => {
    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: checkValidity(text)
    })
  }

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR })
  }

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid)
    }
  }, [inputState, onInputChange, id])

  let errorMessage = null

  if (!inputState.isValid && inputState.touched) {
    errorMessage = (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
    )
  }

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {errorMessage}
    </View>
  )
}

const styles = StyleSheet.create({
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
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13,
  },
});

export default Input;