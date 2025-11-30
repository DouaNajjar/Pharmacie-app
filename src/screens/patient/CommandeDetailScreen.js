import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getCommandeById } from '../../api/commandeService';
import { getOrdonnanceById } from '../../api/ordonnanceService';
import { getMedicamentById } from '../../api/medicamentService';
import Card from '../../components/common/Card';
import CommandeStatusBadge from '../../components/pharmacien/CommandeStatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function CommandeDetailScreen({ route }) {
  const { commandeId } = route.params;
  const [commande, setCommande] = useState(null);
  const [ordonnance, setOrdonnance] = useState(null);
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    const cmd = await getCommandeById(commandeId);
    setCommande(cmd);

    const ord = await getOrdonnanceById(cmd.ordonnanceId);
    setOrdonnance(ord);

    const meds = await Promise.all(
      ord.medicaments.map(async (med) => {
        const medicament = await getMedicamentById(med.idMedicament);
        return { ...med, ...medicament };
      })
    );
    setMedicaments(meds);
    setLoading(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Text style={styles.title}>Commande #{commande.id}</Text>
        <Text style={styles.date}>Créée le: {commande.dateCreation}</Text>
        <View style={styles.statusContainer}>
          <CommandeStatusBadge status={commande.status} />
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Informations</Text>
        <Text style={styles.info}>Pharmacie: {commande.pharmacienId}</Text>
        <Text style={styles.info}>Livraison: {commande.lieuLivraison}</Text>
        {commande.remarques && (
          <Text style={styles.info}>Remarques: {commande.remarques}</Text>
        )}
      </Card>

      <Text style={styles.sectionTitle}>Médicaments</Text>
      {medicaments.map((med, index) => (
        <Card key={index}>
          <Text style={styles.medName}>{med.nom}</Text>
          <Text style={styles.medDetail}>
            {med.dosage} - {med.forme}
          </Text>
          <Text style={styles.posologie}>
            {med.quantiteParJour} par jour × {med.duree} jours
          </Text>
        </Card>
      ))}
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
    marginBottom: 4
  },
  date: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 12
  },
  statusContainer: {
    marginTop: 8
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#424242',
    marginBottom: 8
  },
  info: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 4
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