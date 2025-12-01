import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useMedicamentStore } from '../../store/medicamentStore';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { LinearGradient } from 'expo-linear-gradient';

export default function MedicamentListScreen({ navigation }) {
  const { medicaments, loadMedicaments, deleteMedicament } = useMedicamentStore();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => { loadData(); });
    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    setLoading(true);
    await loadMedicaments();
    setLoading(false);
  };

  const handleDelete = (id) => {
    deleteMedicament(id).then(loadData);
  };

  if (loading) return <LoadingSpinner />;

  const renderItem = ({ item, index }) => {
    const scale = new Animated.Value(0);

    Animated.spring(scale, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
      delay: index * 80
    }).start();

    const lowStock = item.quantiteStock <= 5;

    return (
      <Animated.View style={{ transform: [{ scale }], marginBottom: 14 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MedicamentForm', { medicament: item })}
          style={styles.card}
          activeOpacity={0.85}
        >
          <View style={styles.cardRow}>
            <Ionicons name="medkit-outline" size={28} color="#2196F3" style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.medName}>{item.nom}</Text>
              <Text style={styles.medDetail}>{item.dosage} - {item.forme}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text style={[styles.medStock, lowStock && { color: '#F44336', fontWeight: '700' }]}>
                  Stock: {item.quantiteStock}
                </Text>
                {lowStock && (
                  <Text style={styles.lowStockBadge}>RUPTURE</Text>
                )}
              </View>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash-outline" size={24} color="#F44336" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MedicamentForm')}
        style={{ marginBottom: 16 }}
      >
        <LinearGradient
          colors={['#2196F3', '#64B5F6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.addButton}
        >
          <Ionicons name="add-circle-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addButtonText}>Ajouter un médicament</Text>
        </LinearGradient>
      </TouchableOpacity>

      <FlatList
        data={medicaments}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={{ marginTop: 60, alignItems: 'center' }}>
            <Ionicons name="medkit-outline" size={64} color="#2196F3" style={{ marginBottom: 12 }} />
            <Text style={styles.empty}>Aucun médicament en stock</Text>
          </View>
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
    backgroundColor: '#F5F7FA',
    padding: 16
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 28,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  list: {
    paddingBottom: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  medName: { fontSize: 16, fontWeight: '600', color: '#212121' },
  medDetail: { fontSize: 14, color: '#666', marginTop: 2 },
  medStock: { fontSize: 14, color: '#2196F3', fontWeight: '500' },
  lowStockBadge: {
    marginLeft: 8,
    backgroundColor: '#F44336',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '700'
  },
  empty: { fontSize: 18, color: '#9E9E9E', textAlign: 'center' }
});
