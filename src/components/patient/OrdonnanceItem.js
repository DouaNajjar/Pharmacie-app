import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../common/Card';

export default function OrdonnanceItem({ ordonnance, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <View style={styles.header}>
          <Text style={styles.id}>Ordonnance #{ordonnance.id}</Text>
          <Text style={styles.date}>{ordonnance.date}</Text>
        </View>
        <Text style={styles.info}>
          {ordonnance.medicaments.length} médicament(s)
        </Text>
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
  date: {
    fontSize: 14,
    color: '#757575',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  info: {
    fontSize: 14,
    color: '#616161'
  }
});