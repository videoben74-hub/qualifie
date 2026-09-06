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
  Platform, BackHandler, Image,
} from 'react-native';

const COLORS = {
  navy: '#0B1F3A',
  navy2: '#15345D',
  gold: '#D9A441',
  gold2: '#F2C66D',
  bg: '#DDE2E8',
  card: '#FFFFFF',
  text: '#172033',
  muted: '#6B7280',
  line: '#E4E8EF',
  green: '#138A5B',
  red: '#C0392B',
};

const pros = [
  { id: '1', name: 'Constructions RL', trade: 'Rénovation intérieure', city: 'Montréal', rating: 4.9, reviews: 42, distance: 12, verified: true, projectTypes: ['Résidentiel', 'Commercial'], workTypes: ['CCQ', 'Hors CCQ'] },
  { id: '2', name: 'Finition Expert', trade: 'Tireur de joint', city: 'Laval', rating: 4.8, reviews: 35, distance: 8, verified: true, projectTypes: ['Résidentiel'], workTypes: ['Hors CCQ'] },
  { id: '3', name: 'Bâtir Plus Inc.', trade: 'Menuiserie', city: 'Longueuil', rating: 4.7, reviews: 28, distance: 15, verified: true, projectTypes: ['Résidentiel', 'Commercial'], workTypes: ['CCQ'] },
  { id: '4', name: 'Électro SécuriPro', trade: 'Électricité', city: 'Montréal', rating: 4.9, reviews: 61, distance: 6, verified: true, projectTypes: ['Commercial'], workTypes: ['CCQ'] },
];

const categories = ['Rénovation', 'Tireur de joint', 'Peinture', 'Plomberie', 'Électricité', 'Menuiserie'];


const residentialCategories = [
  'Rénovation générale',
  'Charpente et menuiserie',
  'Portes et fenêtres',
  'Plomberie',
  'Électricité',
  'Ventilation',
  'Chauffage',
  'Climatisation',
  'Réfrigération',
  'Toiture',
  'Maçonnerie',
  'Excavation',
  'Fondation',
  'Béton',
  'Isolation',
  'Peinture',
  'Tireur de joint et plâtrier',
  'Céramique',
  'Revêtement de plancher',
  'Revêtement extérieur',
  'Ferblanterie',
  'Vitrerie',
  'Soudure et métaux',
  'Drain et égout',
  'Aménagement extérieur'
];

const residentialCcqCategories = [
  'Rénovation générale',
  'Charpente et menuiserie',
  'Portes et fenêtres',
  'Plomberie',
  'Électricité',
  'Ventilation',
  'Chauffage',
  'Climatisation',
  'Réfrigération',
  'Toiture',
  'Maçonnerie',
  'Excavation',
  'Fondation',
  'Béton',
  'Isolation',
  'Peinture',
  'Tireur de joint et plâtrier',
  'Céramique',
  'Revêtement de plancher',
  'Revêtement extérieur',
  'Ferblanterie',
  'Vitrerie',
  'Soudure et métaux',
  'Protection incendie',
  'Drain et égout',
  'Aménagement extérieur'
];

