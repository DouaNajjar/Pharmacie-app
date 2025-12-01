import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated
} from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { getOrdonnancesByPatient } from '../../api/ordonnanceService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Icon from '@expo/vector-icons/FontAwesome5';

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

  if (loading) return <LoadingSpinner />;

  const renderItem = ({ item, index }) => {
    const scale = new Animated.Value(0);

    Animated.spring(scale, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
      delay: index * 80,
    }).start();

    return (
      <Animated.View style={{ transform: [{ scale }], marginBottom: 12 }}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('OrdonnanceDetail', { ordonnance: item })
          }
          style={styles.card}
        >
          <View style={styles.cardRow}>
            <Icon
              name="file-medical"
              size={26}
              color="#4CAF50"
              style={{ marginRight: 12 }}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title || 'Ordonnance'}</Text>
              <Text style={styles.date}>{item.date || ''}</Text>
            </View>

            <Icon name="chevron-right" size={18} color="#999" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.background}>

      {/* Header simple, moderne, harmonisé */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </Text>
          </View>
          <Text style={styles.welcomeText}>Bonjour, {user?.name}</Text>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Icon name="sign-out-alt" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Vos Ordonnances</Text>

      <FlatList
        data={ordonnances}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="file-medical" size={64} color="#4CAF50" style={styles.emptyIcon} />
            <Text style={styles.empty}>Aucune ordonnance disponible</Text>
          </View>
        }
        refreshing={loading}
        onRefresh={loadOrdonnances}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarInitial: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },

  logoutBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 16,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },

  date: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },

  emptyIcon: {
    marginBottom: 14,
    opacity: 0.8,
  },

  empty: {
    fontSize: 18,
    color: '#777',
    fontStyle: 'italic',
  },
});
