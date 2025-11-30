import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from '../store/authStore';
import AuthNavigator from './AuthNavigator';
import PatientNavigator from './PatientNavigator';
import PharmacienNavigator from './PharmacienNavigator';
import { USER_ROLES } from '../utils/constants';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, isLoading, loadCurrentUser } = useAuthStore();

  useEffect(() => {
    loadCurrentUser();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : user.role === USER_ROLES.PATIENT ? (
        <Stack.Screen name="Patient" component={PatientNavigator} />
      ) : user.role === USER_ROLES.PHARMACIEN ? (
        <Stack.Screen name="Pharmacien" component={PharmacienNavigator} />
      ) : null}
    </Stack.Navigator>
  );
}