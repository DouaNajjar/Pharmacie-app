import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// Ionicons already imported above
import Card from '../../components/common/Card';
import { useCommandeStore } from '../../store/commandeStore';
import { useMedicamentStore } from '../../store/medicamentStore';
import { COMMANDE_STATUS, USER_ROLES } from '../../utils/constants';
import pharmacieList from '../../data/pharmacieList.json';
import { useAuthStore } from '../../store/authStore';
import CommandeItem from '../../components/patient/CommandeItem';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DashboardScreen({ navigation }) {
  const { commandes, loadCommandes } = useCommandeStore();
  const { medicaments, loadMedicaments } = useMedicamentStore();

  useEffect(() => {
    loadCommandes();
    loadMedicaments();
  }, []);

  const totalCommandes = commandes?.length || 0;
  const enAttente = commandes?.filter(c => c.status === COMMANDE_STATUS.EN_ATTENTE).length || 0;
  const totalMedicaments = medicaments?.length || 0;
  const lowStock = medicaments?.filter(m => typeof m.quantiteStock === 'number' && m.quantiteStock < 5).length || 0;

  const { user } = useAuthStore();
  const logout = useAuthStore(state => state.logout);

  // If logged-in user is a pharmacien, show pharmacy-specific metrics
  const isPharmacien = user && user.role === USER_ROLES.PHARMACIEN;
  const pharmacyId = user?.id;
  const totalCommandesForPh = isPharmacien ? (commandes || []).filter(c => c.pharmacienId === pharmacyId).length : 0;
  const pendingForPh = isPharmacien ? (commandes || []).filter(c => c.pharmacienId === pharmacyId && c.status === COMMANDE_STATUS.EN_ATTENTE).length : 0;
  const recentForPh = isPharmacien ? (commandes || []).filter(c => c.pharmacienId === pharmacyId).sort((a,b)=> new Date(b.dateCreation)-new Date(a.dateCreation)).slice(0,5) : [];

  const goToTab = (tabName) => {
    const parent = navigation.getParent && navigation.getParent();
    if (parent) parent.navigate(tabName);
  };

  // Build commandes count per pharmacie
  const pharmaciesWithCounts = (pharmacieList || []).map(ph => {
    const cmds = commandes || [];
    const total = cmds.filter(c => c.pharmacienId === ph.id).length;
    const pending = cmds.filter(c => c.pharmacienId === ph.id && c.status === COMMANDE_STATUS.EN_ATTENTE).length;
    return { ...ph, total, pending };
  }).sort((a, b) => b.total - a.total);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isPharmacien && (
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="medkit-outline" size={26} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.welcome}>{user?.name ? `Pharmacie - ${user.name}` : 'Pharmacie'}</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtnHeader} onPress={async () => { await logout(); const parent = navigation.getParent && navigation.getParent(); if (parent) parent.navigate('Auth'); }}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.heading}>{isPharmacien ? `Tableau de bord` : 'Tableau de bord'}</Text>

      {isPharmacien ? (
        <>
          <TouchableOpacity onPress={() => {
            const parent = navigation.getParent && navigation.getParent();
            // Request the CommandeList to show only this pharmacy's commandes
            if (parent) parent.navigate('Commandes', { screen: 'CommandeList', params: { onlyMine: true, pharmacyId } });
            else navigation.navigate('CommandeList', { onlyMine: true, pharmacyId });
          }} activeOpacity={0.8}>
            <Card>
              <View style={styles.row}>
                <View style={[styles.iconWrap, { backgroundColor: '#2196F3' }]}>
                  <Ionicons name="document-text" size={28} color="#fff" />
                </View>
                <View style={styles.info}>
                  <Text style={styles.label}>Vos Commandes</Text>
                  <Text style={styles.value}>{totalCommandesForPh}</Text>
                  <Text style={styles.sub}>{pendingForPh} en attente</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => goToTab('Médicaments')} activeOpacity={0.8}>
            <Card>
              <View style={styles.row}>
                <View style={[styles.iconWrap, { backgroundColor: '#4CAF50' }]}>
                  <Ionicons name="medkit" size={28} color="#fff" />
                </View>
                <View style={styles.info}>
                  <Text style={styles.label}>Médicaments (global)</Text>
                  <Text style={styles.value}>{totalMedicaments}</Text>
                  <Text style={styles.sub}>{lowStock} en faible stock</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <Card>
            <View style={styles.row}>
              <View style={[styles.iconWrap, { backgroundColor: '#FFC107' }]}>
                <Ionicons name="stats-chart" size={28} color="#fff" />
              </View>
              <View style={styles.info}>
                <Text style={styles.label}>Résumé rapide</Text>
                <Text style={styles.value}>{totalCommandesForPh} commandes • {totalMedicaments} médicaments</Text>
              </View>
            </View>
          </Card>

          <Text style={[styles.heading, { marginTop: 18 }]}>Dernières commandes</Text>
          {recentForPh.length === 0 && (
            <Card>
              <Text style={{ color: '#757575' }}>Aucune commande récente</Text>
            </Card>
          )}
          {recentForPh.map(cmd => {
            const openDetail = () => {
              const parent = navigation.getParent && navigation.getParent();
              if (parent) {
                // navigate to the Commandes tab and then to the CommandeDetail screen inside that stack
                parent.navigate('Commandes', { screen: 'CommandeDetail', params: { commandeId: cmd.id } });
              } else {
                // fallback if parent not available
                navigation.navigate('CommandeDetail', { commandeId: cmd.id });
              }
            };

            return (
              <TouchableOpacity key={cmd.id} onPress={openDetail}>
                <CommandeItem commande={cmd} onPress={openDetail} />
              </TouchableOpacity>
            );
          })}
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => goToTab('Commandes')} activeOpacity={0.8}>
            <Card>
              <View style={styles.row}>
                <View style={[styles.iconWrap, { backgroundColor: '#2196F3' }]}>
                  <Ionicons name="document-text" size={28} color="#fff" />
                </View>
                <View style={styles.info}>
                  <Text style={styles.label}>Commandes</Text>
                  <Text style={styles.value}>{totalCommandes}</Text>
                  <Text style={styles.sub}>{enAttente} en attente</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => goToTab('Médicaments')} activeOpacity={0.8}>
            <Card>
              <View style={styles.row}>
                <View style={[styles.iconWrap, { backgroundColor: '#4CAF50' }]}>
                  <Ionicons name="medkit" size={28} color="#fff" />
                </View>
                <View style={styles.info}>
                  <Text style={styles.label}>Médicaments</Text>
                  <Text style={styles.value}>{totalMedicaments}</Text>
                  <Text style={styles.sub}>{lowStock} en faible stock</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <Card>
            <View style={styles.row}>
              <View style={[styles.iconWrap, { backgroundColor: '#FFC107' }]}>
                <Ionicons name="stats-chart" size={28} color="#fff" />
              </View>
              <View style={styles.info}>
                <Text style={styles.label}>Résumé rapide</Text>
                <Text style={styles.value}>{totalCommandes} commandes • {totalMedicaments} médicaments</Text>
              </View>
            </View>
          </Card>

          <Text style={[styles.heading, { marginTop: 18 }]}>Commandes par pharmacie</Text>
          {pharmaciesWithCounts.map(ph => (
            <Card key={ph.id}>
              <View style={styles.row}>
                <View style={[styles.iconWrap, { backgroundColor: '#607D8B' }]}>
                  <Ionicons name="business" size={24} color="#fff" />
                </View>
                <View style={styles.info}>
                  <Text style={styles.label}>{ph.nom}</Text>
                  <Text style={styles.value}>{ph.total} commandes</Text>
                  <Text style={styles.sub}>{ph.pending} en attente</Text>
                </View>
              </View>
            </Card>
          ))}
        </>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5'
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    marginBottom: 12
  },
  welcome: { fontSize: 18, fontWeight: '600', color: '#fff' },
  logoutBtnHeader: { padding: 6 },
  subSmall: {
    fontSize: 12,
    color: '#424242',
    marginTop: 4
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  info: {
    flex: 1
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121'
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
    color: '#424242',
    marginTop: 4
  },
  sub: {
    fontSize: 13,
    color: '#757575',
    marginTop: 4
  }
});
