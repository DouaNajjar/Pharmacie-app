# 📚 DOCUMENTATION COMPLÈTE DU PROJET PHARMACIE-APP

## 🎯 Guide pour comprendre le projet de A à Z

Salut ! Ce document va t'expliquer TOUT ce que tu dois savoir sur ce projet React Native. Chaque concept est expliqué simplement, comme si tu n'avais jamais fait de développement. À la fin, tu pourras répondre à n'importe quelle question de ton professeur ! 💪

---

## 📖 TABLE DES MATIÈRES

1. [C'est quoi ce projet ?](#1-cest-quoi-ce-projet-)
2. [Les technologies utilisées](#2-les-technologies-utilisées)
3. [La structure du projet](#3-la-structure-du-projet-expliquée)
4. [Comment ça démarre ?](#4-comment-ça-démarre--le-point-dentrée)
5. [La Navigation](#5-la-navigation-comment-on-passe-dun-écran-à-lautre)
6. [Le State Management (Zustand)](#6-le-state-management-gestion-de-létat-avec-zustand)
7. [Le Stockage des données (AsyncStorage)](#7-le-stockage-des-données-asyncstorage)
8. [Les Composants](#8-les-composants-les-briques-de-linterface)
9. [Les Écrans](#9-les-écrans-screens)
10. [Les Services (API)](#10-les-services-api)
11. [Les Hooks React](#11-les-hooks-react)
12. [Les Styles](#12-les-styles)
13. [Le flux de données complet](#13-le-flux-de-données-complet)
14. [Questions fréquentes du professeur](#14-questions-fréquentes-du-professeur)

---

## 1. C'EST QUOI CE PROJET ? 🏥

### Description

C'est une **application mobile de pharmacie** qui permet :

- Aux **patients** de voir leurs ordonnances et créer des commandes de médicaments
- Aux **pharmaciens** de gérer les commandes reçues et leur stock de médicaments

### Les 3 types d'utilisateurs

1. **Patient** : Peut consulter ses ordonnances et commander ses médicaments
2. **Pharmacien** : Peut gérer les commandes et le stock de médicaments
3. **Médecin** : Crée les ordonnances (mais pas d'interface dans l'app, juste les données)

---

## 2. LES TECHNOLOGIES UTILISÉES

### React Native

```
📱 React Native = Créer des apps mobiles avec JavaScript
```

- C'est un framework créé par Facebook
- Permet de créer des apps pour Android ET iOS avec le même code
- Utilise JavaScript/React pour le développement

### Expo

```
🛠️ Expo = Une boîte à outils qui simplifie React Native
```

- Simplifie le développement React Native
- Pas besoin de configurer Android Studio ou Xcode
- Commande pour lancer : `npm start` ou `expo start`

### Les dépendances principales (package.json)

| Package                                     | À quoi ça sert                               |
| ------------------------------------------- | -------------------------------------------- |
| `react-native`                              | Le framework de base pour créer l'app mobile |
| `@react-navigation/native`                  | Permet de naviguer entre les écrans          |
| `@react-navigation/stack`                   | Navigation par "pile" (empiler les écrans)   |
| `@react-navigation/bottom-tabs`             | Les onglets en bas de l'écran                |
| `zustand`                                   | Gestion de l'état global de l'app            |
| `@react-native-async-storage/async-storage` | Stocker des données localement               |
| `expo-linear-gradient`                      | Créer des dégradés de couleurs               |
| `react-native-vector-icons`                 | Les icônes (pills, cart, etc.)               |

---

## 3. LA STRUCTURE DU PROJET EXPLIQUÉE

```
📁 Pharmacie-app/
│
├── 📄 App.js              ← Le fichier principal (point d'entrée)
├── 📄 index.js            ← Enregistre l'app pour Expo
├── 📄 package.json        ← Liste des dépendances
│
├── 📁 assets/             ← Images, logos
│
└── 📁 src/                ← Tout le code source
    │
    ├── 📁 api/            ← Services pour accéder aux données
    │   ├── asyncStorage.js    ← Fonctions de stockage local
    │   ├── userService.js     ← Gestion des utilisateurs
    │   ├── commandeService.js ← Gestion des commandes
    │   ├── medicamentService.js ← Gestion des médicaments
    │   ├── ordonnanceService.js ← Gestion des ordonnances
    │   └── patientService.js  ← Gestion des patients
    │
    ├── 📁 components/     ← Composants réutilisables
    │   ├── 📁 common/         ← Composants génériques
    │   │   ├── Button.js      ← Bouton personnalisé
    │   │   ├── Input.js       ← Champ de saisie
    │   │   ├── Card.js        ← Carte (container avec ombre)
    │   │   └── LoadingSpinner.js ← Animation de chargement
    │   │
    │   ├── 📁 patient/        ← Composants pour le patient
    │   └── 📁 pharmacien/     ← Composants pour le pharmacien
    │       └── CommandeStatusBadge.js ← Badge de statut
    │
    ├── 📁 data/           ← Données initiales
    │   ├── seedData.js        ← Données de démo (users, médicaments...)
    │   └── pharmacieList.json ← Liste des pharmacies
    │
    ├── 📁 navigation/     ← Configuration de la navigation
    │   ├── AppNavigator.js    ← Navigation principale
    │   ├── AuthNavigator.js   ← Navigation authentification
    │   ├── PatientNavigator.js ← Navigation patient
    │   └── PharmacienNavigator.js ← Navigation pharmacien
    │
    ├── 📁 screens/        ← Les écrans de l'app
    │   ├── 📁 auth/           ← Écrans d'authentification
    │   │   └── LoginScreen.js
    │   │
    │   ├── 📁 patient/        ← Écrans du patient
    │   │   ├── OrdonnanceListScreen.js
    │   │   ├── OrdonnanceDetailScreen.js
    │   │   ├── CommandeCreateScreen.js
    │   │   ├── CommandeListScreen.js
    │   │   └── CommandeDetailScreen.js
    │   │
    │   └── 📁 pharmacien/     ← Écrans du pharmacien
    │       ├── CommandeListScreen.js
    │       ├── CommandeDetailScreen.js
    │       ├── MedicamentListScreen.js
    │       └── MedicamentFormScreen.js
    │
    ├── 📁 store/          ← Stores Zustand (état global)
    │   ├── authStore.js       ← État de l'authentification
    │   ├── commandeStore.js   ← État des commandes
    │   ├── medicamentStore.js ← État des médicaments
    │   └── patientStore.js    ← État des patients
    │
    └── 📁 utils/          ← Utilitaires
        └── constants.js       ← Constantes (rôles, statuts...)
```

---

## 4. COMMENT ÇA DÉMARRE ? (Le Point d'Entrée)

### Étape 1 : index.js

```javascript
// C'est le TOUT premier fichier qui s'exécute
import { registerRootComponent } from "expo";
import App from "./App";

registerRootComponent(App);
// → Ceci dit à Expo : "Voici mon composant principal, lance-le !"
```

### Étape 2 : App.js (Le fichier principal)

```javascript
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { initializeData } from "./src/data/seedData";
import { clearAll } from "./src/api/asyncStorage";

export default function App() {
  // useEffect s'exécute quand l'app démarre
  useEffect(() => {
    async function resetAndInit() {
      await clearAll(); // 1. Efface toutes les données
      await initializeData(); // 2. Recharge les données de démo
    }
    resetAndInit();
  }, []); // Le [] signifie : exécute une seule fois au démarrage

  return (
    // NavigationContainer = Le conteneur qui permet la navigation
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
```

### Explication ligne par ligne :

| Ligne                         | Explication                                   |
| ----------------------------- | --------------------------------------------- |
| `import React, { useEffect }` | On importe React et le hook useEffect         |
| `useEffect(() => {...}, [])`  | Code qui s'exécute au démarrage               |
| `await clearAll()`            | Vide le stockage local                        |
| `await initializeData()`      | Charge les données de démo                    |
| `<NavigationContainer>`       | Obligatoire pour que la navigation fonctionne |
| `<AppNavigator />`            | Notre système de navigation principal         |

---

## 5. LA NAVIGATION (Comment on passe d'un écran à l'autre)

### 🧭 Qu'est-ce que la Navigation ?

En React Native, la **navigation** c'est le système qui permet de :

- Passer d'un écran à un autre
- Revenir en arrière
- Avoir des onglets en bas de l'écran

### Les types de navigation utilisés

#### 1. Stack Navigator (Navigation par pile)

```
Imagine une pile d'assiettes :
- Tu poses une assiette (nouvel écran)
- Tu peux enlever la dernière assiette (retour)

Écran 3  ← Tu es ici
Écran 2
Écran 1
```

#### 2. Tab Navigator (Onglets en bas)

```
┌─────────────────────────────────────┐
│                                     │
│          CONTENU DE L'ÉCRAN         │
│                                     │
├─────────────────────────────────────┤
│  📋 Ordonnances  │  🛒 Commandes    │  ← Onglets
└─────────────────────────────────────┘
```

### AppNavigator.js - Le Chef d'Orchestre

```javascript
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuthStore } from "../store/authStore";
import AuthNavigator from "./AuthNavigator";
import PatientNavigator from "./PatientNavigator";
import PharmacienNavigator from "./PharmacienNavigator";
import { USER_ROLES } from "../utils/constants";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Stack = createStackNavigator();

export default function AppNavigator() {
  // On récupère l'état de connexion depuis le store
  const { user, isLoading, loadCurrentUser } = useAuthStore();

  // Au démarrage, on vérifie si un utilisateur est connecté
  useEffect(() => {
    loadCurrentUser();
  }, []);

  // Pendant le chargement, on affiche un spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* CONDITION 1 : Pas connecté → Écran de login */}
      {!user ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : /* CONDITION 2 : Connecté en tant que Patient */
      user.role === USER_ROLES.PATIENT ? (
        <Stack.Screen name="Patient" component={PatientNavigator} />
      ) : /* CONDITION 3 : Connecté en tant que Pharmacien */
      user.role === USER_ROLES.PHARMACIEN ? (
        <Stack.Screen name="Pharmacien" component={PharmacienNavigator} />
      ) : null}
    </Stack.Navigator>
  );
}
```

### Comment ça marche visuellement :

```
                    ┌─────────────────┐
                    │   AppNavigator  │
                    └────────┬────────┘
                             │
           ┌─────────────────┼─────────────────┐
           │                 │                 │
           ▼                 ▼                 ▼
    ┌──────────┐      ┌──────────┐      ┌──────────┐
    │   Auth   │      │  Patient │      │Pharmacien│
    │Navigator │      │ Navigator│      │Navigator │
    └────┬─────┘      └────┬─────┘      └────┬─────┘
         │                 │                 │
         ▼                 ▼                 ▼
    ┌─────────┐      ┌───────────┐     ┌───────────┐
    │ Login   │      │Ordonnances│     │ Commandes │
    │ Screen  │      │ (Tab)     │     │  (Tab)    │
    └─────────┘      ├───────────┤     ├───────────┤
                     │ Commandes │     │Médicaments│
                     │ (Tab)     │     │  (Tab)    │
                     └───────────┘     └───────────┘
```

### PatientNavigator.js - Navigation du Patient

```javascript
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";

// Import des écrans
import OrdonnanceListScreen from "../screens/patient/OrdonnanceListScreen";
import OrdonnanceDetailScreen from "../screens/patient/OrdonnanceDetailScreen";
import CommandeCreateScreen from "../screens/patient/CommandeCreateScreen";
import CommandeListScreen from "../screens/patient/CommandeListScreen";
import CommandeDetailScreen from "../screens/patient/CommandeDetailScreen";

const Tab = createBottomTabNavigator(); // Crée les onglets
const Stack = createStackNavigator(); // Crée la pile

// Stack pour les ordonnances (plusieurs écrans empilés)
function OrdonnanceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrdonnanceList"
        component={OrdonnanceListScreen}
        options={{ title: "Mes Ordonnances" }}
      />
      <Stack.Screen
        name="OrdonnanceDetail"
        component={OrdonnanceDetailScreen}
        options={{ title: "Détail Ordonnance" }}
      />
      <Stack.Screen
        name="CommandeCreate"
        component={CommandeCreateScreen}
        options={{ title: "Créer Commande" }}
      />
    </Stack.Navigator>
  );
}

// Stack pour les commandes
function CommandeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CommandeList"
        component={CommandeListScreen}
        options={{ title: "Mes Commandes" }}
      />
      <Stack.Screen
        name="CommandeDetail"
        component={CommandeDetailScreen}
        options={{ title: "Détail Commande" }}
      />
    </Stack.Navigator>
  );
}

// Navigation principale du patient avec onglets
export default function PatientNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Configuration des icônes pour chaque onglet
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Ordonnances") {
            iconName = "file-medical-alt";
          } else if (route.name === "Commandes") {
            iconName = "clipboard-list";
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Ordonnances" component={OrdonnanceStack} />
      <Tab.Screen name="Commandes" component={CommandeStack} />
    </Tab.Navigator>
  );
}
```

### Comment naviguer entre les écrans

```javascript
// Dans un écran, on reçoit "navigation" en props
function MonEcran({ navigation }) {
  // Pour aller vers un autre écran :
  navigation.navigate("NomDeLEcran");

  // Pour aller vers un écran avec des données :
  navigation.navigate("OrdonnanceDetail", { ordonnance: monOrdonnance });

  // Pour revenir en arrière :
  navigation.goBack();
}
```

---

## 6. LE STATE MANAGEMENT (Gestion de l'état avec Zustand)

### 🤔 C'est quoi un "état" (state) ?

L'**état** c'est toutes les données qui peuvent changer dans ton application :

- L'utilisateur connecté
- La liste des médicaments
- Les commandes en cours
- etc.

### 🐻 Pourquoi Zustand ?

**Zustand** (ours en allemand 🐻) est une librairie simple pour gérer l'état global.

**État Local** vs **État Global** :

- **Local** : données d'UN seul écran (ex: texte tapé dans un champ)
- **Global** : données partagées entre PLUSIEURS écrans (ex: utilisateur connecté)

### Comment fonctionne un Store Zustand

#### authStore.js - Store d'authentification

```javascript
import { create } from "zustand";
import { login, logout, getCurrentUser } from "../api/userService";

// create() crée un nouveau store
export const useAuthStore = create((set) => ({
  // 📦 LES DONNÉES (state)
  user: null, // L'utilisateur connecté (null = pas connecté)
  isLoading: true, // Est-ce qu'on charge ?

  // 🔧 LES ACTIONS (fonctions qui modifient les données)

  // Charger l'utilisateur actuel
  loadCurrentUser: async () => {
    const user = await getCurrentUser(); // Récupère depuis le stockage
    set({ user, isLoading: false }); // Met à jour le state
  },

  // Se connecter
  login: async (email, password) => {
    const user = await login(email, password); // Vérifie les identifiants
    if (user) {
      set({ user }); // Connecté ! On met à jour le state
      return true;
    }
    return false; // Échec de connexion
  },

  // Se déconnecter
  logout: async () => {
    await logout(); // Supprime du stockage
    set({ user: null }); // Plus d'utilisateur connecté
  },
}));
```

### Comment utiliser un Store dans un écran

```javascript
import { useAuthStore } from "../../store/authStore";

function LoginScreen() {
  // On "extrait" ce dont on a besoin du store
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);

  // Ou tout d'un coup :
  const { login, user, logout } = useAuthStore();

  // Maintenant on peut utiliser login() pour connecter
  const handleLogin = async () => {
    const success = await login("email@test.com", "password123");
    if (success) {
      // Connexion réussie !
    }
  };
}
```

### Les autres Stores

#### commandeStore.js

```javascript
export const useCommandeStore = create((set) => ({
  commandes: [], // Liste des commandes

  loadCommandes: async () => {
    const data = await getCommandes();
    set({ commandes: data });
  },

  addCommande: async (commande) => {
    const updated = await addCommande(commande);
    set({ commandes: updated });
  },

  updateCommandeStatus: async (id, status) => {
    const newList = await updateCommandeStatus(id, status);
    set({ commandes: newList });
  },
}));
```

#### medicamentStore.js

```javascript
export const useMedicamentStore = create((set) => ({
  medicaments: [], // Liste des médicaments

  loadMedicaments: async () => {
    /* ... */
  },
  addMedicament: async (med) => {
    /* ... */
  },
  updateMedicament: async (id, updated) => {
    /* ... */
  },
  deleteMedicament: async (id) => {
    /* ... */
  },
}));
```

---

## 7. LE STOCKAGE DES DONNÉES (AsyncStorage)

### 📦 C'est quoi AsyncStorage ?

C'est comme un **petit disque dur** dans le téléphone pour stocker des données.

- Les données persistent même si on ferme l'app
- On stocke en format **JSON** (texte)

### asyncStorage.js - Les fonctions de base

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";

// 💾 SAUVEGARDER une donnée
export const saveItem = async (key, value) => {
  try {
    // On convertit l'objet en texte JSON
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error);
    return false;
  }
};

// 📖 RÉCUPÉRER une donnée
export const getItem = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    // On reconvertit le texte JSON en objet
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Erreur lors de la lecture:", error);
    return null;
  }
};

// 🗑️ SUPPRIMER une donnée
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

// 🧹 TOUT EFFACER
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
};
```

### Exemple concret : Comment les données sont stockées

```javascript
// Dans AsyncStorage, c'est comme un dictionnaire :
{
  "users": "[{\"id\":\"u111\",\"name\":\"Dr. Dupont\",...}]",
  "medicaments": "[{\"id\":\"m001\",\"nom\":\"Doliprane\",...}]",
  "ordonnances": "[...]",
  "commandes": "[...]",
  "currentUser": "{\"id\":\"u222\",\"name\":\"Jean Martin\"}"
}
```

---

## 8. LES COMPOSANTS (Les briques de l'interface)

### 🧱 C'est quoi un Composant ?

Un **composant** c'est un morceau d'interface réutilisable.
Comme des LEGO : tu crées des petites briques et tu les assembles !

### Button.js - Composant Bouton

```javascript
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

// Les PROPS = paramètres qu'on passe au composant
export default function Button({
  title, // Texte du bouton
  onPress, // Fonction à exécuter au clic
  variant = "primary", // Style (primary ou secondary)
  disabled = false, // Bouton désactivé ?
  loading = false, // Afficher un spinner ?
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary" && styles.secondary,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
```

### Comment utiliser ce composant :

```javascript
// Dans un écran :
<Button
  title="Se connecter"
  onPress={() => handleLogin()}
  loading={isLoading}
/>

<Button
  title="Annuler"
  variant="secondary"
  onPress={() => navigation.goBack()}
/>
```

### Input.js - Composant Champ de saisie

```javascript
export default function Input({
  label, // Étiquette au-dessus
  value, // Valeur actuelle
  onChangeText, // Fonction appelée quand le texte change
  placeholder, // Texte grisé quand vide
  secureTextEntry = false, // Pour les mots de passe
  error, // Message d'erreur
}) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
```

### Card.js - Composant Carte

```javascript
export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

// "children" = tout ce qu'on met ENTRE les balises <Card>...</Card>
```

### LoadingSpinner.js - Animation de chargement

```javascript
export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4CAF50" />
      <Text style={styles.text}>Chargement...</Text>
    </View>
  );
}
```

---

## 9. LES ÉCRANS (Screens)

### LoginScreen.js - Écran de Connexion

```javascript
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import { useAuthStore } from "../../store/authStore";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default function LoginScreen() {
  // États locaux pour les champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Récupère la fonction login du store
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    // Vérification des champs
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setLoading(true); // Active le spinner
    const success = await login(email, password); // Tente la connexion
    setLoading(false); // Désactive le spinner

    if (!success) {
      Alert.alert("Erreur", "Email ou mot de passe incorrect");
    }
    // Si success = true, AppNavigator redirige automatiquement !
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logoPharm.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Pharmacie shop</Text>

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
          secureTextEntry // Cache les caractères
        />
        <Button title="Se connecter" onPress={handleLogin} loading={loading} />
      </View>
    </View>
  );
}
```

### OrdonnanceListScreen.js - Liste des Ordonnances

```javascript
export default function OrdonnanceListScreen({ navigation }) {
  const [ordonnances, setOrdonnances] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuthStore();

  // useEffect avec navigation.addListener pour recharger quand on revient
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadOrdonnances();
    });
    return unsubscribe; // Nettoyage
  }, [navigation]);

  const loadOrdonnances = async () => {
    setLoading(true);
    const data = await getOrdonnancesByPatient(user?.id || "");
    setOrdonnances(data);
    setLoading(false);
  };

  // FlatList = Liste optimisée pour beaucoup d'éléments
  return (
    <FlatList
      data={ordonnances}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("OrdonnanceDetail", { ordonnance: item })
          }
        >
          <Text>{item.date}</Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={<Text>Aucune ordonnance</Text>}
      refreshing={loading}
      onRefresh={loadOrdonnances} // Pull to refresh !
    />
  );
}
```

### CommandeCreateScreen.js - Créer une commande

```javascript
export default function CommandeCreateScreen({ route, navigation }) {
  // route.params contient les données passées depuis l'écran précédent
  const { ordonnance } = route.params;
  const { user } = useAuthStore();
  const { addCommande } = useCommandeStore();

  const [pharmacieId, setPharmacieId] = useState(pharmacieList[0]?.id || "");
  const [lieuLivraison, setLieuLivraison] = useState("");
  const [remarques, setRemarques] = useState("");

  const handleCreate = async () => {
    // Création de l'objet commande
    const newCommande = {
      id: `c${Date.now()}`, // ID unique basé sur le timestamp
      ordonnanceId: ordonnance.id,
      patientId: user.id,
      pharmacienId: pharmacieId,
      status: COMMANDE_STATUS.EN_ATTENTE,
      dateCreation: new Date().toISOString().split("T")[0],
      lieuLivraison,
      remarques,
    };

    await addCommande(newCommande);
    Alert.alert("Succès", "Commande créée !", [
      { text: "OK", onPress: () => navigation.navigate("Commandes") },
    ]);
  };

  return <ScrollView>{/* Formulaire de création */}</ScrollView>;
}
```

---

## 10. LES SERVICES (API)

### 🔌 C'est quoi un Service ?

Un **service** c'est un fichier qui contient toutes les fonctions pour manipuler un type de données.

### userService.js

```javascript
import { getItem, saveItem } from "./asyncStorage";

const USER_KEY = "users"; // Clé pour la liste des utilisateurs
const CURRENT_USER_KEY = "currentUser"; // Clé pour l'utilisateur connecté

// Récupérer tous les utilisateurs
export const getUsers = async () => {
  return (await getItem(USER_KEY)) || [];
};

// Connexion
export const login = async (email, password) => {
  const users = await getUsers();
  // Cherche un utilisateur avec cet email ET ce mot de passe
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    await saveItem(CURRENT_USER_KEY, user); // Sauvegarde l'utilisateur connecté
    return user;
  }
  return null; // Échec
};

// Déconnexion
export const logout = async () => {
  await saveItem(CURRENT_USER_KEY, null);
};

// Récupérer l'utilisateur connecté
export const getCurrentUser = async () => {
  return await getItem(CURRENT_USER_KEY);
};
```

### commandeService.js

```javascript
const COMMANDE_KEY = "commandes";

// Récupérer toutes les commandes
export const getCommandes = async () => {
  return (await getItem(COMMANDE_KEY)) || [];
};

// Ajouter une commande
export const addCommande = async (commande) => {
  const cmds = await getCommandes();
  const newList = [...cmds, commande]; // Ajoute à la liste
  await saveItem(COMMANDE_KEY, newList);
  return newList;
};

// Mettre à jour le statut d'une commande
export const updateCommandeStatus = async (id, status) => {
  const cmds = await getCommandes();
  // Map = parcourt et modifie
  const newList = cmds.map(
    (c) => (c.id === id ? { ...c, status } : c) // Si c'est la bonne, on change le status
  );
  await saveItem(COMMANDE_KEY, newList);
  return newList;
};

// Récupérer les commandes d'un patient
export const getCommandesByPatient = async (patientId) => {
  const cmds = await getCommandes();
  return cmds.filter((c) => c.patientId === patientId);
};
```

---

## 11. LES HOOKS REACT

### 🎣 C'est quoi un Hook ?

Un **Hook** c'est une fonction spéciale de React qui permet d'ajouter des fonctionnalités aux composants.

### useState - Gérer l'état local

```javascript
import { useState } from "react";

function MonComposant() {
  // useState retourne [valeur, fonctionPourModifier]
  const [compteur, setCompteur] = useState(0);
  //      ↑             ↑                  ↑
  //   valeur    fonction pour      valeur initiale
  //            la modifier

  return (
    <View>
      <Text>Compteur: {compteur}</Text>
      <Button title="Ajouter 1" onPress={() => setCompteur(compteur + 1)} />
    </View>
  );
}
```

### useEffect - Exécuter du code à certains moments

```javascript
import { useEffect } from "react";

function MonComposant() {
  // Cas 1 : S'exécute UNE FOIS au montage du composant
  useEffect(() => {
    console.log("Le composant est affiché !");
  }, []); // [] = tableau de dépendances vide

  // Cas 2 : S'exécute à CHAQUE fois que "user" change
  useEffect(() => {
    console.log("User a changé !");
  }, [user]); // [user] = dépendance

  // Cas 3 : Avec nettoyage (cleanup)
  useEffect(() => {
    const subscription = subscribeToData();

    return () => {
      // Ce code s'exécute quand le composant est retiré
      subscription.unsubscribe();
    };
  }, []);
}
```

### Résumé des Hooks utilisés dans le projet

| Hook               | Utilité                                                   | Exemple                                    |
| ------------------ | --------------------------------------------------------- | ------------------------------------------ |
| `useState`         | Stocker une valeur qui peut changer                       | `const [email, setEmail] = useState('')`   |
| `useEffect`        | Exécuter du code au chargement ou quand une valeur change | Charger des données au démarrage           |
| `useAuthStore`     | Accéder au store Zustand d'authentification               | `const { user } = useAuthStore()`          |
| `useCommandeStore` | Accéder au store des commandes                            | `const { commandes } = useCommandeStore()` |

---

## 12. LES STYLES

### 📝 Comment on style en React Native

En React Native, on utilise `StyleSheet.create()` pour créer des styles.
C'est similaire au CSS mais avec des noms en **camelCase**.

```javascript
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // Prend tout l'espace disponible
    backgroundColor: "#F0F4F8", // Couleur de fond
    padding: 24, // Espace intérieur
    justifyContent: "center", // Centre verticalement
  },

  title: {
    fontSize: 32, // Taille du texte
    fontWeight: "800", // Gras (100 à 900)
    color: "#4CAF50", // Couleur du texte
    textAlign: "center", // Centré
    marginBottom: 8, // Marge en bas
  },

  card: {
    backgroundColor: "white",
    borderRadius: 16, // Coins arrondis
    padding: 24,
    // Ombre (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Ombre (Android)
    elevation: 3,
  },

  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center", // Centre le contenu horizontalement
  },
});
```

### Comparaison CSS vs React Native

| CSS                  | React Native          |
| -------------------- | --------------------- |
| `background-color`   | `backgroundColor`     |
| `font-size`          | `fontSize`            |
| `font-weight: bold`  | `fontWeight: '700'`   |
| `border-radius`      | `borderRadius`        |
| `margin-bottom`      | `marginBottom`        |
| `text-align: center` | `textAlign: 'center'` |

### Les couleurs utilisées dans le projet

| Couleur | Code      | Utilisation              |
| ------- | --------- | ------------------------ |
| Vert    | `#4CAF50` | Patient, succès, médical |
| Bleu    | `#2196F3` | Pharmacien, actions      |
| Jaune   | `#FFC107` | En attente               |
| Rouge   | `#F44336` | Erreur, suppression      |
| Gris    | `#9E9E9E` | Texte secondaire         |

