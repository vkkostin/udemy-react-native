import React from 'react';
import { ShopNavigator, AuthNavigator } from './ShopNavigator';
import StartupScreen from '../screens/StartupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const AppNavigator = () => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => !!state.auth.didTryAutoLogin);

  let Navigator

  if (isAuth) {
    Navigator = ShopNavigator
  } else {
    if (didTryAutoLogin) {
      Navigator = AuthNavigator
    } else {
      Navigator = StartupScreen
    }
  }

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  )
}

export default AppNavigator;
