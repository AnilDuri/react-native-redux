import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}

const MealsNavigator = createStackNavigator(
    {
        Categories: { screen: CategoriesScreen, navigationOptions: { headerTitle: 'Meal Category' } },
        CategoryMeal: CategoryMealScreen,
        MealDetail: MealDetailsScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    });

const FavoritesNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailsScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    });

const FiltersNavigator = createStackNavigator({
    Filter: FiltersScreen
})

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => { return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} /> }
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            tabBarLabel: 'Favorites!',
            tabBarIcon: (tabInfo) => { return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} /> }
        }
    }
}

const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: Colors.accentColor,
        shifting: true
    })
    : createBottomTabNavigator(tabScreenConfig,
        {
            tabBarOptions: {
                activeTintColor: Colors.accentColor
            }
        }
    );

const MainNavigator = createDrawerNavigator(
    {
        MealsFavs: { screen: MealsFavTabNavigator, navigationOptions: { drawerLabel: "Meals" } },
        Filters: FiltersNavigator
    },
    {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    });

export default createAppContainer(MainNavigator);