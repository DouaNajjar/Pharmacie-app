import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { getCommandeById, updateCommandeStatus } from '../../api/commandeService';
import { getOrdonnanceById } from '../../api/ordonnanceService';
import { getMedicamentById, updateMedicament } from '../../api/medicamentService';
import { getPatientById } from '../../api/patientService';
import { COMMANDE_STATUS, STATUS_LABELS } from '../../utils/constants';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CommandeDetailScreen({ route, navigation }) {
  const { commandeId } = route.params;
  const [commande, setCommande] = useState(null);
  const [ordonnance, setOrdonnance] = useState(null);
  const [patient, setPatient] = useState(null);
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadDetails(); }, []);

  const loadDetails = async () => {
    setLoading(true);
    try {
      const cmd = await getCommandeById(commandeId);
      setCommande(cmd);
      // load patient info (if available)
      try {
        const p = await getPatientById(cmd.patientId);
        setPatient(p || null);
      } catch (err) {
        setPatient(null);
      }
      const ord = await getOrdonnanceById(cmd.ordonnanceId);
      setOrdonnance(ord);
      const meds = await Promise.all(ord.medicaments.map(async (med) => {
        const medicament = await getMedicamentById(med.idMedicament);
        return { ...med, ...medicament };
      }));
      setMedicaments(meds);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les détails de la commande');
    } finally {
      setLoading(false);
    }
  };

  const checkStock = () => {
    let sufficient = true;
    medicaments.forEach(med => {
      const required = med.quantiteParJour * med.duree;
      if (med.quantiteStock < required) {
        Alert.alert('Stock insuffisant', `Pas assez de ${med.nom} en stock (requis: ${required}, disponible: ${med.quantiteStock})`);
        sufficient = false;
      }
    });
    return sufficient;
  };

  const deductStock = async () => {
    try {
      for (const med of medicaments) {
        const required = med.quantiteParJour * med.duree;
        const newStock = med.quantiteStock - required;
        await updateMedicament(med.id, { quantiteStock: newStock });
      }
      await loadDetails();
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la mise à jour du stock');
      throw error;
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      if (newStatus === COMMANDE_STATUS.EN_PREPARATION && !checkStock()) return;
      if (newStatus === COMMANDE_STATUS.PRETE) await deductStock();
      await updateCommandeStatus(commandeId, newStatus);
      Alert.alert('Succès', `Statut mis à jour: ${STATUS_LABELS[newStatus]}`);
      await loadDetails();
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la mise à jour du statut');
    }
  };

  if (loading) return <LoadingSpinner />;

  const getNextStatus = () => {
    if (commande.status === COMMANDE_STATUS.EN_ATTENTE) return COMMANDE_STATUS.EN_PREPARATION;
    if (commande.status === COMMANDE_STATUS.EN_PREPARATION) return COMMANDE_STATUS.PRETE;
    return null;
  };
  const nextStatus = getNextStatus();

  const statusColor = (status) => {
    switch(status){
      case COMMANDE_STATUS.EN_ATTENTE: return '#FFC107';
      case COMMANDE_STATUS.EN_PREPARATION: return '#2196F3';
      case COMMANDE_STATUS.PRETE: return '#4CAF50';
      case COMMANDE_STATUS.ANNULEE: return '#F44336';
      default: return '#2196F3';
    }
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Ionicons name="receipt-outline" size={24} color="#2196F3" style={{ marginRight: 8 }} />
          <Text style={styles.title}>{`Commande #${commande.id}`}</Text>
        </View>
        <Text style={styles.date}>Reçue le: {new Date(commande.dateCreation).toLocaleString()}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor(commande.status) }]}>
          <Text style={styles.statusText}>{STATUS_LABELS[commande.status]}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Ionicons name="person-outline" size={22} color="#2196F3" style={{ marginRight: 8 }} />
          <Text style={styles.sectionTitle}>Informations patient</Text>
        </View>
        <Text style={styles.info}>Patient ID: {commande.patientId}</Text>
        <Text style={styles.info}>
          Nom: {patient ? (patient.prenom && patient.nom ? `${patient.prenom} ${patient.nom}` : (patient.name || `${patient.prenom || ''} ${patient.nom || ''}`)) : '—'}
        </Text>
        <Text style={styles.info}>Livraison: {commande.lieuLivraison}</Text>
        {commande.remarques && <Text style={styles.info}>Remarques: {commande.remarques}</Text>}
      </View>

      <Text style={styles.sectionTitle}>Médicaments à préparer</Text>
      {medicaments.map((med, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.headerRow}>
            <Ionicons name="medkit-outline" size={22} color="#2196F3" style={{ marginRight: 8 }} />
            <Text style={styles.medName}>{med.nom}</Text>
          </View>
          <Text style={styles.medDetail}>{med.dosage} - {med.forme}</Text>
          <Text style={styles.posologie}>Quantité: {med.quantiteParJour * med.duree} unités</Text>
          <Text style={styles.stock}>Stock disponible: {med.quantiteStock}</Text>
        </View>
      ))}

      {nextStatus && (
        <TouchableOpacity style={styles.button} onPress={() => handleUpdateStatus(nextStatus)}>
          <Text style={styles.buttonText}>Passer au statut: {STATUS_LABELS[nextStatus]}</Text>
        </TouchableOpacity>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: '#F5F7FA', padding:16 },
  card: { 
    backgroundColor: '#fff', 
    borderRadius:18, 
    padding:16, 
    marginBottom:14, 
    shadowColor:'#000', 
    shadowOffset:{width:0,height:4}, 
    shadowOpacity:0.1, 
    shadowRadius:6, 
    elevation:3 
  },
  headerRow: { flexDirection:'row', alignItems:'center', marginBottom:6 },
  title: { fontSize:18, fontWeight:'700', color:'#212121' },
  date: { fontSize:13, color:'#666', marginBottom:6 },
  statusBadge: { paddingHorizontal:12, paddingVertical:4, borderRadius:12, alignSelf:'flex-start', marginTop:4 },
  statusText: { color:'#fff', fontWeight:'600' },
  sectionTitle: { fontSize:16, fontWeight:'600', color:'#2196F3', marginBottom:8 },
  info: { fontSize:14, color:'#666', marginBottom:4 },
  medName: { fontSize:16, fontWeight:'600', color:'#212121' },
  medDetail: { fontSize:14, color:'#666', marginBottom:4 },
  posologie: { fontSize:14, color:'#2196F3', fontWeight:'500', marginBottom:4 },
  stock: { fontSize:14, color:'#4CAF50', fontWeight:'500' },
  button: { 
    backgroundColor:'#2196F3', 
    paddingVertical:14, 
    borderRadius:28, 
    alignItems:'center', 
    marginTop:16, 
    marginBottom:24 
  },
  buttonText: { color:'#fff', fontWeight:'700', fontSize:16 }
});
