import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { useCommandeStore } from '../../store/commandeStore';
import { COMMANDE_STATUS } from '../../utils/constants';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function CommandeCreateScreen({ route, navigation }) {
  const { ordonnance } = route.params;
  const { user } = useAuthStore();
  const { addCommande } = useCommandeStore();

  const [pharmacieId, setPharmacieId] = useState('');
  const [lieuLivraison, setLieuLivraison] = useState('');
  const [remarques, setRemarques] = useState('');

  const handleCreate = async () => {
    if (!pharmacieId || !lieuLivraison) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newCommande = {
      id: `c${Date.now()}`,
      ordonnanceId: ordonnance.id,
      patientId: user.id,
      pharmacienId: pharmacieId,
      status: COMMANDE_STATUS.EN_ATTENTE,
      dateCreation: new Date().toISOString().split('T')[0],
      lieuLivraison,
      remarques
    };

    await addCommande(newCommande);
    Alert.alert('Succès', 'Commande créée avec succès', [
      { text: 'OK', onPress: () => navigation.navigate('Commandes') }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Text style={styles.title}>Nouvelle Commande</Text>
        <Text style={styles.subtitle}>Ordonnance #{ordonnance.id}</Text>
      </Card>

      <Input
        label="ID Pharmacie *"
        value={pharmacieId}
        onChangeText={setPharmacieId}
        placeholder="ex: u333 (Pharmacie Centrale)"
      />

      <Input
        label="Lieu de livraison *"
        value={lieuLivraison}
        onChangeText={setLieuLivraison}
        placeholder="Adresse de livraison"
      />

      <Input
        label="Remarques"
        value={remarques}
        onChangeText={setRemarques}
        placeholder="Informations complémentaires (optionnel)"
      />

      <Button title="Créer la commande" onPress={handleCreate} />
      <Button
        title="Annuler"
        variant="secondary"
        onPress={() => navigation.goBack()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#666'
  }
});