import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TextInput, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore(state => state.login);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (!success) {
      Alert.alert('Erreur', 'Email ou mot de passe incorrect');
    }
  };

  return (
    <View style={styles.container}>
     <Image
        source={require('../../../assets/logoPharm.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Pharmacie shop </Text>
    

      <View style={styles.card}>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="votre@email.com"
        />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mot de passe</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              placeholderTextColor="#9E9E9E"
            />
            <TouchableOpacity onPress={() => setShowPassword(s => !s)} style={styles.eyeButton}>
              <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={22} color="#616161" />
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Se connecter"
          onPress={handleLogin}
          loading={loading}
        />
      </View>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    color: '#424242',
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
  },
  info: {
    padding: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#424242',
  },
  infoText: {
    fontSize: 12,
    color: '#616161',
    marginBottom: 4,
  },
  inputContainer: {
    marginVertical: 12
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#424242'
  },
  passwordRow: {
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
    backgroundColor: '#FAFAFA'
  },
  eyeButton: {
    marginLeft: 8,
    padding: 8
  }
});