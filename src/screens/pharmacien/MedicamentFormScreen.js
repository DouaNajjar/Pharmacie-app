import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useMedicamentStore } from '../../store/medicamentStore';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function MedicamentFormScreen({ route, navigation }) {
  const medicament = route.params?.medicament;
  const isEditing = !!medicament;

  const { addMedicament, updateMedicament } = useMedicamentStore();

  const [nom, setNom] = useState(medicament?.nom || '');
  const [dosage, setDosage] = useState(medicament?.dosage || '');
  const [forme, setForme] = useState(medicament?.forme || '');
  const [quantiteStock, setQuantiteStock] = useState(
    medicament?.quantiteStock?.toString() || ''
  );

  const handleSubmit = async () => {
    if (!nom || !dosage || !forme || !quantiteStock) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const data = {
      nom,
      dosage,
      forme,
      quantiteStock: parseInt(quantiteStock)
    };

    if (isEditing) {
      await updateMedicament(medicament.id, data);
      Alert.alert('Succès', 'Médicament mis à jour');
    } else {
      const newMed = {
        id: `m${Date.now()}`,
        ...data
      };
      await addMedicament(newMed);
      Alert.alert('Succès', 'Médicament ajouté');
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Text style={styles.title}>
          {isEditing ? 'Modifier' : 'Ajouter'} un médicament
        </Text>
      </Card>

      <Input
        label="Nom du médicament *"
        value={nom}
        onChangeText={setNom}
        placeholder="Ex: Doliprane"
      />

      <Input
        label="Dosage *"
        value={dosage}
        onChangeText={setDosage}
        placeholder="Ex: 500 mg"
      />

      <Input
        label="Forme *"
        value={forme}
        onChangeText={setForme}
        placeholder="Ex: Comprimé, Sirop, Gélule"
      />

      <Input
        label="Quantité en stock *"
        value={quantiteStock}
        onChangeText={setQuantiteStock}
        placeholder="Ex: 120"
        keyboardType="numeric"
      />

      <Button title={isEditing ? 'Mettre à jour' : 'Ajouter'} onPress={handleSubmit} />
      <Button title="Annuler" variant="secondary" onPress={() => navigation.goBack()} />
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
    color: '#212121'
  }
});