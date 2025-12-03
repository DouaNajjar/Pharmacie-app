import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeData } from './src/data/seedData';

export default function App() {
  useEffect(() => {
    async function init() {
      await initializeData();   // Charge les données SEULEMENT si elles n'existent pas
    }
    init();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
