import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform, BackHandler,
} from 'react-native';

const COLORS = {
  navy: '#0B1F3A',
  navy2: '#15345D',
  gold: '#D9A441',
  gold2: '#F2C66D',
  bg: '#F5F7FA',
  card: '#FFFFFF',
  text: '#172033',
  muted: '#6B7280',
  line: '#E4E8EF',
  green: '#138A5B',
  red: '#C0392B',
};

const pros = [
  { id: '1', name: 'Constructions RL', trade: 'Rénovation intérieure', city: 'Montréal', rating: 4.9, reviews: 42, distance: 12, verified: true },
  { id: '2', name: 'Finition Expert', trade: 'Tireur de joint', city: 'Laval', rating: 4.8, reviews: 35, distance: 8, verified: true },
  { id: '3', name: 'Bâtir Plus Inc.', trade: 'Menuiserie', city: 'Longueuil', rating: 4.7, reviews: 28, distance: 15, verified: true },
  { id: '4', name: 'Électro SécuriPro', trade: 'Électricité', city: 'Montréal', rating: 4.9, reviews: 61, distance: 6, verified: true },
];

const categories = ['Rénovation', 'Tireur de joint', 'Peinture', 'Plomberie', 'Électricité', 'Menuiserie'];

function AppHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.logoCircle}><Text style={styles.logoQ}>Q✓</Text></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.brand}>QualiVérifié</Text>
        <Text style={styles.tagline}>Des pros vérifiés. Des projets en confiance.</Text>
      </View>
    </View>
  );
}

function Badge() {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>✓ QualiVérifié</Text>
    </View>
  );
}

