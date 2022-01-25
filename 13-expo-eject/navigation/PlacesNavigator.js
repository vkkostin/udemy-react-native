import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import COLORS from '../constants/Colors';

const PlacesNavigator = createStackNavigator({
  Places: PlacesListScreen,
  PlaceDetail: PlaceDetailScreen,
  NewPlace: NewPlaceScreen,
  Map: MapScreen,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? COLORS.primary : '',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primary,
  }
});

export default createAppContainer(PlacesNavigator);