---

## 13. LE FLUX DE DONNÉES COMPLET

### 🔄 Que se passe-t-il quand un Patient crée une commande ?

```
1. PATIENT ouvre l'app
        ↓
2. App.js charge initializeData() → données de démo
        ↓
3. AppNavigator vérifie : user = null → montre LoginScreen
        ↓
4. Patient entre email/password → appuie sur "Se connecter"
        ↓
5. LoginScreen appelle authStore.login()
        ↓
6. authStore.login() appelle userService.login()
        ↓
7. userService.login() cherche dans AsyncStorage
        ↓
8. Utilisateur trouvé → sauvegardé dans AsyncStorage + authStore.user
        ↓
9. AppNavigator voit user.role === 'patient' → montre PatientNavigator
        ↓
10. PatientNavigator affiche OrdonnanceListScreen
        ↓
11. OrdonnanceListScreen charge les ordonnances depuis AsyncStorage
        ↓
12. Patient clique sur une ordonnance → OrdonnanceDetailScreen
        ↓
13. Patient clique "Créer commande" → CommandeCreateScreen
        ↓
14. Patient remplit le formulaire et valide
        ↓
15. CommandeCreateScreen appelle commandeStore.addCommande()
        ↓
16. commandeStore.addCommande() appelle commandeService.addCommande()
        ↓
17. commandeService.addCommande() sauvegarde dans AsyncStorage
        ↓
18. Navigation vers CommandeListScreen → Commande visible !
```

