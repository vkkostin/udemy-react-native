import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../constants/colors';
import { authenticate, setDidTryAutoLogin } from '../store/actions/auth';
import { useDispatch } from 'react-redux';

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        dispatch(setDidTryAutoLogin())
        return;
      }

      const { token, userId, expiryDate } = JSON.parse(userData);

      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(setDidTryAutoLogin())
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime()

      dispatch(authenticate(userId, token, expirationTime))
    }

    tryLogin();
  }, [dispatch])

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default StartupScreen;
