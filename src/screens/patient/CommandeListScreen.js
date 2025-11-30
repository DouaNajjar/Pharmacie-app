import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { useCommandeStore } from '../../store/commandeStore';
import CommandeItem from '../../components/patient/CommandeItem';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function CommandeListScreen({ navigation }) {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const { loadCommandes } = useCommandeStore();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    setLoading(true);
    await loadCommandes();
    const data = useCommandeStore.getState().commandes.filter(c => c.patientId === user?.id);
    setCommandes(data.sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation)));
    setLoading(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={commandes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommandeItem
            commande={item}
            onPress={() => navigation.navigate('CommandeDetail', { commandeId: item.id })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune commande en cours</Text>
        }
        refreshing={loading}
        onRefresh={loadData}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  list: {
    padding: 16
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999'
  }
});