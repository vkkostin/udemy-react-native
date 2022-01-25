import React, { useReducer, useEffect, useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import COLORS from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { signup, login } from '../../store/actions/auth';

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

const AuthScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    isFormValid: false,
  });

  const inputChangeHandler = useCallback((inputId, value, isValid) => {
    dispatchFormState({
      type: UPDATE,
      value,
      isValid,
      inputId,
    })
  }, [dispatchFormState]);

  const authHandler = async () => {
    const action = isSignup ? signup : login;
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(action(
        formState.inputValues.email,
        formState.inputValues.password
      ));
      navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred', error, [{ text: 'OK' }])
    }
  }, [error])

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={COLORS.primary} />
              ) : (
                <Button
                  title={isSignup ? 'Sign Up' : 'Login'}
                  color={COLORS.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={COLORS.accent}
                onPress={() => setIsSignup(prevState => !prevState)}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate',
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  }
});

export default AuthScreen;
