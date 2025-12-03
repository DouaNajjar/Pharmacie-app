import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Input({ label, value, onChangeText, placeholder, secureTextEntry = false, error, showToggle = false, containerStyle, inputStyle, ...rest }) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.row}>
        <TextInput
          style={[styles.input, inputStyle, error && styles.inputError]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={showToggle ? !visible && secureTextEntry : secureTextEntry}
          placeholderTextColor="#9E9E9E"
          {...rest}
        />

        {showToggle && (
          <TouchableOpacity onPress={() => setVisible(v => !v)} style={styles.eyeButton} accessibilityLabel={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>
            <Ionicons name={visible ? 'eye' : 'eye-off'} size={20} color="#616161" />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#424242'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  eyeButton: {
    marginLeft: 8,
    padding: 8
  },
  inputError: {
    borderColor: '#F44336'
  },
  error: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 4
  }
});