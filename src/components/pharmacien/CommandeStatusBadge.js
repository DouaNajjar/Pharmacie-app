import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STATUS_LABELS, STATUS_COLORS } from '../../utils/constants';

export default function CommandeStatusBadge({ status }) {
  return (
    <View style={[styles.badge, { backgroundColor: STATUS_COLORS[status] }]}>
      <Text style={styles.text}>{STATUS_LABELS[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  }
});