const commercialCategories = [
  'Rénovation générale',
  'Charpente et menuiserie',
  'Portes et fenêtres',
  'Plomberie',
  'Électricité',
  'Ventilation',
  'Chauffage',
  'Climatisation',
  'Réfrigération',
  'Toiture',
  'Maçonnerie',
  'Excavation',
  'Fondation',
  'Béton',
  'Isolation',
  'Peinture',
  'Tireur de joint et plâtrier',
  'Céramique',
  'Revêtement de plancher',
  'Revêtement extérieur',
  'Ferblanterie',
  'Vitrerie',
  'Soudure et métaux',
  'Protection incendie',
  'Drain et égout'
];
const professionalServices = [
  'Inspection préachat',
'Inspection de bâtiment',
'Évaluation immobilière',
'Architecture',
'Technologue en architecture',
'Ingénierie',
'Arpentage',
'Design intérieur'
];
const tradeTranslations = {
  'Rénovation générale': 'General renovation',
  'Charpente et menuiserie': 'Framing and carpentry',
  'Portes et fenêtres': 'Doors and windows',
  'Plomberie': 'Plumbing',
  'Électricité': 'Electrical',
  'Ventilation': 'Ventilation',
  'Chauffage': 'Heating',
  'Climatisation': 'Air conditioning',
  'Réfrigération': 'Refrigeration',
  'Rénovation': 'Renovation',
  'Tireur de joint': 'Drywall finisher',
  'Peinture': 'Painting',
  'Menuiserie': 'Carpentry',
  'Inspection préachat': 'Pre-purchase inspection',
  'Inspection de bâtiment': 'Building inspection',
  'Évaluation immobilière': 'Real estate appraisal',
  'Architecture': 'Architecture',
  'Technologue en architecture': 'Architectural technologist',
  'Ingénierie': 'Engineering',
  'Arpentage': 'Land surveying',
  'Design intérieur': 'Interior design'
};
function AppHeader({ language = 'fr', setLanguage }) {
  return (
    <View style={styles.header}>
      <View style={{ width: 68, height: 58, marginRight: 12, alignItems: 'center', justifyContent: 'flex-end' }}>
  <View style={{
    position: 'absolute',
    top: 5,
    left: 8,
    width: 34,
    height: 4,
    backgroundColor: COLORS.gold2,
    transform: [{ rotate: '-32deg' }],
    borderRadius: 2
  }} />
  <View style={{
    position: 'absolute',
    top: 5,
    right: 8,
    width: 34,
    height: 4,
    backgroundColor: COLORS.gold2,
    transform: [{ rotate: '32deg' }],
    borderRadius: 2
  }} />
  <View style={{ position: 'relative', width: 58, height: 48 }}>
  <Text style={{ fontSize: 38, fontWeight: '900', color: '#FFFFFF', lineHeight: 45 }}>
    Q
  </Text>

  <View
    style={{
      position: 'absolute',
      width: 27,
      height: 10,
      right: 4,
      bottom: 3,
      borderBottomWidth: 3,
      borderRightWidth: 3,
      borderColor: COLORS.gold2,
      borderBottomRightRadius: 18,
      transform: [{ rotate: '8deg' }],
    }}
  />
</View>
</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.brand}>QualiVérifié</Text>
        <Text style={styles.tagline}>Des projets en confiance, là où licence, distance et compétences ne font qu’un.</Text>
      <View style={{ flexDirection: 'row', marginTop: 5, gap: 8 }}>
  <TouchableOpacity onPress={() => setLanguage && setLanguage('fr')}>
    <Text style={{ color: language === 'fr' ? COLORS.gold2 : '#FFFFFF', fontWeight: '900', fontSize: 11 }}>FR</Text>
  </TouchableOpacity>
  <Text style={{ color: '#FFFFFF', fontSize: 11 }}>|</Text>
  <TouchableOpacity onPress={() => setLanguage && setLanguage('en')}>
    <Text style={{ color: language === 'en' ? COLORS.gold2 : '#FFFFFF', fontWeight: '900', fontSize: 11 }}>EN</Text>
  </TouchableOpacity>
</View>
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

function Home({ onNavigate, language, setLanguage }) {
  const [address, setAddress] = useState('');
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader language={language} setLanguage={setLanguage} />
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>{language === 'fr' ? 'Adresse du chantier' : 'Work site address'}</Text>
        <Text style={styles.heroText}>{language === 'fr' ? 'Entrez l’adresse où les travaux seront réalisés.' : 'Enter the address where the work will be carried out.'}</Text>
        
      </View>

      

<TextInput
  placeholder={language === 'fr' ? 'Adresse du chantier' : 'Work site address'}
    value={address}
  onChangeText={setAddress}
  style={[styles.input, { marginTop: 14 }]}
  onSubmitEditing={() => { if (address.trim()) onNavigate('TypeTravaux'); }}
  returnKeyType="search"
/>



      <Text style={styles.whyTitle}>{language === 'fr' ? 'Pourquoi QualiVérifié?' : 'Why QualiVérifié?'}</Text>
      {[
        ['✓', language === 'fr' ? 'Pros vérifiés' : 'Verified pros', language === 'fr' ? 'Identité, entreprise, licence et assurance vérifiées.' : 'Identity, business, licence and insurance verified.'],
        ['★', language === 'fr' ? 'Avis authentiques' : 'Authentic reviews', language === 'fr' ? 'Des évaluations liées à de vrais projets.' : 'Reviews linked to real projects.'],
        ['⌖', language === 'fr' ? 'Près de chez vous' : 'Near you', language === 'fr' ? 'Recherche par métier, ville et distance.' : 'Search by trade, city and distance.'],
      ].map(([i,t,d]) => (
        <View key={t} style={styles.infoCard}>
          <Text style={styles.infoIcon}>{i}</Text>
          <View style={{flex:1}}>
            <Text style={styles.infoTitle}>{t}</Text>
            <Text style={styles.infoText}>{d}</Text>
          </View>
        </View>
      ))}
   <View style={{ alignItems: 'center', marginTop: 45, marginBottom: 25 }}>
  <View style={{ width: 105, height: 52, backgroundColor: COLORS.gold2, borderTopLeftRadius: 60, borderTopRightRadius: 60 }}>
    <View style={{ position: 'absolute', width: 12, height: 42, backgroundColor: COLORS.gold, left: 46, top: 5, borderRadius: 6 }} />
  </View>
  <View style={{ width: 140, height: 12, backgroundColor: COLORS.gold2, borderRadius: 6, marginTop: -2 }} />
</View>
  </ScrollView>
  );
}
function TypeTravaux({ onNavigate, language, setLanguage }) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader language={language} setLanguage={setLanguage} />

      <Text style={styles.screenTitle}>{language === 'fr' ? 'Type de travaux' : 'Type of work'}</Text>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.categoryCard} onPress={() => onNavigate('Metiers', 'Résidentiel')}>
          <Text style={styles.categoryIcon}>⌂</Text>
          <Text style={styles.categoryText}>{language === 'fr' ? 'Résidentiel' : 'Residential'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryCard} onPress={() => onNavigate('Metiers', 'Résidentiel – CCQ')}>
          <Text style={styles.categoryIcon}>⌂</Text>
          <Text style={styles.categoryText}>{language === 'fr' ? 'Résidentiel – CCQ' : 'Residential – CCQ'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryCard} onPress={() => onNavigate('Metiers', 'Commercial')}>
          <Text style={styles.categoryIcon}>▦</Text>
          <Text style={styles.categoryText}>{language === 'fr' ? 'Commercial' : 'Commercial'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryCard} onPress={() => onNavigate('Metiers', 'Services professionnels')}>
          <Text style={styles.categoryIcon}>⌂</Text>
          <Text style={styles.categoryText}>{language === 'fr' ? 'Inspection et services professionnels' : 'Inspection and professional services'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Metiers({ onNavigate, initialType, language, setLanguage }) {
  const [projectType, setProjectType] = useState(initialType === 'Commercial' ? 'Commercial' : initialType ? 'Résidentiel' : '');
const [workType, setWorkType] = useState(initialType === 'Résidentiel' ? 'Hors CCQ' : initialType === 'Résidentiel — CCQ' || initialType === 'Commercial' ? 'CCQ' : '');
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader language={language} setLanguage={setLanguage} />

      <Text style={styles.screenTitle}>{language === 'fr' ? (initialType === 'Services professionnels' ? 'Inspection et services professionnels' : initialType ? `Métiers – ${initialType}` : 'Tous les métiers et services') : (initialType === 'Services professionnels' ? 'Inspection and professional services' : initialType === 'Résidentiel' ? 'Trades – Residential' : initialType === 'Résidentiel – CCQ' ? 'Trades – Residential – CCQ' : initialType === 'Commercial' ? 'Trades – Commercial' : 'All trades and services')}</Text>
      

      
        <View style={styles.grid}>
  {(initialType === 'Services professionnels' ? professionalServices : initialType === 'Commercial' ? commercialCategories : initialType === 'Résidentiel — CCQ' ? residentialCcqCategories : residentialCategories).map((c) => (
          <TouchableOpacity
            key={c}
            style={styles.categoryCard}
            onPress={() => onNavigate('Pros', c, null, { projectType, workType })}
          >
            <Text style={styles.categoryIcon}>⌂</Text>
            <Text style={styles.categoryText}>{language === 'fr' ? c : (tradeTranslations[c] || c)}</Text>
          </TouchableOpacity>
        ))}
      
</View>




    </ScrollView>
  );
}
function Pros({ initialCategory = '', initialFilters = {}, onNavigate, favorites, setFavorites, language, setLanguage }) {
  const [query, setQuery] = useState(initialCategory);
  const [city, setCity] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const c = city.trim().toLowerCase();
    return pros.filter((p) =>
  (!q || p.trade.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)) &&
  (!c || p.city.toLowerCase().includes(c)) &&
  (!initialFilters.projectType || p.projectTypes?.includes(initialFilters.projectType)) &&
  (!initialFilters.workType || p.workTypes?.includes(initialFilters.workType))
);
  }, [query, city, initialFilters]);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader language={language} setLanguage={setLanguage} />
      <Text style={styles.screenTitle}>{language === 'fr' ? 'Trouver un pro' : 'Find a pro'}</Text>
      <TextInput value={query} onChangeText={setQuery} placeholder={language === 'fr' ? 'Métier ou entreprise' : 'Trade or company'} style={styles.input} />
      <TextInput value={city} onChangeText={setCity} placeholder={language === 'fr' ? 'Ville (ex. Montréal)' : 'City (e.g. Montreal)'} style={styles.input} />
      <Text style={styles.resultCount}>{results.length} {language === 'fr' ? 'résultat(s)' : 'result(s)'}</Text>
 {results.map((p) => (
        <View key={p.id} style={styles.proCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{p.name.slice(0,1)}</Text></View>
          <View style={{flex:1}}>
            <View style={styles.rowBetween}>
  <Text style={styles.proName}>{p.name}</Text>

  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
    {p.verified && <Badge />}

    <TouchableOpacity
      onPress={() =>
        setFavorites((prev) =>
          prev.some((fav) => fav.id === p.id)
            ? prev.filter((fav) => fav.id !== p.id)
            : [...prev, p]
        )
      }
    >
      <Text style={{ fontSize: 28 }}>
        {favorites.some((fav) => fav.id === p.id) ? '♥️' : '♡'}
      </Text>
    </TouchableOpacity>
  </View>
</View>
            <Text style={styles.proTrade}>{language === 'fr' ? p.trade : (tradeTranslations[p.trade] || p.trade)}</Text>
            <Text style={styles.proMeta}>★ {p.rating} ({p.reviews})  •  {p.city}, QC  •  {p.distance} km</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
  {p.projectTypes?.map((type) => (
    <Text key={type} style={styles.badgeText}>
      {type === 'Résidentiel' ? '🏠 ' : '🏢 '}{type}
    </Text>
  ))}

  {p.workTypes?.map((type) => (
    <Text key={type} style={styles.badgeText}>
      {type === 'CCQ' ? '👷 ' : '🔨 '}{type}
    </Text>
  ))}
</View>
            <View style={styles.cardActions}>
  <TouchableOpacity onPress={() => onNavigate('Profil', '', p)} style={styles.secondaryBtn}>
    <Text style={styles.secondaryBtnText}>{language === 'fr' ? 'Voir le profil' : 'View profile'}</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => onNavigate('Profil', '', p)} style={styles.smallGoldBtn}><Text style={styles.smallGoldBtnText}>{language === 'fr' ? 'Soumission' : 'Quote'}</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function Messages({ selectedPro, language, setLanguage }) {
  const [selectedChat, setSelectedChat] = useState(selectedPro?.name || null);
const [messageText, setMessageText] = useState('');
const [sentMessage, setSentMessage] = useState('');
  if (selectedChat) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader language={language} setLanguage={setLanguage} />
      <TouchableOpacity onPress={() => setSelectedChat(null)}>
        <Text style={styles.proTrade}>{language === 'fr' ? '‹ Retour aux messages' : '‹ Back to messages'}</Text>
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
  placeholder={language === 'fr' ? 'Écrire un message...' : 'Write a message...'}
  placeholderTextColor={COLORS.muted}
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
  <Text style={styles.primaryBtnText}>{language === 'fr' ? 'Envoyer' : 'Send'}</Text>
</TouchableOpacity>
    </ScrollView>
  );
}
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader language={language} setLanguage={setLanguage} />
      <Text style={styles.screenTitle}>{language === 'fr' ? 'Messages' : 'Messages'}</Text>
      {[
        ['Finition Expert', language === 'fr' ? 'Bonjour! Je peux vous envoyer une estimation ce soir.' : 'Hello! I can send you an estimate tonight.', '10:42'],
        ['Constructions RL', language === 'fr' ? 'Merci pour les détails du projet.' : 'Thank you for the project details.', language === 'fr' ? 'Hier' : 'Yesterday'],
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

function Profile({ onNavigate, selectedPro, favorites, setFavorites, language, setLanguage }) {
  const [profileSection, setProfileSection] = useState(null);
  const [companyName, setCompanyName] = useState('');
const [neq, setNeq] = useState('');
const [rbq, setRbq] = useState('');
const [companyCity, setCompanyCity] = useState('');
  const [rbqCategories, setRbqCategories] = useState([]);
const [ccqStatus, setCcqStatus] = useState('');
const isNeqValid = /^\d{10}$/.test(neq.trim());
const isRbqValid = /^\d{4}-\d{4}-\d{2}$/.test(rbq.trim());
  const toggleRbqCategory = (category) => setRbqCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category]);
  
  if (profileSection) {
    
    
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader language={language} setLanguage={setLanguage} />
      <TouchableOpacity onPress={() => setProfileSection(null)}>
        <Text style={styles.proTrade}>{language === 'fr' ? '‹ Retour au profil' : '‹ Back to profile'}</Text>
      </TouchableOpacity>
      <Text style={styles.screenTitle}>{profileSection}</Text>
      <View style={styles.profileCard}>
  {profileSection === '🛡️ Devenir un pro vérifié' ? (
    <>
      <Text style={styles.sectionTitle}>{language === 'fr' ? 'Informations de l’entreprise' : 'Company information'}</Text>

      <TextInput
  value={companyName}
  onChangeText={setCompanyName}
  placeholder={language === 'fr' ? 'Nom de l’entreprise' : 'Company name'}
  style={styles.input}
/>

      <TextInput
  value={neq}
  onChangeText={setNeq}
  placeholder="NEQ"
  style={styles.input}
/>
{neq.trim() !== '' && !isNeqValid && <Text style={styles.infoText}>{language === 'fr' ? 'Le NEQ doit contenir exactement 10 chiffres.' : 'The NEQ must contain exactly 10 digits.'}</Text>}
      <TextInput
  value={rbq}
  onChangeText={setRbq}
  placeholder={language === 'fr' ? 'Numéro de licence RBQ' : 'RBQ licence number'}
  style={styles.input}
/>
{rbq.trim() !== '' && !isRbqValid && <Text style={styles.infoText}>{language === 'fr' ? 'Format RBQ attendu : 1234-5678-01.' : 'Expected RBQ format: 1234-5678-01.'}</Text>}
      <TextInput
  value={companyCity}
  onChangeText={setCompanyCity}
  placeholder={language === 'fr' ? 'Ville' : 'City'}
  style={styles.input}
/>
<Text style={styles.sectionTitle}>{language === 'fr' ? 'Sous-catégories RBQ' : 'RBQ subcategories'}</Text>
<Text style={styles.infoText}>{language === 'fr' ? 'Sélectionnez les sous-catégories correspondant à votre licence.' : 'Select the subcategories that match your licence.'}</Text>
   <View style={styles.grid}>
  {['Entrepreneur général', 'Charpente et menuiserie', 'Portes et fenêtres', 'Plomberie'].map((category) => (
    <TouchableOpacity
      key={category}
      style={[styles.categoryCard, rbqCategories.includes(category) && { borderColor: COLORS.gold, borderWidth: 2 }]}
      onPress={() => toggleRbqCategory(category)}
    >
      <Text style={styles.categoryText}>
{rbqCategories.includes(category) ? '✓ ' : ''}{language === 'fr' ? category : ({'Entrepreneur général':'General contractor','Charpente et menuiserie':'Framing and carpentry','Portes et fenêtres':'Doors and windows','Plomberie':'Plumbing'}[category] || category)}
</Text>
</TouchableOpacity>
))}
</View>
  <Text style={styles.sectionTitle}>{language === 'fr' ? 'Statut CCQ' : 'CCQ status'}</Text>
<View style={styles.grid}>
  <TouchableOpacity style={[styles.categoryCard, ccqStatus === 'CCQ' && { borderColor: COLORS.gold, borderWidth: 2 }]} onPress={() => setCcqStatus('CCQ')}>
    <Text style={styles.categoryText}>✓ CCQ</Text>
  </TouchableOpacity>
  <TouchableOpacity style={[styles.categoryCard, ccqStatus === 'Hors CCQ' && { borderColor: COLORS.gold, borderWidth: 2 }]} onPress={() => setCcqStatus('Hors CCQ')}>
    <Text style={styles.categoryText}>✓ {language === 'fr' ? 'Hors CCQ' : 'Non-CCQ'}</Text>
  </TouchableOpacity>
</View>
      <TouchableOpacity style={[styles.primaryBtn, (!companyName.trim() || !isNeqValid || !isRbqValid || !companyCity.trim() || rbqCategories.length === 0 || !ccqStatus.trim()) && { opacity: 0.4 }]} disabled={!companyName.trim() || !isNeqValid || !isRbqValid || !companyCity.trim() || rbqCategories.length === 0 || !ccqStatus.trim()} onPress={() => setProfileSection('Vérification en cours')}>
        <Text style={styles.primaryBtnText}>{language === 'fr' ? 'Commencer la vérification' : 'Start verification'}</Text>
      </TouchableOpacity>
    </>
  ) : profileSection === 'Vérification en cours' ? (
  <>
    <Text style={styles.sectionTitle}>{language === 'fr' ? 'Vérification en cours' : 'Verification in progress'}</Text>
    <Text style={styles.profileInfo}>{language === 'fr' ? 'Entreprise' : 'Company'} : {companyName}</Text>
    <Text style={styles.profileInfo}>NEQ : {neq}</Text>
    <Text style={styles.profileInfo}>{language === 'fr' ? 'Licence RBQ' : 'RBQ licence'} : {rbq}</Text>
    <Text style={styles.profileInfo}>{language === 'fr' ? 'Sous-catégories RBQ' : 'RBQ subcategories'} : {rbqCategories}</Text>
<Text style={styles.profileInfo}>{language === 'fr' ? 'Statut CCQ' : 'CCQ status'} : {ccqStatus}</Text>
<Text style={styles.profileInfo}>{language === 'fr' ? 'Ville' : 'City'} : {companyCity}</Text>
<Text style={styles.infoText}>{language === 'fr' ? '🛡️ Votre demande est prête à être vérifiée par QualiVérifié.' : '🛡️ Your application is ready to be verified by QualiVérifié.'}</Text>
</>
) : profileSection === 'Mes favoris' ? (
<>
{favorites.length === 0 ? (
<Text style={styles.infoText}>{language === 'fr' ? '♡ Aucun favori pour le moment.' : '♡ No favorites yet.'}</Text>
    ) : (
      favorites.map((fav) => (
        <View key={fav.id} style={[styles.proCard, { flexDirection: 'column', alignItems: 'stretch', width: '100%' }]}>
          <Text style={styles.proName}>{fav.name}</Text>
<Text style={styles.proTrade}>{language === 'fr' ? fav.trade : (tradeTranslations[fav.trade] || fav.trade)}</Text>
<Text style={styles.proMeta}>★ {fav.rating} • {fav.city}, QC</Text>

<TouchableOpacity
  style={[styles.contactBtn, { alignSelf: 'flex-start', width: '100%', marginTop: 10 }]}
  onPress={() => onNavigate('Profil', '', fav)}
>
  <Text style={styles.contactBtnText}>{language === 'fr' ? 'Voir le profil' : 'View profile'}</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.contactBtn, { alignSelf: 'flex-start', width: '100%', marginTop: 8 }]}
  onPress={() =>
    setFavorites((prev) =>
      prev.filter((item) => item.id !== fav.id)
    )
  }
>
  <Text style={styles.contactBtnText}>{language === 'fr' ? '🧡 Retirer des favoris' : '🧡 Remove from favorites'}</Text>
          </TouchableOpacity>
        </View>
      ))
    )}
  </>
) : (
  <Text style={styles.infoText}>{language === 'fr' ? 'Cette section sera bientôt disponible dans QualiVérifié.' : 'This section will be available soon in QualiVérifié.'}</Text>
)}
</View>
</ScrollView>
);
}
return (
<ScrollView contentContainerStyle={styles.page}>
<AppHeader language={language} setLanguage={setLanguage} />
<Text style={styles.screenTitle}>{language === 'fr' ? (selectedPro ? 'Profil QualiVérifié' : 'Mon profil') : (selectedPro ? 'QualiVérifié Profile' : 'My profile')}</Text>
<View style={styles.profileCard}>
<View style={styles.avatarLarge}><Text style={styles.avatarText}>{selectedPro ? selectedPro.name.slice(0,1) : 'B'}</Text></View>
<Text style={styles.profileName}>{selectedPro ? selectedPro.name : (language === 'fr' ? 'Compte client' : 'Client account')}</Text>
<Text style={styles.infoText}>{selectedPro ? `${language === 'fr' ? selectedPro.trade : (tradeTranslations[selectedPro.trade] || selectedPro.trade)} • ${selectedPro.city}, QC • ⭐ ${selectedPro.rating} (${selectedPro.reviews} ${language === 'fr' ? 'avis' : 'reviews'})` : (language === 'fr' ? 'Gérez vos projets, messages, favoris et avis.' : 'Manage your projects, messages, favorites and reviews.')}</Text>
      </View>
{selectedPro && <View style={styles.verifiedBadge}><Text style={styles.verifiedBadgeText}>{language === 'fr' ? '✓ QualiVérifié — Entrepreneur vérifié' : '✓ QualiVérifié — Verified contractor'}</Text></View>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? '🛡️ Licence et assurance vérifiées' : '🛡️ Licence and insurance verified'}</Text>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? '🛠️ Services offerts : rénovation intérieure et finition' : '🛠️ Services offered: interior renovation and finishing'}</Text>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? '⭐ 4.9/5 basé sur 42 avis clients' : '⭐ 4.9/5 based on 42 customer reviews'}</Text>}
{selectedPro && <Text style={styles.sectionTitle}>{language === 'fr' ? 'À propos' : 'About'}</Text>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? 'Constructions RL accompagne ses clients dans leurs projets de rénovation intérieure avec un service professionnel, fiable et soigné.' : 'Constructions RL supports its clients with their interior renovation projects, providing professional, reliable and meticulous service.'}</Text>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? '🏆 Plus de 10 ans d’expérience' : '🏆 Over 10 years of experience'}</Text>}
{selectedPro && <TouchableOpacity style={styles.quoteBtn} onPress={() => onNavigate('Projets')}><Text style={styles.quoteBtnText}>{language === 'fr' ? '📋 Demander une soumission' : '📋 Request a quote'}</Text></TouchableOpacity>}
{selectedPro && <TouchableOpacity style={styles.contactBtn} onPress={() => onNavigate('Messages', '', selectedPro)}><Text style={styles.contactBtnText}>{language === 'fr' ? '💬 Contacter l’entrepreneur' : '💬 Contact contractor'}</Text></TouchableOpacity>}
       {selectedPro && <TouchableOpacity style={styles.contactBtn} onPress={() => setFavorites((prev) => prev.some((fav) => fav.id === selectedPro.id) ? prev.filter((fav) => fav.id !== selectedPro.id) : [...prev, selectedPro])}><Text style={styles.contactBtnText}>{favorites.some((fav) => fav.id === selectedPro.id) ? (language === 'fr' ? '❤️ Retirer des favoris' : '❤️ Remove from favorites') : (language === 'fr' ? '♡ Ajouter aux favoris' : '♡ Add to favorites')}</Text></TouchableOpacity>}
{selectedPro && <Text style={styles.sectionTitle}>{language === 'fr' ? '🛡️ Vérifications QualiVérifié' : '🛡️ QualiVérifié verifications'}</Text>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? '✅ Licence RBQ vérifiée' : '✅ RBQ licence verified'}</Text>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? '✅ Assurance responsabilité vérifiée' : '✅ Liability insurance verified'}</Text>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? '✅ Identité de l’entreprise vérifiée' : '✅ Company identity verified'}</Text>}
{selectedPro && <Text style={styles.sectionTitle}>{language === 'fr' ? '📍 Zones desservies' : '📍 Service areas'}</Text>}
            {selectedPro && <Text style={styles.profileInfo}>Montréal • Laval • Rive-Nord • Rive-Sud</Text>}
{selectedPro && <Text style={styles.sectionTitle}>{language === 'fr' ? '📸 Réalisations' : '📸 Projects'}</Text>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? '📷 Photos des réalisations à venir' : '📷 Project photos coming soon'}</Text>}
{selectedPro && <Text style={styles.sectionTitle}>{language === 'fr' ? '⭐ Avis clients' : '⭐ Customer reviews'}</Text>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? '⭐⭐⭐⭐⭐ Excellent travail, professionnel et très propre. — Client vérifié' : '⭐⭐⭐⭐⭐ Excellent work, professional and very clean. — Verified client'}</Text>}
{!selectedPro && ['🛡️ Devenir un pro vérifié', '🏗️ Projets disponibles', 'Mes projets', 'Mes soumissions', 'Mes favoris', 'Mes avis', 'Paramètres'].map((x) => (
<TouchableOpacity key={x} onPress={() => x === '🏗️ Projets disponibles' ? onNavigate('ProjetsDisponibles') : x === 'Mes projets' ? onNavigate('Projets') : setProfileSection(x)} style={styles.menuRow}>
<Text style={styles.menuText}>{language === 'fr' ? x : ({'🛡️ Devenir un pro vérifié':'🛡️ Become a verified pro','🏗️ Projets disponibles':'🏗️ Available projects','Mes projets':'My projects','Mes soumissions':'My quotes','Mes favoris':'My favorites','Mes avis':'My reviews','Paramètres':'Settings'}[x] || x)}</Text><Text style={styles.chevron}>›</Text>
</TouchableOpacity>
))}

    </ScrollView>
  );
}

