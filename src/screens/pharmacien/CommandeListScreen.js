import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuthStore } from '../../store/authStore';
import { useCommandeStore } from '../../store/commandeStore';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function CommandeListScreen({ navigation }) {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuthStore();
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
    const data = useCommandeStore.getState().commandes
      .filter(c => c.pharmacienId === user?.id)
      .sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation));
    setCommandes(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading) return <LoadingSpinner />;

  const renderItem = ({ item, index }) => {
    const scale = new Animated.Value(0);
    Animated.spring(scale, { toValue: 1, friction: 7, useNativeDriver: true, delay: index * 50 }).start();

    return (
      <Animated.View style={{ transform: [{ scale }], marginBottom: 14 }}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('CommandeDetail', { commandeId: item.id })}
          style={styles.card}
        >
          <Ionicons name="receipt-outline" size={28} color="#2196F3" style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.commandeId}>Commande #{item.id}</Text>
            <Text style={styles.date}>{new Date(item.dateCreation).toLocaleDateString()}</Text>
            <Text style={[styles.status, 
              item.status === 'En attente' ? {color: '#FFC107'} :
              item.status === 'Validée' ? {color: '#4CAF50'} :
              item.status === 'Annulée' ? {color: '#F44336'} :
              {color: '#2196F3'}
            ]}>Statut: {item.status}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="medkit-outline" size={26} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.welcome}>Pharmacie - {user?.name || 'Pharmacien'}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={commandes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="file-tray-outline" size={64} color="#2196F3" />
            <Text style={styles.empty}>Aucune commande reçue</Text>
          </View>
        }
        refreshing={loading}
        onRefresh={loadData}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  welcome: { fontSize: 18, fontWeight: '600', color: '#fff' },
  logoutBtn: { padding: 6 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  commandeId: { fontSize: 16, fontWeight: '700', color: '#212121' },
  date: { fontSize: 13, color: '#616161', marginTop: 2 },
  status: { fontSize: 13, fontWeight: '600', marginTop: 2 },
  emptyContainer: { alignItems: 'center', marginTop: 80 },
  empty: { fontSize: 18, color: '#2196F3', fontStyle: 'italic', marginTop: 12 },
});