### Schéma du flux de données

```
┌─────────────────────────────────────────────────────────────┐
│                         ÉCRANS                               │
│  LoginScreen → OrdonnanceList → OrdonnanceDetail → etc.     │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑
                     (utilise / modifie)
                            ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                      STORES (Zustand)                        │
│     authStore    commandeStore    medicamentStore            │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑
                    (appelle les services)
                            ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                       SERVICES                               │
│  userService  commandeService  medicamentService  etc.       │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑
                    (lit / écrit dans)
                            ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                     ASYNCSTORAGE                             │
│     users    commandes    medicaments    ordonnances         │
└─────────────────────────────────────────────────────────────┘
```

---

## 14. QUESTIONS FRÉQUENTES DU PROFESSEUR

### ❓ "Comment fonctionne la navigation dans votre app ?"

**Réponse :**

> "Nous utilisons React Navigation avec deux types de navigateurs :
>
> 1. **Stack Navigator** : pour empiler les écrans (comme une pile d'assiettes)
> 2. **Tab Navigator** : pour les onglets en bas de l'écran
>
> L'`AppNavigator` vérifie si l'utilisateur est connecté. Si non, il montre `AuthNavigator` (login). Si oui, il montre `PatientNavigator` ou `PharmacienNavigator` selon le rôle de l'utilisateur."

### ❓ "Comment gérez-vous l'état de l'application ?"

**Réponse :**

> "Nous utilisons **Zustand** pour la gestion de l'état global. C'est une librairie simple qui crée des 'stores'. Par exemple, `authStore` gère l'utilisateur connecté, `commandeStore` gère les commandes. Les composants peuvent lire et modifier cet état depuis n'importe où dans l'app."

### ❓ "Comment les données sont-elles stockées ?"

**Réponse :**

> "Nous utilisons **AsyncStorage**, qui est comme un stockage local dans le téléphone. Les données sont converties en JSON (texte) et sauvegardées avec une clé. Par exemple, la liste des utilisateurs est stockée avec la clé 'users'. Ces données persistent même quand l'app est fermée."

### ❓ "Qu'est-ce qu'un composant React ?"

**Réponse :**

> "Un composant c'est une brique réutilisable de l'interface. Par exemple, notre composant `Button` peut être utilisé partout dans l'app avec différents textes et couleurs. On lui passe des 'props' (paramètres) pour le personnaliser."

### ❓ "C'est quoi `useState` et `useEffect` ?"

**Réponse :**

> "Ce sont des **Hooks** React :
>
> - `useState` : permet de créer une variable qui peut changer et mettre à jour l'affichage
> - `useEffect` : permet d'exécuter du code à certains moments (au chargement, quand une valeur change)"

### ❓ "Comment fonctionne l'authentification ?"

**Réponse :**

> "Quand l'utilisateur entre son email et mot de passe :
>
> 1. On cherche dans la liste des utilisateurs stockés
> 2. Si on trouve une correspondance, on sauvegarde cet utilisateur comme 'utilisateur actuel'
> 3. L'`AppNavigator` détecte ce changement et redirige vers l'interface appropriée"

### ❓ "Pourquoi utiliser Expo ?"

**Réponse :**

> "Expo simplifie le développement React Native. On n'a pas besoin de configurer Android Studio ou Xcode. On peut tester l'app directement sur notre téléphone avec l'app Expo Go. C'est parfait pour le développement et le prototypage rapide."

### ❓ "Comment le pharmacien change le statut d'une commande ?"

**Réponse :**

> "Dans `CommandeDetailScreen` du pharmacien :
>
> 1. On récupère la commande depuis le store
> 2. On calcule le 'prochain statut' possible
> 3. Quand le pharmacien clique, on appelle `updateCommandeStatus()`
> 4. Si le statut devient 'Prête', on déduit automatiquement le stock de médicaments"

### ❓ "Quelle est l'architecture de votre projet ?"

**Réponse :**

> "Nous avons une architecture en couches :
>
> 1. **Écrans (screens)** : l'interface utilisateur
> 2. **Composants** : briques réutilisables de l'interface
> 3. **Stores (Zustand)** : gestion de l'état global
> 4. **Services (api)** : logique d'accès aux données
> 5. **AsyncStorage** : persistance des données
>
> Chaque couche a une responsabilité précise, ce qui rend le code maintenable."

---

## 🎓 CONCLUSION

Tu as maintenant toutes les clés pour comprendre ce projet !

**Récapitulatif :**

- **React Native + Expo** : Framework pour créer l'app mobile
- **Navigation** : Stack (pile) + Tabs (onglets)
- **Zustand** : Gestion de l'état global
- **AsyncStorage** : Stockage local des données
- **Composants** : Briques réutilisables (Button, Input, Card)
- **Services** : Fonctions pour manipuler les données

Si le professeur te pose une question et que tu ne trouves pas la réponse ici, cherche dans le code source ! Chaque fichier est commenté et organisé de manière logique.

**Bonne chance pour ta présentation ! 🚀**

---

_Document créé pour expliquer le projet Pharmacie-App_
_Dernière mise à jour : Décembre 2025_
