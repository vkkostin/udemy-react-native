import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import { loadPlaces } from '../store/places-actions';

const PlacesListScreen = ({ navigation }) => {
  const places = useSelector(state => state.places.places)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPlaces())
  }, [dispatch])

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          image={item.imageUri}
          title={item.title}
          address={item.address}
          onSelect={() => {
            navigation.navigate('PlaceDetail', {
              placeTitle: item.title,
              placeId: item.id,
            })
          }}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({});

PlacesListScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'All Places',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
      <Item
        title="Add Place"
        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        onPress={() => {
          navigation.navigate('NewPlace')
        }}
      />
    </HeaderButtons>
  )
})

export default PlacesListScreen;
