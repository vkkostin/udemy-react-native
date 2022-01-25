// React Imports
import React from 'react';
import { Platform, SafeAreaView, Button, View } from "react-native";
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

// Screen Imports
import ProductsOverviewScreen, { screenOptions as productOverviewScreenOptions } from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, { screenOptions as productDetailScreenOptions } from "../screens/shop/ProductDetailScreen";
import UserProductsScreen, { screenOptions as userProductsScreenOptions } from '../screens/user/UserProductsScreen';
import EditProductScreen, { screenOptions as editProductScreenOptions } from '../screens/user/EditProductScreen';
import CartScreen, { screenOptions as cartScreenOptions } from "../screens/shop/CartScreen";
import OrdersScreen, { screenOptions as ordersScreenOptions } from "../screens/shop/OrdersScreen";
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';

// Miscellaneous Imports
import COLORS from '../constants/colors'
import { Ionicons } from '@expo/vector-icons';
import { logout } from '../store/actions/auth';

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

const getIconFor = icon => ({ color }) =>
  <Ionicons
    name={Platform.OS === 'android' ? `md-${icon}` : `ios-${icon}`}
    size={23}
    color={color}
  />

const ProductsStackNavigator = createStackNavigator();
const OrdersStackNavigator = createStackNavigator();
const AdminStackNavigator = createStackNavigator();
const ShopDrawerNavigator = createDrawerNavigator();
const AuthStackNavigator = createStackNavigator();

const ProductsNavigator = () => (
  <ProductsStackNavigator.Navigator
    screenOptions={defaultNavigationOptions}
  >
    <ProductsStackNavigator.Screen
      name="ProductOverview"
      component={ProductsOverviewScreen}
      options={productOverviewScreenOptions}
    />
    <ProductsStackNavigator.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={productDetailScreenOptions}
    />
    <ProductsStackNavigator.Screen
      name="Cart"
      component={CartScreen}
      options={cartScreenOptions}
    />
  </ProductsStackNavigator.Navigator>
)

const OrdersNavigator = () => (
  <OrdersStackNavigator.Navigator
    screenOptions={defaultNavigationOptions}
  >
    <OrdersStackNavigator.Screen
      name="Orders"
      component={OrdersScreen}
      options={ordersScreenOptions}
    />
  </OrdersStackNavigator.Navigator>
)

const AdminNavigator = () => (
  <AdminStackNavigator.Navigator
    screenOptions={defaultNavigationOptions}
  >
    <AdminStackNavigator.Screen
      name="UserProducts"
      component={UserProductsScreen}
      options={userProductsScreenOptions}
    />
    <AdminStackNavigator.Screen
      name="EditProduct"
      component={EditProductScreen}
      options={editProductScreenOptions}
    />
  </AdminStackNavigator.Navigator>
)

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => (
        <View style={{ flex: 1, padding: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItemList {...props} />
            <Button title="Logout" color={COLORS.primary} onPress={() => {
              dispatch(logout());
            }} />
          </SafeAreaView>
        </View>
      )}
      drawerContentOptions={{ activeTintColor: COLORS.primary }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{ drawerIcon: getIconFor('cart') }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{ drawerIcon: getIconFor('list') }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{ drawerIcon: getIconFor('create') }}
      />
    </ShopDrawerNavigator.Navigator>
  )
}

export const AuthNavigator = () => (
  <AuthStackNavigator.Navigator
    screenOptions={defaultNavigationOptions}
  >
    <AuthStackNavigator.Screen 
      name="Auth"
      component={AuthScreen}
      options={authScreenOptions}
    />
  </AuthStackNavigator.Navigator>
)
