import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { getMedicamentById } from '../../api/medicamentService';
import Card from '../../components/common/Card';
import Icon from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

export default function OrdonnanceDetailScreen({ route, navigation }) {
  const { ordonnance } = route.params;
  const [medicamentsDetails, setMedicamentsDetails] = useState([]);

  useEffect(() => {
    loadMedicaments();
  }, []);

  const loadMedicaments = async () => {
    const details = await Promise.all(
      ordonnance.medicaments.map(async (med) => {
        const medicament = await getMedicamentById(med.idMedicament);
        return { ...med, ...medicament };
      })
    );
    setMedicamentsDetails(details);
  };

  // Animation bouton
  const scaleAnim = new Animated.Value(1);
  const onPressIn = () => Animated.spring(scaleAnim, { toValue: 0.94, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER PROPRE */}
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <Icon name="file-prescription" size={28} color="#4CAF50" style={{ marginRight: 14 }} />
            <View>
              <Text style={styles.title}>Ordonnance #{ordonnance.id}</Text>
              <Text style={styles.date}>Émise le {ordonnance.date}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Médicaments prescrits</Text>

        {/* LISTE DES MÉDICAMENTS */}
        {medicamentsDetails.map((med, index) => (
          <View key={index} style={styles.medCard}>
            <View style={styles.medRow}>
              <View style={styles.medIcon}>
                <Icon
                  name={
                    med.forme === 'sirop'
                      ? 'prescription-bottle'
                      : med.forme === 'injectable'
                      ? 'syringe'
                      : 'capsules'
                  }
                  size={24}
                  color="#4CAF50"
                />
              </View>

              <View style={styles.medInfo}>
                <Text style={styles.medName}>{med.nom}</Text>
                <Text style={styles.medDetail}>{med.dosage} – {med.forme}</Text>
                <Text style={styles.posologie}>
                  {med.quantiteParJour}/jour pendant {med.duree} jours
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* BOUTON CRÉER COMMANDE */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }], marginTop: 20 }}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('CommandeCreate', { ordonnance })}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            <LinearGradient
              colors={['#4CAF50', '#66BB6A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.createButton}
            >
              <Icon name="shopping-cart" size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.createButtonText}>Créer une commande</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  container: {
    padding: 16,
    paddingBottom: 40,
  },

  // HEADER
  headerCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '700', color: '#1B5E20' },
  date: { fontSize: 13, color: '#616161', marginTop: 2 },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 14,
  },

  // MÉDICAMENT CARD
  medCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    elevation: 4,
  },

  medRow: { flexDirection: 'row', alignItems: 'center' },

  medIcon: {
    marginRight: 14,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  medInfo: { flex: 1 },

  medName: { fontSize: 16, fontWeight: '700', color: '#212121' },
  medDetail: { fontSize: 13, color: '#616161', marginTop: 2 },
  posologie: { fontSize: 13, color: '#4CAF50', fontWeight: '600', marginTop: 4 },

  // BOUTON
  createButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 28,
    elevation: 5,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