function Home({ onNavigate }) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader />
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Trouvez le bon pro près de chez vous</Text>
        <Text style={styles.heroText}>Entrepreneurs qualifiés, profils vérifiés et avis authentiques au Québec.</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => onNavigate('Pros')}>
          <Text style={styles.primaryBtnText}>Trouver un entrepreneur</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Catégories populaires</Text>
      <View style={styles.grid}>
        {categories.map((c) => (
          <TouchableOpacity key={c} style={styles.categoryCard} onPress={() => onNavigate('Pros', c)}>
            <Text style={styles.categoryIcon}>⌂</Text>
            <Text style={styles.categoryText}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Pourquoi QualiVérifié?</Text>
      {[
        ['✓', 'Pros vérifiés', 'Identité, entreprise, licence et assurance vérifiées.'],
        ['★', 'Avis authentiques', 'Des évaluations liées à de vrais projets.'],
        ['⌖', 'Près de chez vous', 'Recherche par métier, ville et distance.'],
      ].map(([i,t,d]) => (
        <View key={t} style={styles.infoCard}>
          <Text style={styles.infoIcon}>{i}</Text>
          <View style={{flex:1}}>
            <Text style={styles.infoTitle}>{t}</Text>
            <Text style={styles.infoText}>{d}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function Pros({ initialCategory = '', onNavigate }) {
  const [query, setQuery] = useState(initialCategory);
  const [city, setCity] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const c = city.trim().toLowerCase();
    return pros.filter((p) =>
      (!q || p.trade.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)) &&
      (!c || p.city.toLowerCase().includes(c))
    );
  }, [query, city]);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader />
      <Text style={styles.screenTitle}>Trouver un pro</Text>
      <TextInput value={query} onChangeText={setQuery} placeholder="Métier ou entreprise" style={styles.input} />
      <TextInput value={city} onChangeText={setCity} placeholder="Ville (ex. Montréal)" style={styles.input} />
      <Text style={styles.resultCount}>{results.length} résultat(s)</Text>

      {results.map((p) => (
        <View key={p.id} style={styles.proCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{p.name.slice(0,1)}</Text></View>
          <View style={{flex:1}}>
            <View style={styles.rowBetween}>
              <Text style={styles.proName}>{p.name}</Text>
              {p.verified && <Badge />}
            </View>
            <Text style={styles.proTrade}>{p.trade}</Text>
            <Text style={styles.proMeta}>★ {p.rating} ({p.reviews})  •  {p.city}, QC  •  {p.distance} km</Text>
            <View style={styles.cardActions}>
            <TouchableOpacity onPress={() => onNavigate('Profil','',p)} style={styles.secondaryBtn}><Text style={styles.secondaryBtnText}>Voir le profil</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => onNavigate('Projets')} style={styles.smallGoldBtn}><Text style={styles.smallGoldBtnText}>Soumission</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function Projects() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [sent, setSent] = useState(false);
  const [projects, setProjects] = useState([]);
  

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader />
      <Text style={styles.screenTitle}>Publier un projet</Text>
      <Text style={styles.helper}>Décrivez votre besoin. Les entrepreneurs pourront ensuite vous proposer une soumission.</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Ex. Rénover ma salle de bain" style={styles.input} />
      <TextInput
        value={details}
        onChangeText={setDetails}
        placeholder="Description, budget, échéancier..."
        multiline
        style={[styles.input, styles.textArea]}
      />
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => {
  if (title.trim() && details.trim()) {
    setProjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title.trim(),
        details: details.trim(),
      },
    ]);
    setSent(true);
  }
}}
      >
        <Text style={styles.primaryBtnText}>Publier le projet</Text>
      </TouchableOpacity>
      {sent && <View style={styles.success}><Text style={styles.successText}>✓ Projet prêt à être envoyé aux pros QualiVérifié.</Text></View>}
    </ScrollView>
  );
}

function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
const [messageText, setMessageText] = useState('');
const [sentMessage, setSentMessage] = useState('');
  if (selectedChat) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader />
      <TouchableOpacity onPress={() => setSelectedChat(null)}>
        <Text style={styles.proTrade}>‹ Retour aux messages</Text>
      </TouchableOpacity>

      <Text style={styles.screenTitle}>{selectedChat}</Text>

      <View style={[styles.messageCard, { flexDirection: 'column', alignItems: 'stretch' }]}>
        <Text style={styles.proName}>{selectedChat}</Text>
        <Text style={styles.infoText}>
          Bonjour! Je peux vous envoyer une estimation ce soir.
        </Text>
      </View>
{sentMessage ? (
  <View style={styles.messageCard}>
    <Text style={styles.proName}>Vous</Text>
    <Text style={styles.infoText}>{sentMessage}</Text>
  </View>
) : null}
      <TextInput
  value={messageText}
  onChangeText={setMessageText}
  placeholder="Écrire un message..."
  style={styles.input}
/>

      <TouchableOpacity
  style={styles.primaryBtn}
  onPress={() => {
    if (messageText.trim()) {
      setSentMessage(messageText.trim());
      setMessageText('');
    }
  }}
>
  <Text style={styles.primaryBtnText}>Envoyer</Text>
</TouchableOpacity>
    </ScrollView>
  );
}
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader />
      <Text style={styles.screenTitle}>Messages</Text>
      {[
        ['Finition Expert', 'Bonjour! Je peux vous envoyer une estimation ce soir.', '10:42'],
        ['Constructions RL', 'Merci pour les détails du projet.', 'Hier'],
      ].map(([name,msg,time]) => (
        <TouchableOpacity key={name} onPress={() => setSelectedChat(name)} style={styles.messageCard}>
          <View style={styles.avatarSmall}><Text style={styles.avatarText}>{name[0]}</Text></View>
          <View style={{flex:1}}>
            <View style={styles.rowBetween}><Text style={styles.proName}>{name}</Text><Text style={styles.time}>{time}</Text></View>
            <Text style={styles.infoText}>{msg}</Text>
          </View>
</TouchableOpacity>
        
      ))}
    </ScrollView>
  );
}

