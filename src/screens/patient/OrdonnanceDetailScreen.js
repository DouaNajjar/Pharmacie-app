import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getMedicamentById } from '../../api/medicamentService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

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

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Text style={styles.title}>Ordonnance #{ordonnance.id}</Text>
        <Text style={styles.date}>Date: {ordonnance.date}</Text>
      </Card>

      <Text style={styles.sectionTitle}>Médicaments prescrits</Text>

      {medicamentsDetails.map((med, index) => (
        <Card key={index}>
          <Text style={styles.medName}>{med.nom}</Text>
          <Text style={styles.medDetail}>
            {med.dosage} - {med.forme}
          </Text>
          <Text style={styles.posologie}>
            Posologie: {med.quantiteParJour} par jour pendant {med.duree} jours
          </Text>
        </Card>
      ))}

      <Button
        title="Créer une commande"
        onPress={() => navigation.navigate('CommandeCreate', { ordonnance })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 16
  },
  headerCard: {
    backgroundColor: '#E8F5E9'
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#212121',
    marginBottom: 8
  },
  date: {
    fontSize: 14,
    color: '#616161'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#424242',
    marginTop: 24,
    marginBottom: 12
  },
  medName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4
  },
  medDetail: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 4
  },
  posologie: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600'
  }
});