import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { useCommandeStore } from '../../store/commandeStore';
import { COMMANDE_STATUS } from '../../utils/constants';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import pharmacieList from '../../data/pharmacieList.json';
import Icon from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

export default function CommandeCreateScreen({ route, navigation }) {
  const { ordonnance } = route.params;
  const { user } = useAuthStore();
  const { addCommande } = useCommandeStore();

  const [pharmacieId, setPharmacieId] = useState(pharmacieList[0]?.id || '');
  const [lieuLivraison, setLieuLivraison] = useState('');
  const [remarques, setRemarques] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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

  const renderInputField = (iconName, placeholder, value, onChangeText, multiline = false) => (
    <View style={styles.inputRow}>
      <Icon name={iconName} size={20} color="#4CAF50" style={{ marginRight: 10 }} />
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        containerStyle={{
          flex: 1,
          height: 50,
          backgroundColor: '#F5F5F5',
          borderRadius: 12,
          paddingHorizontal: 12,
          justifyContent: 'center',
        }}
        inputStyle={{
          textAlignVertical: 'center',
          paddingTop: multiline ? 12 : 0
        }}
      />
    </View>
  );

  const selectedPharmacie = pharmacieList.find(p => p.id === pharmacieId);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      {/* Header */}
      <Card style={styles.headerCard}>
        <View style={styles.headerRow}>
          <Icon name="file-medical-alt" size={28} color="#4CAF50" style={{ marginRight: 12 }} />
          <View>
            <Text style={styles.title}>Nouvelle Commande</Text>
            <Text style={styles.subtitle}>Ordonnance #{ordonnance.id}</Text>
          </View>
        </View>
      </Card>

      {/* Pharmacie Select */}
      <Card style={styles.inputCard}>
        <Text style={styles.label}>Choisir une pharmacie *</Text>
        <TouchableOpacity style={styles.inputTouchable} onPress={() => setModalVisible(true)}>
          <Text style={{ color: selectedPharmacie ? '#000' : '#888' }}>
            {selectedPharmacie ? `${selectedPharmacie.nom} - ${selectedPharmacie.adresse}` : 'Sélectionnez la pharmacie'}
          </Text>
          <Icon name="chevron-down" size={16} color="#4CAF50" />
        </TouchableOpacity>
      </Card>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={pharmacieList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setPharmacieId(item.id);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item.nom} - {item.adresse}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={[styles.modalItem, { backgroundColor: '#eee', marginTop: 10 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ textAlign: 'center', color: '#333' }}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Lieu de livraison */}
      <Card style={styles.inputCard}>
        <Text style={styles.label}>Lieu de livraison *</Text>
        {renderInputField('map-marker-alt', 'Adresse de livraison', lieuLivraison, setLieuLivraison)}
      </Card>

      {/* Remarques */}
      <Card style={styles.inputCard}>
        <Text style={styles.label}>Remarques</Text>
        {renderInputField('sticky-note', 'Informations complémentaires', remarques, setRemarques, true)}
      </Card>

      {/* Bouton créer */}
      <TouchableOpacity onPress={handleCreate} style={{ marginTop: 24 }}>
        <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.createButton}>
          <Icon name="shopping-cart" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.createButtonText}>Créer la commande</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Bouton annuler */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Annuler</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8', padding: 16 },

  headerCard: { backgroundColor: '#E8F5E9', marginBottom: 20, padding: 16, borderRadius: 18 },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: '#212121' },
  subtitle: { fontSize: 14, color: '#616161', marginTop: 4 },

  inputCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  inputField: { flex: 1, backgroundColor: '#F5F5F5', borderRadius: 12, justifyContent: 'center' },

  inputTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '50%'
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  modalItemText: {
    fontSize: 16,
    color: '#333'
  },

  createButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  createButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  cancelButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: { color: '#4CAF50', fontSize: 16, fontWeight: '700' },
});
