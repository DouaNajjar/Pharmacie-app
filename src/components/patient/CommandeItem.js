import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../common/Card';
import { STATUS_LABELS, STATUS_COLORS } from '../../utils/constants';

export default function CommandeItem({ commande, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <View style={styles.header}>
          <Text style={styles.id}>Commande #{commande.id}</Text>
          <View style={[styles.badge, { backgroundColor: STATUS_COLORS[commande.status] }]}>
            <Text style={styles.badgeText}>{STATUS_LABELS[commande.status]}</Text>
          </View>
        </View>
        <Text style={styles.date}>{commande.dateCreation}</Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  id: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121'
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600'
  },
  date: {
    fontSize: 14,
    color: '#757575'
  }
});