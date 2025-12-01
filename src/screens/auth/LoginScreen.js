import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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

        <Input
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
        />

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
});