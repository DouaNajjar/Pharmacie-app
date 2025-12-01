import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Modal, FlatList } from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useMedicamentStore } from '../../store/medicamentStore';

const FORMES = ['Comprimé', 'Gélule', 'Sirop'];

export default function MedicamentFormScreen({ route, navigation }) {
  const medicament = route.params?.medicament;
  const isEditing = !!medicament;
  const { addMedicament, updateMedicament } = useMedicamentStore();

  const [nom, setNom] = useState(medicament?.nom || '');
  const [dosage, setDosage] = useState(medicament?.dosage || '');
  const [forme, setForme] = useState(medicament?.forme || '');
  const [quantiteStock, setQuantiteStock] = useState(medicament?.quantiteStock?.toString() || '');
  const [modalVisible, setModalVisible] = useState(false);

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
      const newMed = { id: `m${Date.now()}`, ...data };
      await addMedicament(newMed);
      Alert.alert('Succès', 'Médicament ajouté');
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Text style={styles.title}>{isEditing ? 'Modifier' : 'Ajouter'} un médicament</Text>
      </Card>

      <Input label="Nom du médicament *" value={nom} onChangeText={setNom} placeholder="Ex: Doliprane" />
      <Input label="Dosage *" value={dosage} onChangeText={setDosage} placeholder="Ex: 500 mg" />

      {/* Forme comme input */}
      <Text style={styles.label}>Forme *</Text>
      <TouchableOpacity style={styles.inputTouchable} onPress={() => setModalVisible(true)}>
        <Text style={{ color: forme ? '#000' : '#aaa' }}>{forme || 'Sélectionnez la forme'}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={FORMES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setForme(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Annuler" variant="secondary" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

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
  container: { flex: 1, backgroundColor: '#F0F4F8', padding: 16 },
  headerCard: { backgroundColor: '#E3F2FD', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '800', color: '#212121' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6, color: '#333' },
  inputTouchable: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    justifyContent: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  modalItemText: { fontSize: 16, color: '#007AFF' }
});
