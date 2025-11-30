import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../common/Card';

export default function MedicamentItem({ medicament, onEdit, onDelete }) {
  return (
    <Card>
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.nom}>{medicament.nom}</Text>
          <Text style={styles.detail}>
            {medicament.dosage} - {medicament.forme}
          </Text>
          <Text style={styles.stock}>Stock: {medicament.quantiteStock}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit} style={styles.button}>
            <Text style={styles.editText}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.button}>
            <Text style={styles.deleteText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  info: {
    flex: 1
  },
  nom: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4
  },
  detail: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 4
  },
  stock: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600'
  },
  actions: {
    flexDirection: 'row',
    gap: 16
  },
  button: {
    padding: 12,
    borderRadius: 8
  },
  editText: {
    color: '#2196F3',
    fontWeight: '600'
  },
  deleteText: {
    color: '#F44336',
    fontWeight: '600'
  }
});