export default function App() {
  const [tab, setTab] = useState('Accueil');
const [category, setCategory] = useState('');
const [selectedPro, setSelectedPro] = useState(null);
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({});
const [favorites, setFavorites] = useState([]);
const [language, setLanguage] = useState('fr');
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

  const navigate = (to, cat='', pro=null, newFilters={}) => {
  setCategory(cat);
  setSelectedPro(pro);
  setFilters(newFilters);
  setTab(to);
};

  const content =
    tab === 'Accueil' ? <Home onNavigate={navigate} language={language} setLanguage={setLanguage} /> :
    tab === 'TypeTravaux' ? <TypeTravaux onNavigate={navigate} language={language} setLanguage={setLanguage} /> :
tab === 'Metiers' ? <Metiers onNavigate={navigate} initialType={category} language={language} setLanguage={setLanguage} /> :
    tab === 'Pros' ? <Pros initialCategory={category} initialFilters={filters} onNavigate={navigate} favorites={favorites} setFavorites={setFavorites} language={language} setLanguage={setLanguage} /> :
  
  
    tab === 'Messages' ? <Messages selectedPro={selectedPro} language={language} setLanguage={setLanguage} /> :
<Profile onNavigate={navigate} selectedPro={selectedPro} favorites={favorites} setFavorites={setFavorites} language={language} setLanguage={setLanguage} />

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
      <View style={styles.content}>{content}</View>
      <View style={styles.nav}>
        {[
  ['Accueil', language === 'fr' ? 'Accueil' : 'Home', '⌂'],
  
  ['Messages', language === 'fr' ? 'Messages' : 'Messages', '✉'],
  ['Profil', language === 'fr' ? 'Profil' : 'Profile', '●'],
].map(([tabName, label, icon]) => (
          <TouchableOpacity key={tabName} style={styles.navItem} onPress={() => navigate(tabName)}>
  <Text style={[styles.navIcon, tab === tabName && styles.navActive]}>{icon}</Text>
  <Text style={[styles.navText, tab === tabName && styles.navActive]}>{label}</Text>
</TouchableOpacity>
))}
</View>

<View style={styles.sloganBar}>
  <Text style={styles.sloganTop}>{language === 'fr' ? 'Des projets aujourd’hui.' : 'Projects today.'}</Text>
  <Text style={styles.sloganBottom}>{language === 'fr' ? 'Un meilleur demain.' : 'A better tomorrow.'}</Text>
</View>

</SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.navy, paddingTop: Platform.OS === 'android' ? 12 : 0, paddingBottom: Platform.OS === 'android' ? 28 : 0 },
  content: { flex: 1, backgroundColor: COLORS.bg },
  page: { padding: 12, paddingBottom: 16 },
  header: { backgroundColor: COLORS.navy, borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 },
  logoCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.gold, alignItems: 'center', justifyContent: 'center' },
  logoQ: { color: COLORS.navy, fontWeight: '900', fontSize: 19 },
  brand: { color: '#fff', fontSize: 24, fontWeight: '900' },
  tagline: { color: '#E9EDF4', fontSize: 11, marginTop: 2 },
  hero: { backgroundColor: COLORS.card, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: COLORS.line },
  heroTitle: { color: COLORS.navy, fontWeight: '900', fontSize: 28, lineHeight: 33 },
  heroText: { color: COLORS.muted, fontSize: 14, lineHeight: 19, marginTop: 6, marginBottom: 10 },
  primaryBtn: { backgroundColor: COLORS.gold, paddingVertical: 14, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  primaryBtnText: { color: COLORS.navy, fontWeight: '900', fontSize: 15 },
  sectionTitle: { color: COLORS.navy, fontWeight: '900', fontSize: 18, marginTop: 12, marginBottom: 8 },
whyTitle: { color: COLORS.navy, fontWeight: '900', fontSize: 13, marginTop: 7, marginBottom: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  categoryCard: { width: '48%', backgroundColor: COLORS.card, padding: 10, borderRadius: 12, borderWidth: 1, borderColor: COLORS.line },
  categoryIcon: { fontSize: 20, color: COLORS.gold, marginBottom: 4 },
  categoryText: { color: COLORS.text, fontWeight: '700' },
  infoCard: { flexDirection: 'row', gap: 5, alignItems: 'center', backgroundColor: COLORS.card, padding: 6, borderRadius: 9, marginBottom: 4, borderWidth: 1, borderColor: COLORS.line },
  infoIcon: { color: COLORS.gold, fontWeight: '900', fontSize: 15, width: 20, textAlign: 'center' },
  infoTitle: { color: COLORS.text, fontWeight: '800', fontSize: 12 },
  infoText: { color: COLORS.muted, fontSize: 10, lineHeight: 13, marginTop: 1 },
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
          quoteBtn: { backgroundColor: COLORS.gold, padding: 16, borderRadius: 14, marginTop: 14, alignItems: 'center' },
  quoteBtnText: { color: COLORS.navy, fontWeight: '900', fontSize: 16 },
  contactBtn: { backgroundColor: COLORS.card, borderWidth: 2, borderColor: COLORS.navy, padding: 14, borderRadius: 14, marginTop: 10, alignItems: 'center' },
  contactBtnText: { color: COLORS.navy, fontWeight: '900', fontSize: 16 },
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
  nav: { flexDirection: 'row', backgroundColor: COLORS.navy, paddingTop: 8, paddingBottom: Platform.OS === 'ios' ? 18 : 22 },
  navItem: { flex: 1, alignItems: 'center' },
  navIcon: { color: '#AFB9C8', fontSize: 20, fontWeight: '800' },
  navText: { color: '#AFB9C8', fontSize: 10, marginTop: 2 },
  navActive: { color: COLORS.gold2, fontWeight: '900' },
  sloganBar: {
  backgroundColor: COLORS.navy,
  alignItems: 'center',
  paddingTop: 10,
  paddingBottom: Platform.OS === 'android' ? 34 : 18,
},
sloganTop: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '700',
},
sloganBottom: {
  color: COLORS.gold2,
  fontSize: 18,
  fontWeight: '900',
  marginTop: 2,
},
  allTradesBtn: {
  backgroundColor: COLORS.navy,
  borderRadius: 12,
  paddingVertical: 14,
  paddingHorizontal: 16,
  alignItems: 'center',
  marginTop: 14,
},
allTradesBtnText: {
  color: COLORS.gold2,
  fontSize: 15,
  fontWeight: '900',
},
});
