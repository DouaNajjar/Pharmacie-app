import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';
import OrdonnanceListScreen from '../screens/patient/OrdonnanceListScreen';
import OrdonnanceDetailScreen from '../screens/patient/OrdonnanceDetailScreen';
import CommandeCreateScreen from '../screens/patient/CommandeCreateScreen';
import CommandeListScreen from '../screens/patient/CommandeListScreen';
import CommandeDetailScreen from '../screens/patient/CommandeDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function OrdonnanceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: styles.header, headerTintColor: '#FFFFFF', headerTitleStyle: styles.headerTitle }}>
      <Stack.Screen 
        name="OrdonnanceList" 
        component={OrdonnanceListScreen}
        options={{ title: 'Mes Ordonnances' }}
      />
      <Stack.Screen 
        name="OrdonnanceDetail" 
        component={OrdonnanceDetailScreen}
        options={{ title: 'Détail Ordonnance' }}
      />
      <Stack.Screen 
        name="CommandeCreate" 
        component={CommandeCreateScreen}
        options={{ title: 'Créer Commande' }}
      />
    </Stack.Navigator>
  );
}

function CommandeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: styles.header, headerTintColor: '#FFFFFF', headerTitleStyle: styles.headerTitle }}>
      <Stack.Screen 
        name="CommandeList" 
        component={CommandeListScreen}
        options={{ title: 'Mes Commandes' }}
      />
      <Stack.Screen 
        name="CommandeDetail" 
        component={CommandeDetailScreen}
        options={{ title: 'Détail Commande' }}
      />
    </Stack.Navigator>
  );
}

export default function PatientNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Ordonnances') {
            iconName = 'file-medical-alt';
          } else if (route.name === 'Commandes') {
            iconName = 'clipboard-list';
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        headerShown: false
      })}
    >
      <Tab.Screen 
        name="Ordonnances" 
        component={OrdonnanceStack}
      />
      <Tab.Screen 
        name="Commandes" 
        component={CommandeStack}
      />
    </Tab.Navigator>
  );
}

const styles = {
  header: {
    backgroundColor: '#4CAF50',
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
