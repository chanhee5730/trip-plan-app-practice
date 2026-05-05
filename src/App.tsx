import React from 'react';
import { Platform, UIManager } from 'react-native';
import TravelListScreen from './screens/TravelListScreen';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  return <TravelListScreen />;
};

export default App;