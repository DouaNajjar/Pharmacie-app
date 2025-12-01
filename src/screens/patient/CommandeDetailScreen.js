import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getCommandeById } from '../../api/commandeService';
import { getOrdonnanceById } from '../../api/ordonnanceService';
import { getMedicamentById } from '../../api/medicamentService';
import Card from '../../components/common/Card';
import CommandeStatusBadge from '../../components/pharmacien/CommandeStatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Icon from '@expo/vector-icons/FontAwesome5';

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

  if (loading) return <LoadingSpinner />;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <View style={styles.headerRow}>
          <Icon name="file-medical-alt" size={28} color="#4CAF50" style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Commande #{commande.id}</Text>
            <Text style={styles.date}>Créée le: {commande.dateCreation}</Text>
          </View>
          <CommandeStatusBadge status={commande.status} />
        </View>
      </Card>

      {/* Informations */}
      <Card style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Informations</Text>
        <View style={styles.infoRow}>
          <Icon name="clinic-medical" size={20} color="#4CAF50" style={styles.infoIcon} />
          <Text style={styles.info}>Pharmacie: {commande.pharmacienId}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="map-marker-alt" size={20} color="#4CAF50" style={styles.infoIcon} />
          <Text style={styles.info}>  Livraison: {commande.lieuLivraison}</Text>
        </View>
        {commande.remarques ? (
          <View style={styles.infoRow}>
            <Icon name="sticky-note" size={20} color="#4CAF50" style={styles.infoIcon} />
            <Text style={styles.info}> Remarques: {commande.remarques}</Text>
          </View>
        ) : null}
      </Card>

      {/* Médicaments */}
      <Text style={styles.sectionTitle}>Médicaments prescrits</Text>
      {medicaments.map((med, index) => (
        <Card key={index} style={styles.medCard}>
          <View style={styles.medRow}>
            <Icon name="pills" size={20} color="#4CAF50" style={{ marginRight: 12 }} />
            <View>
              <Text style={styles.medName}>{med.nom}</Text>
              <Text style={styles.medDetail}>
                {med.dosage} - {med.forme}
              </Text>
              <Text style={styles.posologie}>
                {med.quantiteParJour} par jour × {med.duree} jours
              </Text>
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 16,
  },
  headerCard: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 18,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212121',
  },
  date: {
    fontSize: 14,
    color: '#616161',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#424242',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoIcon: {
    marginRight: 10,
  },
  info: {
    fontSize: 14,
    color: '#616161',
  },
  medCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  medName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 2,
  },
  medDetail: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 2,
  },
  posologie: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
});
