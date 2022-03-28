import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';

import MealsNavigator from './navigation/MealsNavigator';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import mealsReducer from './store/reducers/mealsReducers';

enableScreens();

const rootReducers = combineReducers({
  meals: mealsReducer
})

const store = createStore(rootReducers);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }

  return (
  <Provider store={store}>
    <MealsNavigator />
  </Provider>)
}