function Profile({ onNavigate, selectedPro }) {
  const [profileSection, setProfileSection] = useState(null);

  if (profileSection) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader />
      <TouchableOpacity onPress={() => setProfileSection(null)}>
        <Text style={styles.proTrade}>‹ Retour au profil</Text>
      </TouchableOpacity>
      <Text style={styles.screenTitle}>{profileSection}</Text>
      <View style={styles.profileCard}>
        <Text style={styles.infoText}>
          Cette section sera bientôt disponible dans QualiVérifié.
        </Text>
      </View>
    </ScrollView>
  );
  }
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader />
      <Text style={styles.screenTitle}>{selectedPro ? 'Profil QualiVérifié' : 'Mon profil'}</Text>
      <View style={styles.profileCard}>
        <View style={styles.avatarLarge}><Text style={styles.avatarText}>{selectedPro ? selectedPro.name.slice(0,1) : 'B'}</Text></View>
        <Text style={styles.profileName}>{selectedPro ? selectedPro.name : 'Compte client'}</Text>
        <Text style={styles.infoText}>{selectedPro ? `${selectedPro.trade} • ${selectedPro.city}, QC • ⭐ ${selectedPro.rating} (${selectedPro.reviews} avis)` : 'Gérez vos projets, messages, favoris et avis.'}</Text>
      </View>
{selectedPro && <View style={styles.verifiedBadge}><Text style={styles.verifiedBadgeText}>✓ QualiVérifié — Entrepreneur vérifié</Text></View>}
 {selectedPro && <Text style={styles.profileInfo}>🛡️ Licence et assurance vérifiées</Text>}
  {selectedPro && <Text style={styles.profileInfo}>🛠️ Services offerts : rénovation intérieure et finition</Text>}
   {selectedPro && <Text style={styles.profileInfo}>⭐ 4.9/5 basé sur 42 avis clients</Text>}
    {selectedPro && <Text style={styles.sectionTitle}>À propos</Text>}
     {selectedPro && <Text style={styles.profileInfo}>Constructions RL accompagne ses clients dans leurs projets de rénovation intérieure avec un service professionnel, fiable et soigné.</Text>}
      {selectedPro && <Text style={styles.profileInfo}>🏆 Plus de 10 ans d’expérience</Text>}
      
      {!selectedPro && ['Mes projets', 'Mes soumissions', 'Mes favoris', 'Mes avis', 'Paramètres'].map((x) => (
        <TouchableOpacity key={x} onPress={() => x === 'Mes projets' ? onNavigate('Projets') : setProfileSection(x)} style={styles.menuRow}>
          <Text style={styles.menuText}>{x}</Text><Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default function App() {
  const [tab, setTab] = useState('Accueil');
const [category, setCategory] = useState('');
const [selectedPro, setSelectedPro] = useState(null);
 useEffect(() => {
  const backAction = () => {
    if (selectedPro) {
      setSelectedPro(null);
      setTab('Pros');
      return true;
    }
    if (tab !== 'Accueil') {
      setTab('Accueil');
      return true;
    }
    return false;
  };

  const subscription = BackHandler.addEventListener('hardwareBackPress', backAction);
  return () => subscription.remove();
}, [tab, selectedPro]);

  const navigate = (to, cat='', pro=null) => {
  setCategory(cat);
  setSelectedPro(pro);
  setTab(to);
};

  const content =
    tab === 'Accueil' ? <Home onNavigate={navigate} /> :
    tab === 'Pros' ? <Pros initialCategory={category} onNavigate={navigate} /> :
    tab === 'Projets' ? <Projects /> :
    tab === 'Messages' ? <Messages /> :
    <Profile onNavigate={navigate} selectedPro={selectedPro} />

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
      <View style={styles.content}>{content}</View>
      <View style={styles.nav}>
        {[
          ['Accueil','⌂'],
          ['Pros','⌕'],
          ['Projets','＋'],
          ['Messages','✉'],
          ['Profil','●'],
        ].map(([label, icon]) => (
          <TouchableOpacity key={label} style={styles.navItem} onPress={() => navigate(label)}>
            <Text style={[styles.navIcon, tab === label && styles.navActive]}>{icon}</Text>
            <Text style={[styles.navText, tab === label && styles.navActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.navy, paddingTop: Platform.OS === 'android' ? 0 : 0 },
  content: { flex: 1, backgroundColor: COLORS.bg },
  page: { padding: 18, paddingBottom: 30 },
  header: { backgroundColor: COLORS.navy, borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 },
  logoCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.gold, alignItems: 'center', justifyContent: 'center' },
  logoQ: { color: COLORS.navy, fontWeight: '900', fontSize: 19 },
  brand: { color: '#fff', fontSize: 24, fontWeight: '900' },
  tagline: { color: '#E9EDF4', fontSize: 11, marginTop: 2 },
  hero: { backgroundColor: COLORS.card, borderRadius: 20, padding: 22, borderWidth: 1, borderColor: COLORS.line },
  heroTitle: { color: COLORS.navy, fontWeight: '900', fontSize: 28, lineHeight: 33 },
  heroText: { color: COLORS.muted, fontSize: 15, lineHeight: 22, marginTop: 10, marginBottom: 18 },
  primaryBtn: { backgroundColor: COLORS.gold, paddingVertical: 14, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  primaryBtnText: { color: COLORS.navy, fontWeight: '900', fontSize: 15 },
  sectionTitle: { color: COLORS.navy, fontWeight: '900', fontSize: 19, marginTop: 24, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  categoryCard: { width: '48%', backgroundColor: COLORS.card, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: COLORS.line },
  categoryIcon: { fontSize: 22, color: COLORS.gold, marginBottom: 8 },
  categoryText: { color: COLORS.text, fontWeight: '700' },
  infoCard: { flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: COLORS.card, padding: 16, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: COLORS.line },
  infoIcon: { color: COLORS.gold, fontWeight: '900', fontSize: 22, width: 28, textAlign: 'center' },
  infoTitle: { color: COLORS.text, fontWeight: '800', fontSize: 15 },
  infoText: { color: COLORS.muted, fontSize: 13, lineHeight: 19, marginTop: 2 },
  screenTitle: { color: COLORS.navy, fontWeight: '900', fontSize: 27, marginBottom: 12 },
  helper: { color: COLORS.muted, lineHeight: 20, marginBottom: 14 },
  input: { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.line, borderRadius: 12, padding: 14, fontSize: 15, marginBottom: 10, color: COLORS.text },
  textArea: { minHeight: 130, textAlignVertical: 'top' },
  resultCount: { color: COLORS.muted, marginVertical: 8, fontWeight: '700' },
  proCard: { flexDirection: 'row', gap: 12, backgroundColor: COLORS.card, padding: 14, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.line },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: COLORS.navy2, alignItems: 'center', justifyContent: 'center' },
  avatarSmall: { width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.navy2, alignItems: 'center', justifyContent: 'center' },
  avatarLarge: { width: 78, height: 78, borderRadius: 39, backgroundColor: COLORS.navy2, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  avatarText: { color: '#fff', fontWeight: '900', fontSize: 20 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6 },
  proName: { color: COLORS.text, fontWeight: '900', fontSize: 15, flexShrink: 1 },
  proTrade: { color: COLORS.navy2, fontWeight: '700', marginTop: 3 },
  proMeta: { color: COLORS.muted, fontSize: 12, marginTop: 5 },
  badge: { backgroundColor: '#E6F6EF', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { color: COLORS.green, fontWeight: '900', fontSize: 10 },
  verifiedBadge: { backgroundColor: '#E6F6EF', padding: 12, borderRadius: 12, marginTop: 14 },
  verifiedBadgeText: { color: COLORS.green, fontWeight: '900', fontSize: 14 },
  profileInfo: { backgroundColor: COLORS.card, color: COLORS.navy, fontWeight: '700', fontSize: 14, padding: 12, borderRadius: 12, marginTop: 8, borderWidth: 1, borderColor: COLORS.line },
  cardActions: { flexDirection: 'row', gap: 8, marginTop: 10 },
  secondaryBtn: { borderWidth: 1, borderColor: COLORS.navy, borderRadius: 9, paddingVertical: 8, paddingHorizontal: 10 },
  secondaryBtnText: { color: COLORS.navy, fontWeight: '800', fontSize: 12 },
  smallGoldBtn: { backgroundColor: COLORS.gold, borderRadius: 9, paddingVertical: 8, paddingHorizontal: 10 },
  smallGoldBtnText: { color: COLORS.navy, fontWeight: '900', fontSize: 12 },
  success: { backgroundColor: '#E6F6EF', borderRadius: 12, padding: 14, marginTop: 14 },
  successText: { color: COLORS.green, fontWeight: '800' },
  messageCard: { flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: COLORS.card, padding: 15, borderRadius: 14, borderWidth: 1, borderColor: COLORS.line, marginBottom: 10 },
  time: { color: COLORS.muted, fontSize: 11 },
  profileCard: { alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 18, padding: 24, marginBottom: 14, borderWidth: 1, borderColor: COLORS.line },
  profileName: { color: COLORS.navy, fontWeight: '900', fontSize: 20, marginBottom: 5 },
  menuRow: { backgroundColor: COLORS.card, borderBottomWidth: 1, borderBottomColor: COLORS.line, paddingVertical: 17, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' },
  menuText: { color: COLORS.text, fontWeight: '700' },
  chevron: { color: COLORS.gold, fontSize: 24 },
  nav: { flexDirection: 'row', backgroundColor: COLORS.navy, paddingVertical: 8, paddingBottom: Platform.OS === 'ios' ? 18 : 9 },
  navItem: { flex: 1, alignItems: 'center' },
  navIcon: { color: '#AFB9C8', fontSize: 20, fontWeight: '800' },
  navText: { color: '#AFB9C8', fontSize: 10, marginTop: 2 },
  navActive: { color: COLORS.gold2, fontWeight: '900' },
});
