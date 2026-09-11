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
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
function AppHeader({ language = 'fr', setLanguage, onNavigate }) {
  return (
    <View style={{
      backgroundColor: COLORS.navy,
      borderBottomLeftRadius: 22,
      borderBottomRightRadius: 22,
      paddingTop: Platform.OS === 'android' ? 38 : 14,
paddingBottom: 9,
paddingHorizontal: 8,
marginBottom: 8,
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
}}>

        <View style={{
          width: '72%',
          alignItems: 'center',
        }}>
          <Text style={{
            color: '#FFFFFF',
            fontSize: 25,
            fontWeight: '900',
          }}>
            Quali<Text style={{ color: COLORS.gold2 }}>Vérifié</Text>
          </Text>

          <Text style={{
            color: '#FFFFFF',
            fontSize: 10,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: 5,
            lineHeight: 14,
          }}>
            Des projets en confiance, là où licence, distance et compétences ne font qu’un.
          </Text>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 7,
            gap: 9,
          }}>
            <TouchableOpacity onPress={() => setLanguage && setLanguage('fr')}>
              <Text style={{
                color: language === 'fr' ? COLORS.gold2 : '#FFFFFF',
                fontWeight: '900',
                fontSize: 13,
              }}>
                FR
              </Text>
            </TouchableOpacity>

            <Text style={{ color: '#FFFFFF', fontSize: 13 }}>|</Text>

            <TouchableOpacity onPress={() => setLanguage && setLanguage('en')}>
              <Text style={{
                color: language === 'en' ? COLORS.gold2 : '#FFFFFF',
                fontWeight: '900',
                fontSize: 13,
              }}>
                EN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
  style={{
    width: '28%',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <TouchableOpacity
  onPress={() => onNavigate && onNavigate('Signup')}
  activeOpacity={0.8}
  style={{
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: COLORS.gold2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  }}
>
  <Text
    style={{
      width: '100%',
      color: COLORS.navy,
      fontSize: 13,
      fontWeight: '900',
      textAlign: 'center',
      textAlignVertical: 'center',
      lineHeight: 16,
    }}
  >
    {language === 'fr'
      ? 'Abonnement\nEntreprise\nÀ partir de\n27,77 $'
      : 'Business\nSubscription\nFrom\n$27.77'}
  </Text>
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
  const [homeAddressSuggestions, setHomeAddressSuggestions] = useState([]);
const [homeAddressLoading, setHomeAddressLoading] = useState(false);
const [selectedHomeAddress, setSelectedHomeAddress] = useState(null);
  const [showAuthOptions, setShowAuthOptions] = useState(false);
  useEffect(() => {
  if (address.trim().length < 3) {
    setHomeAddressSuggestions([]);
    setHomeAddressLoading(false);
    return;
  }

  const timer = setTimeout(async () => {
    try {
      setHomeAddressLoading(true);

      const search = encodeURIComponent(address.trim());

      const response = await fetch(
        `https://geolocator.api.geo.ca/?q=${search}&lang=${language === 'fr' ? 'fr' : 'en'}&keys=nominatim`
      );

      const data = await response.json();

const results =
  Array.isArray(data)
    ? data
    : Array.isArray(data?.features)
    ? data.features
    : Array.isArray(data?.results)
    ? data.results
    : [];

setHomeAddressSuggestions(results.slice(0, 5));
    } catch (error) {
      console.log('Erreur recherche adresse accueil:', error);
      setHomeAddressSuggestions([]);
    } finally {
      setHomeAddressLoading(false);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [address, language]);
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader language={language} setLanguage={setLanguage} onNavigate={onNavigate} />
      <View style={{
  backgroundColor: COLORS.card,
  borderRadius: 16,
  paddingHorizontal: 14,
  paddingVertical: 10,
  marginHorizontal: 10,
  marginBottom: 8,
}}>
  <Text style={{
    color: COLORS.navy,
    fontSize: 19,
    fontWeight: '900',
  }}>
    {language === 'fr' ? 'Adresse du chantier' : 'Work site address'}
  </Text>

  <Text style={{
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
    marginBottom: 7,
  }}>
    {language === 'fr'
      ? 'Entrez l’adresse où les travaux seront réalisés.'
      : 'Enter the address where the work will be carried out.'}
  </Text>

  <TextInput
  placeholder={
    language === 'fr'
      ? 'Ex. : 123 Rue Principale, Montréal'
      : 'Ex.: 123 Main Street, Montreal'
  }
  placeholderTextColor="#8A94A5"
  value={address}
  onChangeText={(text) => {
    setAddress(text);
    setSelectedHomeAddress(null);
  }}
  style={{
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6DDE7',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    color: COLORS.text,
    fontSize: 13,
  }}
  onSubmitEditing={() => {
    if (selectedHomeAddress) {
      onNavigate('TypeTravaux');
    } else {
      alert(
        language === 'fr'
          ? 'Veuillez sélectionner une adresse dans les suggestions.'
          : 'Please select an address from the suggestions.'
      );
    }
  }}
  returnKeyType="search"
/>
      {homeAddressLoading && (
  <Text style={{ marginTop: 6, color: COLORS.muted }}>
    {language === 'fr'
      ? 'Recherche des adresses...'
      : 'Searching addresses...'}
  </Text>
)}

{homeAddressSuggestions.map((suggestion, index) => {
  const label =
    suggestion.title ||
    suggestion.display_name ||
    suggestion.name ||
    suggestion.address ||
    suggestion.label ||
    '';

  if (!label) return null;

  return (
    <TouchableOpacity
      key={`${label}-${index}`}
      onPress={() => {
        setAddress(label);
        setSelectedHomeAddress(suggestion);
        setHomeAddressSuggestions([]);
      }}
      style={{
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D6DDE7',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 5,
      }}
    >
      <Text
        style={{
          color: COLORS.text,
          fontSize: 13,
          fontWeight: '700',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
})}
</View>



      <View style={{
  marginHorizontal: 10,
  marginBottom: 8,
}}>
  <Text style={{
    color: COLORS.navy,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 6,
  }}>
    {language === 'fr' ? 'Pourquoi QualiVérifié?' : 'Why QualiVérifié?'}
  </Text>

  {[
    [
      '✓',
      language === 'fr' ? 'Pros vérifiés' : 'Verified pros',
      language === 'fr'
        ? 'Identité, entreprise, licence et assurance vérifiées.'
        : 'Identity, business, licence and insurance verified.'
    ],
    [
      '★',
      language === 'fr' ? 'Avis authentiques' : 'Authentic reviews',
      language === 'fr'
        ? 'Des évaluations liées à de vrais projets.'
        : 'Reviews linked to real projects.'
    ],
    [
      '⌖',
      language === 'fr' ? 'Près de chez vous' : 'Near you',
      language === 'fr'
        ? 'Recherche par métier, ville et distance.'
        : 'Search by trade, city and distance.'
    ],
  ].map(([icon, title, description]) => (
    <View
      key={title}
      style={{
        backgroundColor: COLORS.card,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Text style={{
        color: COLORS.gold,
        fontSize: 18,
        fontWeight: '900',
        width: 26,
        textAlign: 'center',
        marginRight: 6,
      }}>
        {icon}
      </Text>

      <View style={{ flex: 1 }}>
        <Text style={{
          color: COLORS.text,
          fontSize: 14,
          fontWeight: '900',
        }}>
          {title}
        </Text>

        <Text
  numberOfLines={1}
  adjustsFontSizeToFit
  style={{
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
  }}
>
  {description}
</Text>
</View>
</View>
))}
</View>
   <View style={{
  alignItems: 'center',
  marginHorizontal: 12,
  marginTop: 4,
  marginBottom: 6,
}}>
  <Text style={{
    color: COLORS.gold,
    fontSize: 19,
    fontWeight: '800',
    fontStyle: 'italic',
    textAlign: 'center',
  }}>
    {language === 'fr'
      ? 'Bienvenue chez QualiVérifié !'
      : 'Welcome to QualiVérifié!'}
  </Text>

  <Text
    numberOfLines={2}
    adjustsFontSizeToFit
    style={{
      color: COLORS.navy,
      fontSize: 12,
      fontWeight: '700',
      lineHeight: 16,
      textAlign: 'center',
      marginTop: 4,
    }}
  >
    {language === 'fr'
      ? 'Des pros vérifiés et de confiance pour vos projets partout au Québec.'
      : 'Verified and trusted pros for your projects across Quebec.'}
  </Text>

  <Text style={{
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 3,
  }}>
    {language === 'fr'
      ? 'Des gens de chez nous, pour des projets durables.'
      : 'Local people, building projects that last.'}
  </Text>
</View>
    <View style={{
  flexDirection: 'row',
  gap: 12,
  marginHorizontal: 18,
  marginTop: 18,
  marginBottom: 12,
}}>
  <TouchableOpacity
    onPress={() => onNavigate('Login')}
    style={{
      flex: 1,
      minHeight: 58,
      borderWidth: 2,
      borderColor: COLORS.navy,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{
      color: COLORS.navy,
      fontSize: 15,
      fontWeight: '900',
    }}>
      Connectez-vous
    </Text>
    <Text style={{
      color: COLORS.muted,
      fontSize: 12,
      fontWeight: '700',
      marginTop: 2,
    }}>
      Sign in
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => onNavigate('Signup')}
    style={{
      flex: 1,
      minHeight: 58,
      backgroundColor: COLORS.gold2,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{
      color: COLORS.navy,
      fontSize: 15,
      fontWeight: '900',
    }}>
      Inscrivez-vous
    </Text>
    <Text style={{
      color: COLORS.muted,
      fontSize: 12,
      fontWeight: '700',
      marginTop: 2,
    }}>
      Sign up
    </Text>
  </TouchableOpacity>
</View>
            <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 28,
        marginTop: 2,
        marginBottom: 4,
      }}
    >
      {[
        ['1', language === 'fr' ? 'Connexion' : 'Sign in'],
        ['2', language === 'fr' ? 'Adresse' : 'Address'],
        ['3', language === 'fr' ? 'Métier' : 'Trade'],
        ['4', language === 'fr' ? 'Soumission' : 'Quote'],
      ].map(([number, label], index) => (
        <React.Fragment key={number}>
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                width: 27,
                height: 27,
                borderRadius: 14,
                backgroundColor: COLORS.gold2,
                borderWidth: 1,
                borderColor: COLORS.navy,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: COLORS.navy,
                  fontSize: 13,
                  fontWeight: '900',
                }}
              >
                {number}
              </Text>
            </View>

            <Text
              style={{
                color: COLORS.navy,
                fontSize: 10,
                fontWeight: '800',
                marginTop: 3,
              }}
            >
              {label}
            </Text>
          </View>

          {index < 3 && (
            <Text
              style={{
                color: COLORS.gold,
                fontSize: 19,
                fontWeight: '700',
                marginBottom: 14,
              }}
            >
              →
            </Text>
          )}
        </React.Fragment>
      ))}
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
  const [addressQuery, setAddressQuery] = useState('');
const [addressSuggestions, setAddressSuggestions] = useState([]);
const [addressLoading, setAddressLoading] = useState(false);
useEffect(() => {
  if (addressQuery.trim().length < 3) {
    setAddressSuggestions([]);
    setAddressLoading(false);
    return;
  }

  const timer = setTimeout(async () => {
    try {
      setAddressLoading(true);

      const search = encodeURIComponent(addressQuery.trim());

const response = await fetch(
  `https://geolocator.api.geo.ca/?q=${search}&lang=${language === 'fr' ? 'fr' : 'en'}&keys=nominatim`
);

      const data = await response.json();

      setAddressSuggestions(
        Array.isArray(data) ? data.slice(0, 5) : []
      );
    } catch (error) {
      console.log('Erreur recherche adresse:', error);
      setAddressSuggestions([]);
    } finally {
      setAddressLoading(false);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [addressQuery, language]);
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
      <TextInput
  value={addressQuery}
  onChangeText={(text) => {
    setAddressQuery(text);
    setCity('');
  }}
  placeholder={
    language === 'fr'
      ? 'Entrez votre adresse'
      : 'Enter your address'
  }
  style={styles.input}
/>
    {addressLoading && (
  <Text style={styles.resultCount}>
    {language === 'fr'
      ? 'Recherche des adresses...'
      : 'Searching addresses...'}
  </Text>
)}

{addressSuggestions.map((suggestion, index) => {
  const label =
    suggestion.title ||
    suggestion.name ||
    suggestion.address ||
    suggestion.label ||
    '';

  return (
    <TouchableOpacity
      key={`${label}-${index}`}
      style={styles.input}
      onPress={() => {
        setAddressQuery(label);
        setAddressSuggestions([]);

        const detectedCity =
          suggestion.city ||
          suggestion.municipality ||
          suggestion.locality ||
          '';

        setCity(detectedCity);
      }}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
})}
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
const [profilePhoto, setProfilePhoto] = useState(null);
const [companyDescription, setCompanyDescription] = useState('');
const [companyPhotos, setCompanyPhotos] = useState([]);
const [neq, setNeq] = useState('');
const [rbq, setRbq] = useState('');
const [companyCity, setCompanyCity] = useState('');
const [rbqCategories, setRbqCategories] = useState([]);
const [ccqStatus, setCcqStatus] = useState('');
  
    const [profileLoaded, setProfileLoaded] = useState(false);

useEffect(() => {
  const loadCompanyProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem(
        'qualiverifie_company_profile'
      );

      if (savedProfile) {
        const profile = JSON.parse(savedProfile);

        setCompanyName(profile.companyName || '');
        setProfilePhoto(profile.profilePhoto || null);
        setCompanyDescription(profile.companyDescription || '');
        setCompanyPhotos(
          Array.isArray(profile.companyPhotos) ? profile.companyPhotos : []
        );
        setNeq(profile.neq || '');
        setRbq(profile.rbq || '');
        setCompanyCity(profile.companyCity || '');
        setRbqCategories(
          Array.isArray(profile.rbqCategories) ? profile.rbqCategories : []
        );
        setCcqStatus(profile.ccqStatus || '');
      }
    } catch (error) {
      console.log('Erreur chargement profil entreprise :', error);
    } finally {
      setProfileLoaded(true);
    }
  };

  loadCompanyProfile();
}, []);

useEffect(() => {
  if (!profileLoaded) return;

  const saveCompanyProfile = async () => {
    try {
      await AsyncStorage.setItem(
        'qualiverifie_company_profile',
        JSON.stringify({
          companyName,
          profilePhoto,
          companyDescription,
          companyPhotos,
          neq,
          rbq,
          companyCity,
          rbqCategories,
          ccqStatus,
        })
      );
    } catch (error) {
      console.log('Erreur sauvegarde profil entreprise :', error);
    }
  };

  saveCompanyProfile();
}, [
  profileLoaded,
  companyName,
  profilePhoto,
  companyDescription,
  companyPhotos,
  neq,
  rbq,
  companyCity,
  rbqCategories,
  ccqStatus,
]);
  const customerReviews = [
  {
    id: 1,
    rating: 5,
    fr: 'Excellent service. Entrepreneur professionnel et ponctuel.',
    en: 'Excellent service. Professional and punctual contractor.',
  },
  {
    id: 2,
    rating: 5,
    fr: 'Très satisfait du résultat. Je recommande cette entreprise.',
    en: 'Very satisfied with the result. I recommend this company.',
  },
];

const averageRating =
  customerReviews.length > 0
    ? (
        customerReviews.reduce(
          (total, review) => total + review.rating,
          0
        ) / customerReviews.length
      ).toFixed(1)
    : '0.0';
const isNeqValid = /^\d{10}$/.test(neq.trim());
const isRbqValid = /^\d{4}-\d{4}-\d{2}$/.test(rbq.trim());
  const toggleRbqCategory = (category) => setRbqCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category]);
  const pickProfilePhoto = async () => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert(
      language === 'fr'
        ? 'Permission requise pour accéder aux photos.'
        : 'Permission is required to access photos.'
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (!result.canceled && result.assets?.length > 0) {
    setProfilePhoto(result.assets[0].uri);
  }
};
  const pickCompanyPhoto = async () => {
  if (companyPhotos.length >= 10) {
    alert(
      language === 'fr'
        ? 'Vous pouvez ajouter un maximum de 10 photos.'
        : 'You can add a maximum of 10 photos.'
    );
    return;
  }

  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert(
      language === 'fr'
        ? 'Permission requise pour accéder aux photos.'
        : 'Permission is required to access photos.'
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    quality: 0.8,
  });

  if (!result.canceled && result.assets?.length > 0) {
    setCompanyPhotos((current) => [
      ...current,
      result.assets[0].uri,
    ]);
  }
};
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
<Text
  style={{
    color: COLORS.green,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 12,
  }}
>
  {language === 'fr'
    ? '✅ Profil sauvegardé automatiquement'
    : '✅ Profile saved automatically'}
</Text>
      <TextInput
  value={companyName}
  onChangeText={setCompanyName}
  placeholder={language === 'fr' ? 'Nom de l’entreprise' : 'Company name'}
  style={styles.input}
/>
<TextInput
  value={companyDescription}
  onChangeText={setCompanyDescription}
  placeholder={
    language === 'fr'
      ? 'Description de votre entreprise'
      : 'Describe your business'
  }
  placeholderTextColor={COLORS.muted}
  maxLength={1000}
  multiline
  textAlignVertical="top"
  style={[
    styles.input,
    {
      minHeight: 130,
      paddingTop: 14,
      marginBottom: 6,
    },
  ]}
/>

<Text style={[styles.infoText, { textAlign: 'right', marginBottom: 14 }]}>
  {companyDescription.length}/1000
</Text>

<Text style={styles.sectionTitle}>
  {language === 'fr' ? '📸 Photos de l’entreprise' : '📸 Business photos'}
</Text>

<Text style={styles.infoText}>
  {language === 'fr'
    ? `Ajoutez jusqu’à 10 photos (${companyPhotos.length}/10)`
    : `Add up to 10 photos (${companyPhotos.length}/10)`}
</Text>

<TouchableOpacity
  onPress={pickCompanyPhoto}
  style={[styles.primaryBtn, { marginTop: 10, marginBottom: 14 }]}
>
  <Text style={styles.primaryBtnText}>
    {language === 'fr'
      ? `📷 Ajouter une photo (${companyPhotos.length}/10)`
      : `📷 Add a photo (${companyPhotos.length}/10)`}
  </Text>
</TouchableOpacity>

{companyPhotos.length > 0 && (
  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 16,
    }}
  >
    {companyPhotos.map((photo, index) => (
      <View
        key={`${photo}-${index}`}
        style={{
          width: '47%',
          marginBottom: 10,
        }}
      >
        <Image
          source={{ uri: photo }}
          style={{
            width: '100%',
            height: 120,
            borderRadius: 12,
          }}
        />

        <TouchableOpacity
          onPress={() =>
            setCompanyPhotos((current) =>
              current.filter((_, photoIndex) => photoIndex !== index)
            )
          }
          style={{
            marginTop: 6,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#B00020', fontWeight: '800' }}>
            {language === 'fr' ? '✕ Supprimer' : '✕ Remove'}
          </Text>
        </TouchableOpacity>
      </View>
    ))}
  </View>
)}
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
) : profileSection === 'Mes avis' ? (
  <>
    <Text style={styles.sectionTitle}>
      {language === 'fr' ? '⭐ Avis clients' : '⭐ Customer reviews'}
    </Text>

    <Text style={styles.profileInfo}>
      {language === 'fr'
        ? 'Note moyenne : 5.0 / 5'
        : 'Average rating: 5.0 / 5'}
    </Text>

    <Text style={styles.infoText}>
      {language === 'fr' ? '2 avis clients' : '2 customer reviews'}
    </Text>

    {[
      {
        id: 1,
        rating: 5,
        fr: 'Excellent service. Entrepreneur professionnel et ponctuel.',
        en: 'Excellent service. Professional and punctual contractor.',
      },
      {
        id: 2,
        rating: 5,
        fr: 'Très satisfait du résultat. Je recommande cette entreprise.',
        en: 'Very satisfied with the result. I recommend this company.',
      },
    ].map((review) => (
      <View
        key={review.id}
        style={{
          backgroundColor: '#FFFFFF',
          padding: 16,
          borderRadius: 14,
          marginTop: 14,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 6 }}>
          {'⭐'.repeat(review.rating)}
        </Text>

        <Text style={styles.infoText}>
          {language === 'fr' ? review.fr : review.en}
        </Text>
      </View>
    ))}
  </>
) : profileSection === 'Abonnement' ? (
  <>
    <Text style={styles.sectionTitle}>
      {language === 'fr'
        ? '💳 Abonnement entreprise'
        : '💳 Business subscription'}
    </Text>

    <Text style={styles.profileInfo}>
  {language === 'fr'
    ? 'Forfaits QualiVérifié'
    : 'QualiVérifié plans'}
</Text>

<Text style={[styles.infoText, { textAlign: 'center' }]}>
  {language === 'fr'
    ? '1 division — 27,77 $ / mois'
    : '1 division — $27.77 / month'}
</Text>

<Text style={[styles.infoText, { marginTop: 8, textAlign: 'center' }]}>
  {language === 'fr'
    ? '2 divisions — 37,77 $ / mois'
    : '2 divisions — $37.77 / month'}
</Text>

<Text style={[styles.infoText, { marginTop: 8, fontWeight: '800' }]}>
  {language === 'fr'
    ? 'Maximum de 2 divisions par entreprise'
    : 'Maximum of 2 divisions per business'}
</Text>
    

    <View
      style={{
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 14,
        marginTop: 16,
      }}
    >
      <Text style={styles.menuText}>
        {language === 'fr' ? '✅ Statut' : '✅ Status'}
      </Text>

      <Text style={styles.infoText}>
        {language === 'fr'
          ? 'Abonnement entreprise actif'
          : 'Business subscription active'}
      </Text>

      <Text style={[styles.menuText, { marginTop: 14 }]}>
        {language === 'fr' ? '⭐ Inclus' : '⭐ Included'}
      </Text>

      <View style={{ width: '100%' }}>
  <Text style={[styles.infoText, { marginBottom: 4 }]}>
    {language === 'fr' ? '• Profil entreprise visible' : '• Visible business profile'}
  </Text>
  <Text style={[styles.infoText, { marginBottom: 4 }]}>
    {language === 'fr' ? '• Accès aux demandes de soumission' : '• Access to quote requests'}
  </Text>
  <Text style={[styles.infoText, { marginBottom: 4 }]}>
    {language === 'fr' ? '• Messagerie avec les clients' : '• Client messaging'}
  </Text>
  <Text style={[styles.infoText, { marginBottom: 4 }]}>
    {language === 'fr' ? '• Avis clients' : '• Customer reviews'}
  </Text>
  <Text style={styles.infoText}>
    {language === 'fr' ? '• Présence dans les résultats de recherche' : '• Presence in search results'}
  </Text>
</View>
    </View>

    <TouchableOpacity
      style={[styles.primaryBtn, { marginTop: 18 }]}
      onPress={() =>
        alert(
          language === 'fr'
            ? 'La gestion du paiement et du renouvellement sera activée prochainement.'
            : 'Payment and renewal management will be activated soon.'
        )
      }
    >
      <Text style={styles.primaryBtnText}>
        {language === 'fr'
          ? 'Gérer mon abonnement'
          : 'Manage my subscription'}
      </Text>
    </TouchableOpacity>
  </>
) : profileSection === 'Paramètres' ? (
  <>
    <Text style={styles.sectionTitle}>
      {language === 'fr' ? '⚙️ Paramètres' : '⚙️ Settings'}
    </Text>

    <Text style={styles.menuText}>
      {language === 'fr' ? '🌐 Langue' : '🌐 Language'}
    </Text>

    

    <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
      <TouchableOpacity
        style={[
          styles.primaryBtn,
          { flex: 1, opacity: language === 'fr' ? 1 : 0.6 },
        ]}
        onPress={() => setLanguage('fr')}
      >
        <Text style={styles.primaryBtnText}>FR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.primaryBtn,
          { flex: 1, opacity: language === 'en' ? 1 : 0.6 },
        ]}
        onPress={() => setLanguage('en')}
      >
        <Text style={styles.primaryBtnText}>EN</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity
      style={[styles.primaryBtn, { marginTop: 22 }]}
      onPress={() =>
        alert(
          language === 'fr'
            ? 'La gestion des notifications sera disponible prochainement.'
            : 'Notification management will be available soon.'
        )
      }
    >
      <Text style={styles.primaryBtnText}>
        {language === 'fr'
          ? '🔔 Gérer les notifications'
          : '🔔 Manage notifications'}
        </Text>
</TouchableOpacity>
      <TouchableOpacity
  style={[styles.primaryBtn, { marginTop: 14 }]}
  onPress={() =>
    alert(
      language === 'fr'
        ? 'Les options de sécurité du compte seront disponibles prochainement.'
        : 'Account security options will be available soon.'
    )
  }
>
  <Text style={styles.primaryBtnText}>
    {language === 'fr'
      ? '🔒 Sécurité du compte'
      : '🔒 Account security'}
  </Text>
</TouchableOpacity>
</>
      
) : profileSection === 'Profil public' ? (
  <>
    <Text style={styles.sectionTitle}>
      {language === 'fr' ? '👤 Profil public' : '👤 Public profile'}
    </Text>
{profilePhoto && (
  <Image
    source={{ uri: profilePhoto }}
    style={{
      width: 110,
      height: 110,
      borderRadius: 55,
      alignSelf: 'center',
      marginBottom: 14,
    }}
  />
)}
    <Text style={styles.profileInfo}>
      {companyName && companyName.trim()
        ? companyName
        : language === 'fr'
        ? 'Nom de votre entreprise'
        : 'Your business name'}
    </Text>
{companyDescription.trim() !== '' && (
  <>
    <Text style={[styles.menuText, { marginTop: 16 }]}>
      {language === 'fr' ? '🏢 À propos de nous' : '🏢 About us'}
    </Text>

    <Text style={[styles.infoText, { marginTop: 6 }]}>
      {companyDescription}
    </Text>
  </>
)}

{companyPhotos.length > 0 && (
  <>
    <Text style={[styles.menuText, { marginTop: 18, marginBottom: 10 }]}>
      {language === 'fr' ? '📸 Nos réalisations' : '📸 Our work'}
    </Text>

    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 16,
      }}
    >
      {companyPhotos.map((photo, index) => (
        <Image
          key={`${photo}-${index}`}
          source={{ uri: photo }}
          style={{
            width: '47%',
            height: 120,
            borderRadius: 12,
            marginBottom: 6,
          }}
        />
      ))}
    </View>
  </>
)}
    <Text style={styles.infoText}>
      {language === 'fr'
        ? `⭐ Note : ${averageRating} / 5 (${customerReviews.length} avis)`
        : `⭐ Rating: ${averageRating} / 5 (${customerReviews.length} reviews)`}
    </Text>

    <Text style={styles.infoText}>
      {language === 'fr'
        ? `📍 Ville : ${companyCity && companyCity.trim() ? companyCity : 'Non renseignée'}`
        : `📍 City: ${companyCity && companyCity.trim() ? companyCity : 'Not provided'}`}
    </Text>

    <Text style={styles.infoText}>
      {language === 'fr'
        ? `🪪 Licence RBQ : ${rbq && rbq.trim() ? rbq : 'Non renseignée'}`
        : `🪪 RBQ licence: ${rbq && rbq.trim() ? rbq : 'Not provided'}`}
    </Text>

    <Text style={styles.infoText}>
      {language === 'fr'
        ? `👷 Statut CCQ : ${ccqStatus && ccqStatus.trim() ? ccqStatus : 'Non renseigné'}`
        : `👷 CCQ status: ${ccqStatus && ccqStatus.trim() ? ccqStatus : 'Not provided'}`}
    </Text>

    <Text style={[styles.menuText, { marginTop: 14 }]}>
      {language === 'fr' ? '🛠 Services' : '🛠 Services'}
    </Text>

    <Text style={styles.infoText}>
      {rbqCategories && rbqCategories.length > 0
        ? rbqCategories.join(', ')
        : language === 'fr'
        ? 'Aucun service sélectionné.'
        : 'No services selected.'}
    </Text>

    <Text style={[styles.infoText, { marginTop: 14 }]}>
      {language === 'fr'
        ? 'Ces informations représentent ce que les clients verront sur votre profil QualiVérifié.'
        : 'This information represents what clients will see on your QualiVérifié profile.'}
    </Text>
  </>
) : (
  <Text style={styles.infoText}>
    {language === 'fr'
      ? 'Cette section sera bientôt disponible dans QualiVérifié.'
      : 'This section will be available soon in QualiVérifié.'}
  </Text>
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
<TouchableOpacity
  style={styles.avatarLarge}
  onPress={pickProfilePhoto}
>
  {profilePhoto ? (
    <Image
      source={{ uri: profilePhoto }}
      style={{ width: '100%', height: '100%', borderRadius: 999 }}
    />
  ) : (
    <Text style={styles.avatarText}>
      {selectedPro ? selectedPro.name.slice(0, 1) : '📷'}
    </Text>
  )}
</TouchableOpacity>
<Text style={styles.profileName}>
  {selectedPro
    ? selectedPro.name
    : (language === 'fr' ? 'Menu Entreprise' : 'Business Menu')}
</Text>

<Text
  style={[
    styles.infoText,
    {
      textAlign: 'center',
      width: '100%',
      paddingHorizontal: 10,
    },
  ]}
>
  {selectedPro
    ? `${language === 'fr'
        ? selectedPro.trade
        : (tradeTranslations[selectedPro.trade] || selectedPro.trade)
      } • ${selectedPro.city}, QC • ⭐ ${selectedPro.rating} (${selectedPro.reviews} ${language === 'fr' ? 'avis' : 'reviews'})`
    : (language === 'fr'
        ? 'Bon succès dans vos projets !'
        : 'Wishing you success in your projects!')}
</Text>
      </View>
{selectedPro && <View style={styles.verifiedBadge}><Text style={styles.verifiedBadgeText}>{language === 'fr' ? '✓ QualiVérifié — Entrepreneur vérifié' : '✓ QualiVérifié — Verified contractor'}</Text></View>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? '🛡️ Licence et assurance vérifiées' : '🛡️ Licence and insurance verified'}</Text>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? '🛠️ Services offerts : rénovation intérieure et finition' : '🛠️ Services offered: interior renovation and finishing'}</Text>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? '⭐ 4.9/5 basé sur 42 avis clients' : '⭐ 4.9/5 based on 42 customer reviews'}</Text>}
{selectedPro && <Text style={styles.sectionTitle}>{language === 'fr' ? 'À propos' : 'About'}</Text>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? 'Constructions RL accompagne ses clients dans leurs projets de rénovation intérieure avec un service professionnel, fiable et soigné.' : 'Constructions RL supports its clients with their interior renovation projects, providing professional, reliable and meticulous service.'}</Text>}
{selectedPro && <Text style={styles.profileInfo}>{language === 'fr' ? '🏆 Plus de 10 ans d’expérience' : '🏆 Over 10 years of experience'}</Text>}
{selectedPro && <TouchableOpacity style={styles.quoteBtn} onPress={() => onNavigate('Projets', '', selectedPro)}><Text style={styles.quoteBtnText}>{language === 'fr' ? '📋 Demander une soumission' : '📋 Request a quote'}</Text></TouchableOpacity>}
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
{!selectedPro && [
  { fr: '⭐ Avis', en: '⭐ Reviews', section: 'Mes avis' },
  { fr: '💳 Abonnement', en: '💳 Subscription', section: 'Abonnement' },
  { fr: '⚙️ Paramètres', en: '⚙️ Settings', section: 'Paramètres' },
  { fr: '👤 Profil public', en: '👤 Public profile', section: 'Profil public' },
  { fr: '🚪 Déconnexion', en: '🚪 Log out', section: 'Déconnexion' },
].map((item) => (
  <TouchableOpacity
    key={item.section}
    onPress={() =>
      item.section === 'Déconnexion'
        ? onNavigate('Accueil')
        : setProfileSection(item.section)
    }
    style={styles.menuRow}
  >
    <Text style={styles.menuText}>
      {language === 'fr' ? item.fr : item.en}
    </Text>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
))}

    </ScrollView>
  );
}
 function EntrepriseDemo({ onNavigate, language, setLanguage }) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader
        language={language}
        setLanguage={setLanguage}
        onNavigate={onNavigate}
      />

      <TouchableOpacity
        onPress={() => onNavigate('Accueil')}
        style={{
          alignSelf: 'flex-start',
          paddingVertical: 8,
          paddingHorizontal: 4,
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            color: COLORS.navy,
            fontSize: 16,
            fontWeight: '900',
          }}
        >
          ← {language === 'fr' ? 'Déconnexion' : 'Sign out'}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: COLORS.navy,
          fontSize: 27,
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: 4,
        }}
      >
        {language === 'fr' ? 'Espace entreprise' : 'Business dashboard'}
      </Text>

      <Text
        style={{
          color: COLORS.gold,
          fontSize: 16,
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        Construction Démo inc.
      </Text>

      {[
        [
          '📋',
          language === 'fr'
            ? 'Demandes de soumission'
            : 'Quote requests',
          language === 'fr'
            ? '3 nouvelles demandes'
            : '3 new requests',
        ],
        [
          '💬',
          language === 'fr' ? 'Messages clients' : 'Client messages',
          language === 'fr'
            ? '2 conversations actives'
            : '2 active conversations',
        ],
        [
          '🏢',
          language === 'fr'
            ? 'Profil de l’entreprise'
            : 'Business profile',
          language === 'fr'
            ? 'Informations et vérifications'
            : 'Information and verification',
        ],
        [
          '⭐',
          language === 'fr' ? 'Avis reçus' : 'Reviews',
          '4.9 / 5',
        ],
        [
          '💳',
          language === 'fr' ? 'Abonnement' : 'Subscription',
          language === 'fr'
            ? 'Entreprise — actif'
            : 'Business — active',
        ],
      ].map(([icon, title, subtitle]) => (
        <TouchableOpacity
          key={title}
       onPress={() => {
  if (title === (language === 'fr' ? 'Demandes de soumission' : 'Quote requests')) {
    onNavigate('QuoteRequests');
  }
}}
          style={{
            backgroundColor: COLORS.card,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: COLORS.line,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: COLORS.navy,
              fontSize: 17,
              fontWeight: '900',
              marginBottom: 4,
            }}
          >
            {icon} {title}
          </Text>

          <Text
            style={{
              color: COLORS.muted,
              fontSize: 13,
              fontWeight: '700',
            }}
          >
            {subtitle}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
 function QuoteRequests({ onNavigate, language, setLanguage }) {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
    >
      <Text
        style={{
          color: COLORS.navy,
          fontSize: 27,
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        {language === 'fr'
          ? 'Demandes de soumission'
          : 'Quote requests'}
      </Text>

      <Text
        style={{
          color: COLORS.muted,
          fontSize: 15,
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        {language === 'fr'
          ? '3 nouvelles demandes'
          : '3 new requests'}
      </Text>

      {[
        {
          client: 'Client #001',
          project:
            language === 'fr'
              ? 'Rénovation de salle de bain'
              : 'Bathroom renovation',
          location: 'Montréal, QC',
        },
        {
          client: 'Client #002',
          project:
            language === 'fr'
              ? 'Peinture intérieure'
              : 'Interior painting',
          location: 'Laval, QC',
        },
        {
          client: 'Client #003',
          project:
            language === 'fr'
              ? 'Rénovation de cuisine'
              : 'Kitchen renovation',
          location: 'Longueuil, QC',
        },
      ].map((request, index) => (
        <View
          key={index}
          style={{
            backgroundColor: COLORS.card,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: COLORS.line,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: COLORS.navy,
              fontSize: 17,
              fontWeight: '900',
              marginBottom: 6,
            }}
          >
            {request.project}
          </Text>

          <Text
            style={{
              color: COLORS.muted,
              fontSize: 14,
              fontWeight: '700',
              marginBottom: 4,
            }}
          >
            👤 {request.client}
          </Text>

          <Text
            style={{
              color: COLORS.muted,
              fontSize: 14,
              fontWeight: '700',
            }}
          >
            📍 {request.location}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        onPress={() => onNavigate('EnterpriseDemo')}
        style={{
          backgroundColor: COLORS.gold2,
          borderRadius: 14,
          minHeight: 54,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 12,
        }}
      >
        <Text
          style={{
            color: COLORS.navy,
            fontSize: 16,
            fontWeight: '900',
          }}
        >
          {language === 'fr'
            ? 'Retour à l’espace entreprise'
            : 'Back to business dashboard'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
 function Projets({ onNavigate, selectedPro, projects, setProjects, language, setLanguage }) {
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [sent, setSent] = useState(false);

  const sendQuoteRequest = () => {
    if (!description.trim() || !address.trim()) {
      return;
    }

    const newProject = {
      id: Date.now(),
      contractorId: selectedPro?.id || null,
      contractorName: selectedPro?.name || 'Entrepreneur',
      clientName: 'Client démo',
      address: address.trim(),
      description: description.trim(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    setProjects((current) => [newProject, ...current]);
    setSent(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader
        language={language}
        setLanguage={setLanguage}
        onNavigate={onNavigate}
      />

      <TouchableOpacity
        onPress={() => onNavigate('Profil', '', selectedPro)}
        style={{
          alignSelf: 'flex-start',
          paddingVertical: 8,
          paddingHorizontal: 4,
          marginBottom: 6,
        }}
      >
        <Text
          style={{
            color: COLORS.navy,
            fontSize: 16,
            fontWeight: '900',
          }}
        >
          ← {language === 'fr' ? 'Retour' : 'Back'}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: COLORS.navy,
          fontSize: 28,
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: 6,
        }}
      >
        {language === 'fr'
          ? 'Demande de soumission'
          : 'Quote request'}
      </Text>

      <Text
        style={{
          color: COLORS.gold,
          fontSize: 17,
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        {selectedPro?.name || (language === 'fr'
          ? 'Entrepreneur sélectionné'
          : 'Selected contractor')}
      </Text>

      {sent ? (
        <View
          style={{
            backgroundColor: COLORS.card,
            borderWidth: 1,
            borderColor: COLORS.line,
            borderRadius: 16,
            padding: 20,
          }}
        >
          <Text
            style={{
              color: COLORS.navy,
              fontSize: 22,
              fontWeight: '900',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            ✅ {language === 'fr'
              ? 'Demande envoyée !'
              : 'Request sent!'}
          </Text>

          <Text
            style={{
              color: COLORS.muted,
              fontSize: 14,
              fontWeight: '700',
              textAlign: 'center',
                           lineHeight: 21,
              marginBottom: 18,
            }}
          >
            {language === 'fr'
              ? `Votre demande a été transmise à ${selectedPro?.name || 'l’entrepreneur'}.`
              : `Your request has been sent to ${selectedPro?.name || 'the contractor'}.`}
          </Text>

          <TouchableOpacity
            onPress={() => onNavigate('Accueil')}
            style={{
              backgroundColor: COLORS.gold2,
              borderRadius: 14,
              minHeight: 54,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: COLORS.navy,
                fontSize: 16,
                fontWeight: '900',
              }}
            >
              {language === 'fr'
                ? 'Retour à l’accueil'
                : 'Back to home'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text
            style={{
              color: COLORS.navy,
              fontSize: 15,
              fontWeight: '900',
              marginBottom: 7,
            }}
          >
            {language === 'fr'
              ? 'Adresse du chantier'
              : 'Project address'}
          </Text>

          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder={language === 'fr'
              ? 'Ex. : 123 Rue Principale, Montréal'
              : 'Ex.: 123 Main Street, Montreal'}
            placeholderTextColor={COLORS.muted}
            style={{
              backgroundColor: COLORS.card,
              borderWidth: 1,
              borderColor: COLORS.line,
              borderRadius: 14,
              minHeight: 54,
              paddingHorizontal: 14,
              color: COLORS.navy,
              fontSize: 15,
              marginBottom: 16,
            }}
          />

          <Text
            style={{
              color: COLORS.navy,
              fontSize: 15,
              fontWeight: '900',
              marginBottom: 7,
            }}
          >
            {language === 'fr'
              ? 'Décrivez les travaux'
              : 'Describe the work'}
          </Text>

          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline
            placeholder={language === 'fr'
              ? 'Ex. : Rénovation complète de la salle de bain...'
              : 'Ex.: Complete bathroom renovation...'}
            placeholderTextColor={COLORS.muted}
            style={{
              backgroundColor: COLORS.card,
              borderWidth: 1,
              borderColor: COLORS.line,
              borderRadius: 14,
              minHeight: 130,
              padding: 14,
              color: COLORS.navy,
              fontSize: 15,
              textAlignVertical: 'top',
              marginBottom: 18,
            }}
          />

          <TouchableOpacity
            onPress={sendQuoteRequest}
            style={{
              backgroundColor: COLORS.gold2,
              borderRadius: 14,
              minHeight: 58,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: COLORS.navy,
                fontSize: 16,
                fontWeight: '900',
              }}
            >
              📋 {language === 'fr'
                ? 'Envoyer la demande'
                : 'Send request'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
 function Login({ onNavigate, onDemoLogin, language, setLanguage }) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader
        language={language}
        setLanguage={setLanguage}
        onNavigate={onNavigate}
      />

      <TouchableOpacity
        onPress={() => onNavigate('Accueil')}
        style={{
          alignSelf: 'flex-start',
          paddingVertical: 8,
          paddingHorizontal: 4,
          marginBottom: 6,
        }}
      >
        <Text
          style={{
            color: COLORS.navy,
            fontSize: 16,
            fontWeight: '900',
          }}
        >
          ← {language === 'fr' ? 'Retour' : 'Back'}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: COLORS.navy,
          fontSize: 28,
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        {language === 'fr' ? 'Connexion' : 'Sign in'}
      </Text>

      <Text
        style={{
          color: COLORS.muted,
          fontSize: 14,
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        {language === 'fr'
          ? 'Choisissez un compte de démonstration.'
          : 'Choose a demo account.'}
      </Text>

      <TouchableOpacity
        onPress={() => onDemoLogin('client')}
        style={{
          backgroundColor: COLORS.card,
          borderWidth: 2,
          borderColor: COLORS.navy,
          borderRadius: 14,
          minHeight: 64,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 14,
        }}
      >
        <Text
          style={{
            color: COLORS.navy,
            fontSize: 17,
            fontWeight: '900',
          }}
        >
          👤 {language === 'fr' ? 'Client démo' : 'Demo client'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onDemoLogin('business')}
        style={{
          backgroundColor: COLORS.gold2,
          borderRadius: 14,
          minHeight: 64,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: COLORS.navy,
            fontSize: 17,
            fontWeight: '900',
          }}
        >
          🏢 {language === 'fr' ? 'Entreprise démo' : 'Demo business'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
function Signup({ onNavigate, language, setLanguage }) {
  const [accountType, setAccountType] = useState('business');
const [businessName, setBusinessName] = useState('');
const [rbqNumber, setRbqNumber] = useState('');
const [rbqVerified, setRbqVerified] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader
  language={language}
  setLanguage={setLanguage}
  onNavigate={onNavigate}
/>

      <TouchableOpacity
        onPress={() => onNavigate('Accueil')}
        style={{
          alignSelf: 'flex-start',
          paddingVertical: 8,
          paddingHorizontal: 4,
          marginBottom: 6,
        }}
      >
        <Text
          style={{
            color: COLORS.navy,
            fontSize: 16,
            fontWeight: '900',
          }}
        >
          ← {language === 'fr' ? 'Retour' : 'Back'}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: COLORS.navy,
          fontSize: 28,
          fontWeight: '900',
          marginBottom: 6,
        }}
      >
        {language === 'fr' ? 'Créez votre compte' : 'Create your account'}
      </Text>

      <Text
        style={{
          color: COLORS.muted,
          fontSize: 14,
          lineHeight: 20,
          marginBottom: 16,
        }}
      >
        {language === 'fr'
          ? 'Inscrivez-vous pour faire partie de la communauté QualiVérifié.'
          : 'Sign up to join the QualiVérifié community.'}
      </Text>
        <View
  style={{
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  }}
>
  <TouchableOpacity
    onPress={() => setAccountType('business')}
    style={{
      flex: 1,
      minHeight: 72,
      borderRadius: 14,
      backgroundColor:
        accountType === 'business' ? COLORS.gold2 : COLORS.card,
      borderWidth: 1,
      borderColor:
        accountType === 'business' ? COLORS.gold2 : COLORS.line,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
    }}
  >
    <Text
      style={{
        color: COLORS.navy,
        fontSize: 15,
        fontWeight: '900',
        textAlign: 'center',
      }}
    >
      🧰 {language === 'fr' ? 'Je suis une entreprise' : 'I am a business'}
    </Text>

    <Text
      style={{
        color: COLORS.muted,
        fontSize: 12,
        fontWeight: '700',
        marginTop: 3,
      }}
    >
      {language === 'fr' ? 'Entrepreneur' : 'Contractor'}
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => setAccountType('client')}
    style={{
      flex: 1,
      minHeight: 72,
      borderRadius: 14,
      backgroundColor:
        accountType === 'client' ? COLORS.gold2 : COLORS.card,
      borderWidth: 1,
      borderColor:
        accountType === 'client' ? COLORS.gold2 : COLORS.line,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
    }}
  >
    <Text
      style={{
        color: COLORS.navy,
        fontSize: 15,
        fontWeight: '900',
        textAlign: 'center',
      }}
    >
      👤 {language === 'fr' ? 'Je suis un particulier' : 'I am a client'}
    </Text>

    <Text
      style={{
        color: COLORS.muted,
        fontSize: 12,
        fontWeight: '700',
        marginTop: 3,
      }}
    >
      Client
    </Text>
  </TouchableOpacity>
</View>
        {accountType === 'business' && (
  <TextInput
         value={businessName}
         onChangeText={setBusinessName}
    placeholder={language === 'fr' ? "Nom de l’entreprise *" : 'Business name *'}
    placeholderTextColor={COLORS.muted}
    style={{
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.line,
      borderRadius: 14,
      minHeight: 54,
      paddingHorizontal: 14,
      color: COLORS.navy,
      fontSize: 15,
      marginBottom: 12,
    }}
  />
  )}
  {accountType === 'business' && (
  <>
    <TextInput
      value={rbqNumber}
      onChangeText={(text) => {
        setRbqNumber(text);
        setRbqVerified(false);
      }}
      placeholder={
        language === 'fr'
          ? 'Numéro de licence RBQ *'
          : 'RBQ licence number *'
      }
      placeholderTextColor={COLORS.muted}
      keyboardType="numbers-and-punctuation"
      style={{
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: rbqVerified ? COLORS.gold2 : COLORS.line,
        borderRadius: 14,
        minHeight: 54,
        paddingHorizontal: 14,
        color: COLORS.navy,
        fontSize: 15,
        marginBottom: 10,
      }}
    />

    <TouchableOpacity
      onPress={() => {
        if (!rbqNumber.trim()) {
          alert(
            language === 'fr'
              ? 'Veuillez entrer votre numéro de licence RBQ.'
              : 'Please enter your RBQ licence number.'
          );
          return;
        }

        alert(
          language === 'fr'
            ? 'La vérification automatique avec le registre officiel de la RBQ sera connectée à cette étape.'
            : 'Automatic verification with the official RBQ registry will be connected at this step.'
        );
      }}
      style={{
        backgroundColor: COLORS.navy,
        borderRadius: 14,
        minHeight: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          color: COLORS.gold2,
          fontSize: 15,
          fontWeight: '900',
        }}
      >
        {language === 'fr'
          ? '🔎 Vérifier la licence RBQ'
          : '🔎 Verify RBQ licence'}
      </Text>
    </TouchableOpacity>
  </>
)}
)}
  <TextInput
value={email}
onChangeText={setEmail}
  placeholder={language === 'fr' ? 'Courriel *' : 'Email *'}
  placeholderTextColor={COLORS.muted}
  keyboardType="email-address"
  autoCapitalize="none"
  style={{
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 14,
    minHeight: 54,
    paddingHorizontal: 14,
    color: COLORS.navy,
    fontSize: 15,
    marginBottom: 12,
  }}
/>
  <TextInput
value={password}
onChangeText={setPassword}
  placeholder={language === 'fr' ? 'Mot de passe *' : 'Password *'}
  placeholderTextColor={COLORS.muted}
  secureTextEntry
  autoCapitalize="none"
  style={{
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 14,
    minHeight: 54,
    paddingHorizontal: 14,
    color: COLORS.navy,
    fontSize: 15,
    marginBottom: 12,
  }}
/>
  <TextInput
value={confirmPassword}
onChangeText={setConfirmPassword}
  placeholder={language === 'fr' ? 'Confirmer le mot de passe *' : 'Confirm password *'}
  placeholderTextColor={COLORS.muted}
  secureTextEntry
  autoCapitalize="none"
  style={{
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 14,
    minHeight: 54,
    paddingHorizontal: 14,
    color: COLORS.navy,
    fontSize: 15,
    marginBottom: 12,
  }}
/>
  <TouchableOpacity
onPress={() => {
  if (!email || !password || !confirmPassword || (accountType === 'business' && !businessName)) {
    alert(language === 'fr' ? 'Veuillez remplir tous les champs obligatoires.' : 'Please fill in all required fields.');
    return;
  }
  if (accountType === 'business' && !rbqVerified) {
  alert(
    language === 'fr'
      ? 'Vous devez vérifier votre licence RBQ avant de créer votre compte.'
      : 'You must verify your RBQ licence before creating your account.'
  );
  return;
}
  if (password !== confirmPassword) {
    alert(language === 'fr' ? 'Les mots de passe ne correspondent pas.' : 'Passwords do not match.');
    return;
  }
  alert(language === 'fr' ? 'Compte prêt à être créé !' : 'Account ready to be created!');
  onNavigate('Accueil');
}}
  style={{
    backgroundColor: COLORS.gold2,
    borderRadius: 14,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 14,
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 16,
      fontWeight: '900',
    }}
  >
    {language === 'fr' ? 'Créer mon compte' : 'Create my account'}
  </Text>
</TouchableOpacity>
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
  const onDemoLogin = (type) => {
    if (type === 'client') {
      setSelectedPro(null);
      setTab('Accueil');
    } else {
      setSelectedPro(null);
      setTab('EntrepriseDemo');
    }
  };
  const content =
  tab === 'Accueil' ? (
  <Home
    onNavigate={navigate}
    language={language}
    setLanguage={setLanguage}
  />
) :
tab === 'Login' ? (
  <Login
    onNavigate={navigate}
    onDemoLogin={onDemoLogin}
    language={language}
    setLanguage={setLanguage}
  />
) :
tab === 'Signup' ? (
  <Signup
    onNavigate={navigate}
    language={language}
    setLanguage={setLanguage}
  />
) :
  tab === 'TypeTravaux' ? (
    <TypeTravaux
      onNavigate={navigate}
      language={language}
      setLanguage={setLanguage}
    />
  ) :
tab === 'Metiers' ? <Metiers onNavigate={navigate} initialType={category} language={language} setLanguage={setLanguage} /> :
    tab === 'Pros' ? <Pros initialCategory=
{category} initialFilters={filters} onNavigate=
{navigate} favorites={favorites} setFavorites=
{setFavorites} language={language} setLanguage=
{setLanguage} /> :
tab === 'Projets' ? (
  <Projets
    onNavigate={navigate}
    selectedPro={selectedPro}
    projects={projects}
    setProjects={setProjects}
    language={language}
    setLanguage={setLanguage}
  />
) :
tab === 'EnterpriseDemo' ? (
  <EnterpriseDemo
    onNavigate={navigate}
    language={language}
    setLanguage={setLanguage}
  />
) :
tab === 'QuoteRequests' ? (
  <QuoteRequests
    onNavigate={navigate}
    language={language}
    setLanguage={setLanguage}
  />
) :
tab === 'Messages' ? (
  <Messages
    selectedPro={selectedPro}
    language={language}
    setLanguage={setLanguage}
  />
) : (
  <Profile
    onNavigate={navigate}
    selectedPro={selectedPro}
    favorites={favorites}
    setFavorites={setFavorites}
    language={language}
    setLanguage={setLanguage}
  />
)

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
  <Text style={[styles.navIcon, (tab === tabName || (tabName === 'Profil' && tab === 'EntrepriseDemo')) && styles.navActive]}>{icon}</Text>
  <Text style={[styles.navText, (tab === tabName || (tabName === 'Profil' && tab === 'EntrepriseDemo')) && styles.navActive]}>{label}</Text>
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
  nav: {
  flexDirection: 'row',
  backgroundColor: COLORS.navy,
  paddingTop: 12,
  paddingBottom: Platform.OS === 'ios' ? 18 : 18,
  minHeight: 92,
  alignItems: 'center',
},

navItem: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},

navIcon: {
  color: '#AFB9C8',
  fontSize: 22,
  fontWeight: '800',
},

navText: {
  color: '#AFB9C8',
  fontSize: 11,
  fontWeight: '700',
  marginTop: 4,
},

navActive: {
  color: COLORS.gold2,
  fontWeight: '900',
},
  sloganBar: {
  backgroundColor: COLORS.navy,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 14,
  paddingBottom: Platform.OS === 'android' ? 26 : 18,
  minHeight: 110,
},

sloganTop: {
  color: '#FFFFFF',
  fontSize: 17,
  fontWeight: '800',
  textAlign: 'center',
},

sloganBottom: {
  color: COLORS.gold2,
  fontSize: 19,
  fontWeight: '900',
  marginTop: 4,
  textAlign: 'center',
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
