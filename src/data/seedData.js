import { saveItem, getItem } from '../api/asyncStorage';
const initialUsers = [
{
id: 'u111',
role: 'medecin',
name: 'Dr. Dupont',
email: 'medecin@test.com',
password: 'password123'
},
{
id: 'u222',
role: 'patient',
name: 'Jean Martin',
email: 'patient@test.com',
password: 'password123'
},
{
id: 'u333',
role: 'pharmacien',
name: 'Pharmacie Centrale',
email: 'pharmacien@test.com',
password: 'password123'
},
{
id: 'ph001',
role: 'pharmacien',
name: 'Citypharma',
email: 'citypharma@test.com',
password: 'password123'
},
{
id: 'ph002',
role: 'pharmacien',
name: 'Pharmacie du Marais',
email: 'marais@test.com',
password: 'password123'
},
{
id: 'ph003',
role: 'pharmacien',
name: 'Pharmacie Saint Honoré',
email: 'sainthonore@test.com',
password: 'password123'
},
{
id: 'ph004',
role: 'pharmacien',
name: 'Pharmacie Monge',
email: 'monge@test.com',
password: 'password123'
},
{
id: 'ph005',
role: 'pharmacien',
name: 'Pharmacie Drugstore des Champs-Élysées',
email: 'champs@test.com',
password: 'password123'
},
{
id: 'ph006',
role: 'pharmacien',
name: 'Pharmacie Saint Germain des Prés',
email: 'stgermain@test.com',
password: 'password123'
}
];
const initialMedicaments = [
{
id: 'm001',
nom: 'Doliprane',
dosage: '500 mg',
forme: 'Comprimé',
quantiteStock: 120
},
{
id: 'm002',
nom: 'Amoxicilline',
dosage: '1 g',
forme: 'Comprimé',
quantiteStock: 80
},
{
id: 'm003',
nom: 'Ventoline',
dosage: '100 µg',
forme: 'Inhalateur',
quantiteStock: 45
},
{
id: 'm004',
nom: 'Ibuprofène',
dosage: '400 mg',
forme: 'Comprimé',
quantiteStock: 150
}
];
const initialOrdonnances = [
{
id: 'o888',
patientId: 'u222',
medecinId: 'u111',
medicaments: [
{
idMedicament: 'm001',
quantiteParJour: 3,
duree: 5
},
{
idMedicament: 'm002',
quantiteParJour: 2,
duree: 7
}
],
date: '2025-01-20'
},
{
id: 'o889',
patientId: 'u222',
medecinId: 'u111',
medicaments: [
{
idMedicament: 'm004',
quantiteParJour: 2,
duree: 3
}
],
date: '2025-01-15'
}
];
const initialCommandes = [
{
id: 'c333',
ordonnanceId: 'o888',
patientId: 'u222',
pharmacienId: 'u333',
status: 'en_attente',
dateCreation: '2025-01-20',
lieuLivraison: '10 rue des Lilas, Paris',
remarques: 'Livraison entre 14h et 18h'
}
];
export const initializeData = async () => {
// Vérifier si les données existent déjà
const existingUsers = await getItem('users');
if (!existingUsers) {
// Initialiser toutes les données
await saveItem('users', initialUsers);
await saveItem('medicaments', initialMedicaments);
await saveItem('ordonnances', initialOrdonnances);
await saveItem('commandes', initialCommandes);
console.log('✅ Données initiales chargées');
} else {
console.log('✅ Données déjà présentes');
}
};
// Fonction pour réinitialiser les données (utile pour le dev)
export const resetData = async () => {
await saveItem('users', initialUsers);
await saveItem('medicaments', initialMedicaments);
await saveItem('ordonnances', initialOrdonnances);
await saveItem('commandes', initialCommandes);
console.log('🔄 Données réinitialisées');
};