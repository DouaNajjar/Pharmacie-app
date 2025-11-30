import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { getOrdonnancesByPatient } from '../../api/ordonnanceService';
import OrdonnanceItem from '../../components/patient/OrdonnanceItem';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function OrdonnanceListScreen({ navigation }) {
  const [ordonnances, setOrdonnances] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadOrdonnances();
    });
    return unsubscribe;
  }, [navigation]);

  const loadOrdonnances = async () => {
    setLoading(true);
    const data = await getOrdonnancesByPatient(user?.id || '');
    setOrdonnances(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bonjour, {user?.name || 'Utilisateur'}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={ordonnances}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrdonnanceItem
            ordonnance={item}
            onPress={() => navigation.navigate('OrdonnanceDetail', { ordonnance: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune ordonnance disponible</Text>
        }
        refreshing={loading}
        onRefresh={loadOrdonnances}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD'
  },
  welcome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  logout: {
    color: '#DC3545',
    fontWeight: '600'
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999'
  }
});