import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { useCommandeStore } from '../../store/commandeStore';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Card from '../../components/common/Card';
import Icon from '@expo/vector-icons/FontAwesome5';

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

  if (loading) return <LoadingSpinner />;

  const renderItem = ({ item, index }) => {
    const scale = new Animated.Value(0);
    Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true, delay: index * 100 }).start();

    return (
      <Animated.View style={{ transform: [{ scale }], marginBottom: 12 }}>
        <TouchableOpacity onPress={() => navigation.navigate('CommandeDetail', { commandeId: item.id })}>
          <Card style={styles.card}>
            <View style={styles.cardRow}>
              <Icon name="clipboard-list" size={24} color="#4CAF50" style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>Commande #{item.id}</Text>
                <Text style={styles.date}>Créée le : {item.dateCreation}</Text>
                <Text style={[
                  styles.status,
                  item.status === 'EN_ATTENTE' && { color: '#FFA726' },
                  item.status === 'VALIDEE' && { color: '#66BB6A' },
                  item.status === 'ANNULEE' && { color: '#EF5350' }
                ]}>
                  Statut : {item.status}
                </Text>
              </View>
              <Icon name="chevron-right" size={18} color="#999" />
            </View>
          </Card>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={commandes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Aucune commande en cours</Text>}
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
    backgroundColor: '#F0F4F8'
  },
  list: {
    padding: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4
  },
  date: {
    fontSize: 13,
    color: '#616161'
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4
  },
  empty: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic'
  }
});
