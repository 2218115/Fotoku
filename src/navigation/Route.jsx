import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LikedScreen from '../screens/LikedScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Octicons from '@react-native-vector-icons/octicons';
import colors from '../assets/colors';
import {View} from 'react-native';
import AddPhotoFormScreen from '../screens/AddPhotoFormScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondary,
          tabBarIcon: ({color, size}) => (
            <Octicons name="home" color={color} size={size} />
          ),
          tabBarLabelPosition: 'beside-icon',
        }}
      />

      <Tab.Screen
        name="Liked"
        component={LikedScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondary,
          tabBarIcon: ({color, size}) => (
            <Octicons name="heart" color={color} size={size} />
          ),
          tabBarLabelPosition: 'beside-icon',
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondary,
          tabBarIcon: ({color, size}) => (
            <Octicons name="person" color={color} size={size} />
          ),
          tabBarLabelPosition: 'beside-icon',
        }}
      />
    </Tab.Navigator>
  );
};

export default Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={TabNavigator}
        options={{headerShown: false, animation: 'ios_from_right'}}
      />

      <Stack.Screen
        name="AddPhotoFormScreen"
        component={AddPhotoFormScreen}
        options={{headerShown: false, animation: 'ios_from_right'}}
      />
    </Stack.Navigator>
  );
};
