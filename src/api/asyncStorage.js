// src/api/asyncStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Sauvegarde un élément dans AsyncStorage
 */
export const saveItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return false;
  }
};

/**
 * Récupère un élément depuis AsyncStorage
 */
export const getItem = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erreur lors de la lecture:', error);
    return null;
  }
};

/**
 * Supprime un élément d'AsyncStorage
 */
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return false;
  }
};

/**
 * Vide complètement AsyncStorage (utile pour le développement)
 */
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Erreur lors du nettoyage:', error);
    return false;
  }
};

/**
 * Récupère toutes les clés stockées
 */
export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Erreur lors de la récupération des clés:', error);
    return [];
  }
};