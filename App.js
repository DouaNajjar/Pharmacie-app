import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeData } from './src/data/seedData';
import { clearAll } from './src/api/asyncStorage';  

export default function App() {
  useEffect(() => {
    async function resetAndInit() {
      await clearAll();  // Efface tout
      await initializeData();  // Recharge les données seed (utilisateurs inclus)
    }
    resetAndInit();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}