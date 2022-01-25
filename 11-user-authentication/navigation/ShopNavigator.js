import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Platform, SafeAreaView, Button, View } from "react-native";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import COLORS from '../constants/colors'
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth'

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? COLORS.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primary,
}

const getIconFor = icon => drawerConfig =>
  <Ionicons
    name={Platform.OS === 'android' ? `md-${icon}` : `ios-${icon}`}
    size={23}
    color={drawerConfig.tintColor}
  />

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailScreen,
  Cart: CartScreen,
}, {
  navigationOptions: {
    drawerIcon: getIconFor('cart')
  },
  defaultNavigationOptions,
});

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen
}, {
  navigationOptions: {
    drawerIcon: getIconFor('list')
  },
  defaultNavigationOptions,
})

const AdminNavigator = createStackNavigator({
  UserProducts: UserProductsScreen,
  EditProduct: EditProductScreen,
}, {
  navigationOptions: {
    drawerIcon: getIconFor('create')
  },
  defaultNavigationOptions,
})

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
  Admin: AdminNavigator,
}, {
  contentOptions: {
    activeTintColor: COLORS.primary
  },
  contentComponent: props => {
    const dispatch = useDispatch();

    return (
      <View style={{ flex: 1, padding: 20 }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerNavigatorItems {...props} />
          <Button title="Logout" color={COLORS.primary} onPress={() => {
            dispatch(logout());
          }} />
        </SafeAreaView>
      </View>
    )
  }
});

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen,
}, {
  defaultNavigationOptions
})

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
})

export default createAppContainer(MainNavigator)
