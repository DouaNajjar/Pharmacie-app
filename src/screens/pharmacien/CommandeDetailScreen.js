import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { getCommandeById, updateCommandeStatus } from '../../api/commandeService';
import { getOrdonnanceById } from '../../api/ordonnanceService';
import { getMedicamentById } from '../../api/medicamentService';
import { COMMANDE_STATUS, STATUS_LABELS } from '../../utils/constants';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import CommandeStatusBadge from '../../components/pharmacien/CommandeStatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function CommandeDetailScreen({ route, navigation }) {
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

  const handleUpdateStatus = async (newStatus) => {
    await updateCommandeStatus(commandeId, newStatus);
    Alert.alert('Succès', `Statut mis à jour: ${STATUS_LABELS[newStatus]}`);
    loadDetails();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const getNextStatus = () => {
    if (commande.status === COMMANDE_STATUS.EN_ATTENTE) {
      return COMMANDE_STATUS.EN_PREPARATION;
    }
    if (commande.status === COMMANDE_STATUS.EN_PREPARATION) {
      return COMMANDE_STATUS.PRETE;
    }
    return null;
  };

  const nextStatus = getNextStatus();

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Text style={styles.title}>Commande #{commande.id}</Text>
        <Text style={styles.date}>Reçue le: {commande.dateCreation}</Text>
        <View style={styles.statusContainer}>
          <CommandeStatusBadge status={commande.status} />
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Informations patient</Text>
        <Text style={styles.info}>Patient ID: {commande.patientId}</Text>
        <Text style={styles.info}>Livraison: {commande.lieuLivraison}</Text>
        {commande.remarques && (
          <Text style={styles.info}>Remarques: {commande.remarques}</Text>
        )}
      </Card>

      <Text style={styles.sectionTitle}>Médicaments à préparer</Text>
      {medicaments.map((med, index) => (
        <Card key={index}>
          <Text style={styles.medName}>{med.nom}</Text>
          <Text style={styles.medDetail}>
            {med.dosage} - {med.forme}
          </Text>
          <Text style={styles.posologie}>
            Quantité: {med.quantiteParJour * med.duree} unités
          </Text>
        </Card>
      ))}

      {nextStatus && (
        <Button
          title={`Passer au statut: ${STATUS_LABELS[nextStatus]}`}
          onPress={() => handleUpdateStatus(nextStatus)}
        />
      )}
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
    backgroundColor: '#E3F2FD'
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