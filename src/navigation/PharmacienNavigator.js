import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CommandeListScreen from '../screens/pharmacien/CommandeListScreen';
import CommandeDetailScreen from '../screens/pharmacien/CommandeDetailScreen';
import MedicamentListScreen from '../screens/pharmacien/MedicamentListScreen';
import MedicamentFormScreen from '../screens/pharmacien/MedicamentFormScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CommandeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: styles.header, headerTintColor: '#FFFFFF', headerTitleStyle: styles.headerTitle }}>
      <Stack.Screen 
        name="CommandeList" 
        component={CommandeListScreen}
        options={{ title: 'Commandes Reçues' }}
      />
      <Stack.Screen 
        name="CommandeDetail" 
        component={CommandeDetailScreen}
        options={{ title: 'Détail Commande' }}
      />
    </Stack.Navigator>
  );
}

function MedicamentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: styles.header, headerTintColor: '#FFFFFF', headerTitleStyle: styles.headerTitle }}>
      <Stack.Screen 
        name="MedicamentList" 
        component={MedicamentListScreen}
        options={{ title: 'Gestion Médicaments' }}
      />
      <Stack.Screen 
        name="MedicamentForm" 
        component={MedicamentFormScreen}
        options={{ title: 'Formulaire Médicament' }}
      />
    </Stack.Navigator>
  );
}

export default function PharmacienNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#2196F3', tabBarInactiveTintColor: '#9E9E9E', tabBarStyle: styles.tabBar }}>
      <Tab.Screen 
        name="Commandes" 
        component={CommandeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Médicaments" 
        component={MedicamentStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const styles = {
  header: {
    backgroundColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5
  },
  headerTitle: {
    fontWeight: '700'
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  }
};