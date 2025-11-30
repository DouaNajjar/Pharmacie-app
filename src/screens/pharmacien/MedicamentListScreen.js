import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useMedicamentStore } from '../../store/medicamentStore';
import MedicamentItem from '../../components/pharmacien/MedicamentItem';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function MedicamentListScreen({ navigation }) {
  const { medicaments, loadMedicaments, deleteMedicament } = useMedicamentStore();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    setLoading(true);
    await loadMedicaments();
    setLoading(false);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmation',
      'Voulez-vous vraiment supprimer ce médicament?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await deleteMedicament(id);
            loadData();
          }
        }
      ]
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('MedicamentForm')}
      >
        <Text style={styles.addButtonText}>+ Ajouter un médicament</Text>
      </TouchableOpacity>

      <FlatList
        data={medicaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicamentItem
            medicament={item}
            onEdit={() => navigation.navigate('MedicamentForm', { medicament: item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucun médicament en stock</Text>
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
    backgroundColor: '#F0F4F8',
    padding: 16
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  list: {
    paddingBottom: 16
  },
  empty: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 18,
    color: '#9E9E9E'
  }
});