import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  Platform, BackHandler, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { supabase } from './supabase';
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
  { id: '1', name: 'Constructions RL', trade: 'Rénovation générale', city: 'Montréal', rating: 4.9, reviews: 42, distance: 12, verified: true, projectTypes: ['Résidentiel', 'Commercial'], workTypes: ['CCQ', 'Hors CCQ'] },
  { id: '2', name: 'Finition Expert', trade: 'Tireur de joint', city: 'Laval', rating: 4.8, reviews: 35, distance: 8, verified: true, projectTypes: ['Résidentiel'], workTypes: ['Hors CCQ'] },
  { id: '3', name: 'Bâtir Plus Inc.', trade: 'Menuiserie', city: 'Longueuil', rating: 4.7, reviews: 28, distance: 15, verified: true, projectTypes: ['Résidentiel', 'Commercial'], workTypes: ['CCQ'] },
  { id: '4', name: 'Électro SécuriPro', trade: 'Électricité', city: 'Montréal', rating: 4.9, reviews: 61, distance: 6, verified: true, projectTypes: ['Commercial'], workTypes: ['CCQ'] },
];

const categories = ['Rénovation', 'Tireur de joint', 'Peinture', 'Plomberie', 'Électricité', 'Menuiserie'];


const residentialCategories = [
  'Aluminium',
  'Après sinistre',
  'Armoires de cuisine',
  'Béton',
  'Briqueteur',
  'Calfeutrage',
  'Céramique',
  'Climatisation',
  'Clôture',
  'Crépi',
  'Crépi acrylique',
  'Décontamination',
  'Démolition',
  'Drain et égout',
  'Drain français',
  'Électricité',
  'Époxy',
  'Escaliers et rampes',
  'Gouttières',
  'Isolation',
  'Pavage et asphalte',
  'Pavé uni',
  'Peinture',
  'Piscine et spa',
'Plomberie',
'Portes de garage',
'Portes et fenêtres',
'Pose de gypse',
'Propane et gaz',
'Puits',
  'Réparation de fissures de béton',
  'Rénovation générale',
  'Revêtement de plancher',
  'Revêtement extérieur',
  'Serrurerie',
  'Soudure et métaux',
  'Systèmes d’alarme et sécurité',
  'Tireur de joint et plâtrier',
  'Toiture',
];

const residentialCcqCategories = [
  'Aluminium',
  'Après sinistre',
  'Armoires de cuisine',
  'Béton',
  'Briqueteur',
  'Calfeutrage',
  'Céramique',
  'Climatisation',
  'Clôture',
  'Crépi',
  'Décontamination',
  'Démolition',
  'Drain et égout',
  'Drain français',
  'Électricité',
  'Époxy',
  'Escaliers et rampes',
  'Gouttières',
  'Grutier',
  'Isolation',
  'Mécanique d’ascenseur',
  'Monteur d’acier',
  'Pavage et asphalte',
  'Pavé uni',
  'Peinture',
  'Plomberie',
  'Portes de garage',
  'Portes et fenêtres',
'Pose de gypse',
'Propane et gaz',
'Puits',
  'Réparation de fissures de béton',
  'Rénovation générale',
  'Revêtement de plancher',
  'Revêtement extérieur',
  'Serrurerie',
  'Soudure et métaux',
  'Systèmes d’alarme et sécurité',
  'Systèmes intérieurs',
  'Tireur de joint et plâtrier',
  'Toiture',
];

const commercialCategories = [
  'Après sinistre',
  'Béton',
  'Céramique',
  'Charpente et menuiserie',
  'Chauffage',
  'Climatisation',
  'Décontamination',
  'Drain et égout',
  'Drain français',
  'Électricité',
  'Excavation',
  'Ferblanterie',
  'Fondation',
  'Frigoriste',
  'Grutier',
  'Isolation',
  'Mécanique d’ascenseur',
  'Monteur d’acier',
  'Peinture',
  'Plomberie',
  'Portes de garage',
  'Portes et fenêtres',
'Pose de gypse',
'Propane et gaz',
'Rénovation générale',
  'Revêtement extérieur',
  'Revêtement de plancher',
  'Serrurerie',
  'Soudure et métaux',
  'Systèmes d’alarme et sécurité',
  'Systèmes intérieurs',
  'Tireur de joint et plâtrier',
  'Toiture',
  'Ventilation',
];

  
  const professionalServices = [
  'Agent d’immeuble',
'Aménagement de bureau',
'Architecture',
'Arpentage',
'Design intérieur',
'Évaluation immobilière',
'Gestion immobilière',
'Ingénierie',
'Inspection de bâtiment',
'Marketing',
'Notaire',
'Photographie immobilière',
'Technologue en architecture',
'Test de radon',
];
const cleaningCategories = [
  'Entretien ménager',
  'Exterminateur / gestion parasitaire',
  'Lavage à pression',
  'Location de conteneurs',
  'Nettoyage après construction',
  'Nettoyage commercial',
  'Nettoyage de conduits',
  'Nettoyage de gouttières',
  'Nettoyage de tapis et meubles',
  'Nettoyage de vitres',
  'Nettoyage résidentiel',
];

const tradeTranslations = {
  'Rénovation générale': 'General renovation',
    'Monteur d’acier': 'Steel erector',
  'Marketing': 'Marketing',
  'Exterminateur / gestion parasitaire': 'Exterminator / pest control',
'Portes de garage': 'Garage doors',
'Serrurerie': 'Locksmith',
'Systèmes d’alarme et sécurité': 'Alarm and security systems',
'Drain français': 'French drain',
'Décontamination': 'Decontamination',
'Systèmes intérieurs': 'Interior systems',
'Piscine et spa': 'Pool and spa',
  'Propane et gaz': 'Propane and gas',
'Test de radon': 'Radon testing',
'Photographie immobilière': 'Real estate photography',
'Nettoyage de conduits': 'Duct cleaning',
'Nettoyage après construction': 'Post-construction cleaning',
'Nettoyage résidentiel': 'Residential cleaning',
'Nettoyage commercial': 'Commercial cleaning',
'Nettoyage de vitres': 'Window cleaning',
'Nettoyage de tapis et meubles': 'Carpet and upholstery cleaning',
'Lavage à pression': 'Pressure washing',
'Entretien ménager': 'Housekeeping',
'Nettoyage de gouttières': 'Gutter cleaning',
'Location de conteneurs': 'Container rental',
  'Charpente et menuiserie': 'Framing and carpentry',
  'Portes et fenêtres': 'Doors and windows',
  'Plomberie': 'Plumbing',
  'Électricité': 'Electrical',
  'Ventilation': 'Ventilation',
  'Chauffage': 'Heating',
  'Climatisation': 'Air conditioning',
  'Frigoriste': 'Refrigeration technician',
  'Toiture': 'Roofing',
  
  'Excavation': 'Excavation',
  'Fondation': 'Foundation',
  'Béton': 'Concrete',
  'Isolation': 'Insulation',
  'Peinture': 'Painting',
  'Tireur de joint et plâtrier': 'Drywall finishing and plastering',
  'Céramique': 'Tile installation',
  'Revêtement de plancher': 'Flooring',
  'Revêtement extérieur': 'Exterior siding',
  'Ferblanterie': 'Sheet metal work',
  'Vitrerie': 'Glazing',
  'Soudure et métaux': 'Welding and metalwork',
  'Protection incendie': 'Fire protection',
  'Drain et égout': 'Drain and sewer',

  'Gouttières': 'Gutters',
  'Imperméabilisation': 'Waterproofing',
  'Après sinistre': 'Disaster restoration',
  'Aluminium': 'Aluminum',
  'Calfeutrage': 'Caulking',
  'Escaliers et rampes': 'Stairs and railings',
  'Armoires de cuisine': 'Kitchen cabinets',
  'Briqueteur': 'Bricklayer',
  'Réparation de fissures de béton': 'Concrete crack repair',
  'Époxy': 'Epoxy',
  'Clôture': 'Fencing',
  'Pavage et asphalte': 'Paving and asphalt',
  'Pavé uni': 'Interlocking pavers',
  'Crépi': 'Parging',
'Crépi acrylique': 'Acrylic stucco',
'Pose de gypse': 'Drywall installation',
'Puits': 'Wells',
'Démolition': 'Demolition',
'Mécanique d’ascenseur': 'Elevator mechanics',
'Grutier': 'Crane operator',

'Rénovation': 'Renovation',
  'Tireur de joint': 'Drywall finisher',
  'Menuiserie': 'Carpentry',
  'Inspection de bâtiment': 'Building inspection',
'Évaluation immobilière': 'Real estate appraisal',
'Architecture': 'Architecture',
'Technologue en architecture': 'Architectural technologist',
'Ingénierie': 'Engineering',
'Arpentage': 'Land surveying',
'Design intérieur': 'Interior design',
'Agent d’immeuble': 'Real estate agent',
'Aménagement de bureau': 'Office planning',
'Gestion immobilière': 'Property management',
'Notaire': 'Notary',
  'Arpenteur-géomètre': 'Land surveyor',
'Ascenseurs et monte-charges': 'Elevators and lifts',
'Conteneur': 'Container rental',
'Designer intérieur': 'Interior designer',
'Ébéniste': 'Cabinetmaker',
'Entrepreneur général': 'General contractor',
'Fissure de béton': 'Concrete crack repair',
'Fissure de fondation': 'Foundation crack repair',
'Génie civil': 'Civil engineering',
'Gouttière': 'Gutters',
'Ingénieur': 'Engineer',
'Maçonnerie': 'Masonry',
'Paysagiste': 'Landscaping',
'Plâtrier et tireur de joints': 'Plasterer and drywall finisher',
'Soudure': 'Welding',
'Technologue': 'Architectural technologist',
  'Architecte': 'Architect',
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
  {language === 'fr'
    ? 'Des projets en confiance, là où licence, distance et compétences ne font qu’un.'
    : 'Projects with confidence, where licensing, distance and skills come together.'}
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


  function Home({
  onNavigate,
  language,
  setLanguage,
  userLocation,
  setUserLocation,
    accountType,
}) {

  const [showAuthOptions, setShowAuthOptions] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

const useCurrentLocation = async () => {
  try {
    setLocationLoading(true);

    const servicesEnabled =
      await Location.hasServicesEnabledAsync();

    if (!servicesEnabled) {
      alert(
        language === 'fr'
          ? 'Activez la localisation de votre téléphone puis réessayez.'
          : 'Turn on location services on your phone and try again.'
      );
      return;
    }

    let permission =
      await Location.getForegroundPermissionsAsync();

    if (permission.status !== 'granted') {
      permission =
        await Location.requestForegroundPermissionsAsync();
    }

    if (permission.status !== 'granted') {
      alert(
        language === 'fr'
          ? 'La permission de localisation est nécessaire pour trouver les entrepreneurs près de vous.'
          : 'Location permission is required to find contractors near you.'
      );
      return;
    }

    let position =
      await Location.getLastKnownPositionAsync({
        maxAge: 120000,
        requiredAccuracy: 500,
      });

    if (!position?.coords) {
      position = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
          mayShowUserSettingsDialog: true,
        }),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error('LOCATION_TIMEOUT')),
            15000
          )
        ),
      ]);
    }

    if (!position?.coords) {
      throw new Error('LOCATION_NOT_AVAILABLE');
    }

    setUserLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    setLocationLoading(false);
    onNavigate('TypeTravaux');
  } catch (error) {
    console.log('Erreur localisation :', error);

    alert(
      language === 'fr'
        ? 'Impossible d’obtenir votre position. Vérifiez que la localisation est activée puis réessayez.'
        : 'Unable to get your location. Make sure location services are enabled and try again.'
    );
  } finally {
    setLocationLoading(false);
  }
};
  

return (
    <ScrollView
  contentContainerStyle={styles.page}
  keyboardShouldPersistTaps="handled"
>
      <AppHeader language={language} setLanguage={setLanguage} onNavigate={onNavigate} />
      <View style={{
  backgroundColor: COLORS.card,
  borderRadius: 16,
  paddingHorizontal: 14,
  paddingVertical: 6,
  marginHorizontal: 10,
  marginBottom: 5,
}}>
  <Text style={{
  color: COLORS.navy,
  fontSize: 17,
  fontWeight: '900',
}}>
  {language === 'fr'
    ? 'Entrepreneurs près de vous'
    : 'Contractors near you'}
</Text>

<Text style={{
  color: COLORS.muted,
  fontSize: 11,
  fontWeight: '700',
  marginTop: 1,
  marginBottom: 4,
}}>
  {language === 'fr'
    ? 'Utilisez votre position pour trouver les entrepreneurs à proximité.'
    : 'Use your location to find nearby contractors.'}
</Text>

  <TouchableOpacity
  onPress={accountType ? useCurrentLocation : () => onNavigate('Login')}
  disabled={locationLoading}
  style={{
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 15,
      fontWeight: '900',
    }}
  >
    {locationLoading
      ? language === 'fr'
        ? 'Localisation en cours...'
        : 'Locating...'
      : language === 'fr'
        ? '📍 Utiliser ma position actuelle'
        : '📍 Use my current location'}
  </Text>
</TouchableOpacity>
    <TouchableOpacity
  onPress={() => accountType ? onNavigate('Pros') : onNavigate('Login')}
  style={{
    marginTop: 8,
    paddingVertical: 10,
    alignItems: 'center',
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 14,
      fontWeight: '800',
    }}
  >
    {language === 'fr'
      ? '🔍 Rechercher une entreprise par nom ›'
      : '🔍 Search for a company by name ›'}
  </Text>
</TouchableOpacity>
      


</View>



      <View
  style={{
    marginHorizontal: 10,
    marginBottom: 4,
    backgroundColor: COLORS.navy,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
  }}
>
  <Text
  style={{
    color: COLORS.gold2,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 13,
  }}
>
    {language === 'fr'
      ? "Dans un monde où les avis d’aujourd’hui sont devenus le bouche-à-oreille d’hier, la confiance est plus importante que jamais. ⭐⭐⭐⭐⭐"
      : "In a world where today's reviews have become yesterday's word of mouth, trust is more important than ever. ⭐⭐⭐⭐⭐"}
  </Text>

  <Text
    style={{
  color: COLORS.gold2,
  fontSize: 11,
  fontWeight: '700',
  lineHeight: 13,
  marginTop: 2,
}}
  >
    {language === 'fr'
      ? "QualiVérifié vous permet de trouver des entrepreneurs détenant les licences nécessaires pour vos projets de construction et de rénovation."
      : "QualiVérifié helps you find contractors holding the required licences for your construction and renovation projects."}
  </Text>

  <Text
  style={{
    color: COLORS.gold2,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 13,
    marginTop: 2,
  }}
>
    {language === 'fr'
      ? "La plateforme rassemble également les services, professionnels et ventes liés au domaine du bâtiment, afin de vous aider à trouver les bonnes personnes pour votre projet."
      : "The platform also brings together services, professionals and sales related to the building industry, helping you find the right people for your project."}
  </Text>
</View>
   <View
  style={{
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 4,
    marginBottom: 6,
  }}
>
  <Text
    numberOfLines={1}
    adjustsFontSizeToFit
    style={{
      color: COLORS.gold,
      fontSize: 17,
      fontWeight: '900',
      fontStyle: 'italic',
      textAlign: 'center',
    }}
  >
    {language === 'fr'
      ? 'Des travaux à exécuter ? QualiVérifié !'
      : 'Work to be done? QualiVérifié!'}
  </Text>
</View>
    <View style={{
  flexDirection: 'row',
  gap: 8,
  marginHorizontal: 12,
  marginTop: 0,
  marginBottom: 0,
}}>
  <TouchableOpacity
  onPress={() => onNavigate('Login')}
  style={{
    flex: 1,
    minHeight: 42,
    borderWidth: 2,
    borderColor: COLORS.navy,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
    <Text style={{
      color: COLORS.navy,
      fontSize: 14,
      fontWeight: '900',
    }}>
      Connectez-vous
    </Text>
    <Text style={{
      color: COLORS.muted,
      fontSize: 11,
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
    minHeight: 42,
    backgroundColor: COLORS.gold2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  
    <Text style={{
      color: COLORS.navy,
      fontSize: 14,
      fontWeight: '900',
    }}>
      Inscrivez-vous
    </Text>
    <Text style={{
      color: COLORS.muted,
      fontSize: 11,
      fontWeight: '700',
      marginTop: 2,
    }}>
      Sign up
    </Text>
  </TouchableOpacity>
</View>
        
    <View
  style={{
    marginTop: 28,
    marginHorizontal: 24,
    alignItems: 'center',
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 18,
      fontWeight: '900',
      textAlign: 'center',
      lineHeight: 25,
    }}
  >
    {language === 'fr'
      ? 'Chaque grand projet commence par une première étape.'
      : 'Every great project begins with a first step.'}
  </Text>

  <Text
    style={{
      color: COLORS.gold,
      fontSize: 15,
      fontWeight: '800',
      textAlign: 'center',
      marginTop: 6,
    }}
  >
    {language === 'fr'
      ? 'La vôtre commence ici.'
      : 'Yours starts here.'}
  </Text>
    <Text
  style={{
    color: COLORS.navy,
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 23,
  }}
>
  {language === 'fr'
    ? 'Vos travaux simplifiés avec QualiVérifié.'
    : 'Your projects made easier with QualiVérifié.'}
</Text>
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

        <TouchableOpacity
  style={styles.categoryCard}
  onPress={() => onNavigate('Metiers', 'Services professionnels')}
>
  <Text style={styles.categoryIcon}>⌂</Text>
  <Text style={styles.categoryText}>
    {language === 'fr'
      ? 'Inspection et services professionnels'
      : 'Inspection and professional services'}
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.categoryCard}
  onPress={() => onNavigate('Metiers', 'Nettoyage et conteneur')}
>
  <Text style={styles.categoryIcon}>🧹</Text>
  <Text style={styles.categoryText}>
    {language === 'fr'
      ? 'Nettoyage et conteneur'
      : 'Cleaning and containers'}
  </Text>
</TouchableOpacity>

</View>
    <Text
  style={{
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 14,
    marginHorizontal: 12,
  }}
>
  {language === 'fr'
    ? 'Sous toutes réserves, les entrepreneurs s’engagent à exécuter seulement les travaux qui leur sont conférés par leur licence.'
    : 'Subject to all applicable requirements, contractors undertake to perform only the work authorized by their licence.'}
</Text>
    </ScrollView>
  );
}

function Metiers({ onNavigate, initialType, language, setLanguage }) {
  const [projectType, setProjectType] = useState(initialType || '');
const [workType, setWorkType] = useState(initialType === 'Résidentiel' ? 'Hors CCQ' : initialType === 'Résidentiel — CCQ' || initialType === 'Commercial' ? 'CCQ' : '');
  return (
  <ScrollView
    contentContainerStyle={styles.page}
    contentInsetAdjustmentBehavior="automatic"
    showsVerticalScrollIndicator={false}
  >
    <AppHeader language={language} setLanguage={setLanguage} />

<TouchableOpacity
  onPress={() => onNavigate('TypeTravaux')}
  style={{ marginBottom: 10 }}
>
  <Text style={{ color: COLORS.navy, fontSize: 15, fontWeight: '800' }}>
    {language === 'fr' ? '‹ Retour' : '‹ Back'}
  </Text>
</TouchableOpacity>

<Text style={styles.screenTitle}>
  {language === 'fr'
    ? `Choisissez un métier – ${
        initialType === 'Services professionnels'
          ? 'Inspection et services professionnels'
          : initialType === 'Nettoyage et conteneur'
          ? 'Nettoyage et conteneur'
          : initialType === 'Résidentiel CCQ'
          ? 'Résidentiel CCQ'
          : initialType === 'Commercial'
          ? 'Commercial'
          : 'Résidentiel'
      }`
    : `Choose a trade – ${
        initialType === 'Services professionnels'
          ? 'Inspection and professional services'
          : initialType === 'Nettoyage et conteneur'
          ? 'Cleaning and containers'
          : initialType === 'Résidentiel CCQ'
          ? 'Residential CCQ'
          : initialType === 'Commercial'
          ? 'Commercial'
          : 'Residential'
      }`}
</Text>
        <View style={styles.grid}>
  {(initialType === 'Services professionnels'
  ? professionalServices
  : initialType === 'Nettoyage et conteneur'
  ? cleaningCategories
  : initialType === 'Commercial'
  ? commercialCategories
  : initialType === 'Résidentiel CCQ'
  ? residentialCcqCategories
  : residentialCategories
).map((c) => (
    <TouchableOpacity
  key={c}
  style={styles.categoryCard}
  onPress={() => onNavigate('Pros', c, null, { projectType, workType })}
>
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    }}
  >
    <Text
  style={[
    styles.categoryIcon,
    {
      marginRight: 10,
      marginBottom: 0,
    },
  ]}
>
  {'⌂'}
</Text>

    <Text
  style={[
    styles.categoryText,
    {
      flex: 1,
      fontSize:
        c === 'Imperméabilisation'
          ? 12
          : c === 'Réparation de fissures de béton'
          ? 12
          : 14,
      lineHeight:
        c === 'Imperméabilisation'
          ? 15
          : c === 'Réparation de fissures de béton'
          ? 15
          : 18,
    },
  ]}
>
  {language === 'fr' ? c : (tradeTranslations[c] || c)}
</Text>

    <Text
      style={{
        color: COLORS.navy,
        fontSize: 22,
        fontWeight: '700',
        marginLeft: 6,
      }}
    >
      ›
    </Text>
  </View>
</TouchableOpacity>
))}
      
</View>




    </ScrollView>
  );
}
function Pros({ initialCategory = '', initialFilters = {}, onNavigate, favorites, setFavorites, language, setLanguage }) {
  const [query, setQuery] = useState(initialCategory);
  const [city, setCity] = useState('');
  const [realPros, setRealPros] = useState([]);

  useEffect(() => {
  const loadRealPros = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        company_name,
        company_city,
        company_description,
        company_photos,
        rbq,
        rbq_categories,
        ccq_status
      `)
      .eq('account_type', 'business');

    if (error) {
      console.log('Erreur chargement entreprises :', error);
      return;
    }

    const { data: reviewsData, error: reviewsError } = await supabase
      .from('reviews')
      .select('company_id, rating');

    if (reviewsError) {
      console.log('Erreur chargement avis :', reviewsError);
    }

    const formattedPros = (data || [])
      .filter((company) => company.company_name?.trim())
      .map((company) => {
        const companyReviews = (reviewsData || []).filter(
          (review) => review.company_id === company.id
        );

        const averageRating =
          companyReviews.length > 0
            ? companyReviews.reduce(
                (total, review) => total + Number(review.rating || 0),
                0
              ) / companyReviews.length
            : 0;

        return {
          id: company.id,
          name: company.company_name,
          trade: company.rbq_categories?.[0] || '',
          trades: company.rbq_categories || [],
          city: company.company_city || '',
          description: company.company_description || '',
          photos: company.company_photos || [],
          rbq: company.rbq || '',
          rating: averageRating,
          reviews: companyReviews.length,
          distance: null,
          verified: true,
          projectTypes: [],
          workTypes: Array.isArray(company.ccq_status)
  ? company.ccq_status
  : company.ccq_status
  ? [company.ccq_status]
  : [],
        };
      });

    setRealPros(formattedPros);
  };

  loadRealPros();
}, []);
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

  const sourcePros = realPros;

  return sourcePros.filter((p) =>
    (!q ||
      p.trade?.toLowerCase().includes(q) ||
      p.name?.toLowerCase().includes(q)) &&
    (!c || p.city?.toLowerCase().includes(c)) &&
    (!initialFilters.projectType ||
      p.projectTypes?.includes(initialFilters.projectType)) &&
    (!initialFilters.workType ||
      p.workTypes?.includes(initialFilters.workType))
  );
}, [query, city, initialFilters, realPros]);

  return (
  <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
    <AppHeader language={language} setLanguage={setLanguage} />

    <TouchableOpacity
      onPress={() => onNavigate('Metiers', initialFilters.projectType || '')}
      style={{ marginBottom: 10 }}
    >
      <Text style={{ color: COLORS.navy, fontSize: 15, fontWeight: '800' }}>
        {language === 'fr' ? '‹ Retour aux métiers' : '‹ Back to trades'}
      </Text>
    </TouchableOpacity>

    <Text style={styles.screenTitle}>
      {language === 'fr' ? 'Trouver un pro' : 'Find a pro'}
    </Text>
      <TextInput
  value={language === 'fr' ? query : (tradeTranslations[query] || query)}
  onChangeText={setQuery}
  placeholder={language === 'fr' ? 'Métier ou entreprise' : 'Trade or company'}
  style={styles.input}
/>
      
    
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
    {type === 'Résidentiel' ? ' 🏠 ' : ' 🏢 '}
    {language === 'fr'
      ? type
      : type === 'Résidentiel'
      ? 'Residential'
      : type}
  </Text>
))}

{p.workTypes?.map((type) => (
  <Text key={type} style={styles.badgeText}>
    {type === 'CCQ' ? ' 👷 ' : ' 🔨 '}
    {language === 'fr'
      ? type
      : type === 'Hors CCQ'
      ? 'Non-CCQ'
      : type}
  </Text>
))}
</View>
            <View style={styles.cardActions}>
  <TouchableOpacity onPress={() => onNavigate('Profil', '', p)} style={styles.secondaryBtn}>
    <Text style={styles.secondaryBtnText}>{language === 'fr' ? 'Voir le profil' : 'View profile'}</Text>
  </TouchableOpacity>
  
          </View>
</View>
</View>
))}
</ScrollView>
  );
}

function Messages({
  selectedPro,
  language,
  setLanguage,
  onNavigate,
  onUnreadChange,
}) {
  const [selectedChat, setSelectedChat] = useState(selectedPro?.name || null);
const [messageText, setMessageText] = useState('');
const [sentMessage, setSentMessage] = useState('');
  const [conversations, setConversations] = useState([]);
const [chatMessages, setChatMessages] = useState([]);
const [activeConversationId, setActiveConversationId] = useState(null);
const [currentUserId, setCurrentUserId] = useState(null);
const [messagesLoading, setMessagesLoading] = useState(true);
  const scrollRef = useRef(null);
    useEffect(() => {
  const loadConversations = async () => {
    try {
      setMessagesLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setConversations([]);
        setCurrentUserId(null);
        return;
      }

      setCurrentUserId(user.id);

      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const rows = data || [];

      const otherUserIds = rows.map((conversation) =>
        conversation.user1_id === user.id
          ? conversation.user2_id
          : conversation.user1_id
      );

      if (otherUserIds.length === 0) {
        setConversations([]);
        return;
      }

      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, company_name, avatar_url')
        .in('id', otherUserIds);

      if (profilesError) throw profilesError;

      const enriched = rows.map((conversation) => {
        const otherUserId =
          conversation.user1_id === user.id
            ? conversation.user2_id
            : conversation.user1_id;

        const profile = profiles?.find(
          (item) => item.id === otherUserId
        );

        return {
          ...conversation,
          otherUserId,
          otherName:
            profile?.company_name ||
            profile?.full_name ||
            'Utilisateur',
          otherPhoto: profile?.avatar_url || null,
        };
      });

      setConversations(enriched);
    } catch (error) {
      console.log('Erreur chargement conversations :', error);
    } finally {
      setMessagesLoading(false);
    }
  };

  loadConversations();
}, []);
  useEffect(() => {
  const openSelectedProConversation = async () => {
    if (!selectedPro?.id) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.id === selectedPro.id) return;

    setCurrentUserId(user.id);

    const [user1Id, user2Id] = [user.id, selectedPro.id].sort();

    const { data: existing, error: findError } = await supabase
      .from('conversations')
      .select('*')
      .eq('user1_id', user1Id)
      .eq('user2_id', user2Id)
      .maybeSingle();

    if (findError) {
      console.log('Erreur recherche conversation :', findError);
      return;
    }

    if (existing) {
      setActiveConversationId(existing.id);
      return;
    }

    const { data: created, error: createError } = await supabase
      .from('conversations')
      .insert({
        user1_id: user1Id,
        user2_id: user2Id,
      })
      .select()
      .single();

    if (createError) {
      console.log('Erreur création conversation :', createError);
      return;
    }

    setActiveConversationId(created.id);
  };

  openSelectedProConversation();
}, [selectedPro]);
    useEffect(() => {
  const loadChatMessages = async () => {
    if (!activeConversationId) {
      setChatMessages([]);
      return;
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', activeConversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.log('Erreur chargement messages :', error);
      return;
    }

    setChatMessages(data || []);
    await supabase.rpc('mark_conversation_read', {
  p_conversation_id: activeConversationId,
});
    if (onUnreadChange) {
  onUnreadChange();
    }
  };

  loadChatMessages();
}, [activeConversationId]);
  if (selectedChat) {
  return (
    
  <ScrollView
    ref={scrollRef}
    contentContainerStyle={[styles.page, { paddingBottom: 180 }]}
    keyboardShouldPersistTaps="handled"
  
      onContentSizeChange={() =>
  scrollRef.current?.scrollToEnd({ animated: false })
        }
        >
        
      <AppHeader language={language} setLanguage={setLanguage} />
      <TouchableOpacity
  onPress={() => {
    if (selectedPro) {
      onNavigate('Profil', '', selectedPro);
    } else {
  setSelectedChat(null);
  setActiveConversationId(null);
  setChatMessages([]);
    }
  }}
>
  <Text style={styles.proTrade}>
    {selectedPro
      ? (language === 'fr' ? '‹ Retour au profil' : '‹ Back to profile')
      : (language === 'fr' ? '‹ Retour aux messages' : '‹ Back to messages')}
  </Text>
</TouchableOpacity>

      <Text style={styles.screenTitle}>{selectedChat}</Text>

      {chatMessages.map((message) => {
  const isMine = message.sender_id === currentUserId;

  return (
    <View
      key={message.id}
      style={{
        alignSelf: isMine ? 'flex-end' : 'flex-start',
        maxWidth: '82%',
        marginBottom: 10,
      }}
    >
      

      <View
  style={{
    backgroundColor: isMine ? COLORS.gold2 : '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: isMine ? 0 : 1,
    borderColor: COLORS.line,
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 15,
      lineHeight: 20,
      fontWeight: '600',
    }}
  >
    {message.content}
  </Text>
</View>
    <Text
  style={{
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
    textAlign: isMine ? 'right' : 'left',
  }}
>
  {new Date(message.created_at).toLocaleDateString(
    language === 'fr' ? 'fr-CA' : 'en-CA',
    { day: 'numeric', month: 'short', year: 'numeric' }
  )}{' · '}
  {new Date(message.created_at).toLocaleTimeString(
    language === 'fr' ? 'fr-CA' : 'en-CA',
    { hour: '2-digit', minute: '2-digit' }
  )}
</Text>
    </View>
  );
})}
      <TextInput
  value={messageText}
  onChangeText={setMessageText}
onFocus={() =>
  setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 250)
  }
  placeholder={language === 'fr' ? 'Écrire un message...' : 'Write a message...'}
  placeholderTextColor={COLORS.muted}
  style={styles.input}
/>

      <TouchableOpacity
  style={styles.primaryBtn}
  onPress={async () => {
  const text = messageText.trim();

  if (!text || !activeConversationId || !currentUserId) return;

  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: activeConversationId,
      sender_id: currentUserId,
      content: text,
    })
    .select()
    .single();

  if (error) {
    console.log('Erreur envoi message :', error);
    return;
  }

  setChatMessages((current) => [...current, data]);
  setMessageText('');

  await supabase
    .from('conversations')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', activeConversationId);
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

    <TouchableOpacity
      onPress={() => onNavigate('Profil', '', selectedPro)}
      style={{ marginBottom: 10 }}
    >
      <Text style={styles.proTrade}>
        {language === 'fr' ? '‹ Retour au profil' : '‹ Back to profile'}
      </Text>
    </TouchableOpacity>

    <Text style={styles.screenTitle}>
      {language === 'fr' ? 'Messages' : 'Messages'}
    </Text>
      {messagesLoading ? (
  <Text style={styles.infoText}>
    {language === 'fr' ? 'Chargement...' : 'Loading...'}
  </Text>
) : conversations.length === 0 ? (
  <Text style={styles.infoText}>
    {language === 'fr'
      ? 'Aucune conversation pour le moment.'
      : 'No conversations yet.'}
  </Text>
) : (
  conversations.map((conversation) => (
    <TouchableOpacity
      key={conversation.id}
      onPress={() => {
        setActiveConversationId(conversation.id);
        setSelectedChat(conversation.otherName);
      }}
      style={styles.messageCard}
    >
      {conversation.otherPhoto ? (
        <Image
          source={{ uri: conversation.otherPhoto }}
          style={styles.avatarSmall}
        />
      ) : (
        <View style={styles.avatarSmall}>
          <Text style={styles.avatarText}>
            {conversation.otherName?.[0] || '?'}
          </Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <Text style={styles.proName}>
          {conversation.otherName}
        </Text>
      </View>
    </TouchableOpacity>
  ))
)}
    </ScrollView>
  );
}

function Profile({ onNavigate, selectedPro,
favorites, setFavorites, language, setLanguage,
accountType, onLogout, onProfilePhotoChange }) {
  const [profileSection, setProfileSection] =
  useState(
    selectedPro
      ? null
      : accountType === 'client'
      ? 'Profil client'
      : null
  );

useEffect(() => {
  if (selectedPro) {
    setProfileSection(null);
  } else if (accountType === 'client') {
    setProfileSection('Profil client');
  } else if (accountType === 'business') {
    setProfileSection(null);
  }
}, [accountType, selectedPro]);

console.log('ACCOUNT TYPE DANS PROFILE =', accountType);
  const [subscriptionFlow, setSubscriptionFlow] = useState(false);
  const [selectedDivisionCount, setSelectedDivisionCount] = useState(null);
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  
const [profilePhoto, setProfilePhoto] = useState(null);
const [clientName, setClientName] = useState('');
const [clientEmail, setClientEmail] = useState('');
const [clientPhone, setClientPhone] = useState('');
const [clientPhoto, setClientPhoto] = useState(null);
const [companyName, setCompanyName] = useState('');
const [companyDescription, setCompanyDescription] = useState('');
const [companyPhotos, setCompanyPhotos] = useState([]);
const [neq, setNeq] = useState('');
const [rbq, setRbq] = useState('');
const [companyCity, setCompanyCity] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
const [companyPostalCode, setCompanyPostalCode] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
const [companyEmail, setCompanyEmail] = useState('');
const [companyWebsite, setCompanyWebsite] = useState('');
const [rbqCategories, setRbqCategories] = useState([]);
const [ccqStatus, setCcqStatus] = useState([]);
  
    const [profileLoaded, setProfileLoaded] = useState(false);

useEffect(() => {
  const loadCompanyProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select(`
          company_name,
          company_description,
          company_photos,
          neq,
          rbq,
          company_city,
          company_address,
          company_postal_code,
          company_phone,
          company_email,
          company_website,
          rbq_categories,
          ccq_status
        `)
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return;

      setCompanyName(data.company_name || '');
      setCompanyDescription(data.company_description || '');
      setCompanyPhotos(
        Array.isArray(data.company_photos) ? data.company_photos : []
      );
      setNeq(data.neq || '');
      setRbq(data.rbq || '');
      setCompanyCity(data.company_city || '');
      setCompanyAddress(data.company_address || '');
      setCompanyPostalCode(data.company_postal_code || '');
      setCompanyPhone(data.company_phone || '');
      setCompanyEmail(data.company_email || '');
      setCompanyWebsite(data.company_website || '');
      setRbqCategories(
        Array.isArray(data.rbq_categories) ? data.rbq_categories : []
      );
      setCcqStatus(
        Array.isArray(data.ccq_status)
          ? data.ccq_status
          : data.ccq_status
          ? [data.ccq_status]
          : []
      );
    } catch (error) {
      console.log('Erreur chargement profil entreprise :', error);
    } finally {
      setProfileLoaded(true);
    }
  };

  loadCompanyProfile();
}, []);
useEffect(() => {
  const loadClientProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setClientEmail(user.email || '');

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, phone, avatar_url')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setClientName(data.full_name || '');
        setClientPhone(data.phone || '');
        setClientPhoto(data.avatar_url || null);
      }
    } catch (error) {
      console.log('Erreur chargement profil client :', error);
    }
  };

  loadClientProfile();
}, []);
  const saveCompanyProfile = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert(
        language === 'fr'
          ? 'Vous devez être connecté.'
          : 'You must be logged in.'
      );
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        company_name: companyName,
        company_description: companyDescription,
        company_photos: companyPhotos,
        neq: neq,
        rbq: rbq,
        company_city: companyCity,
        company_address: companyAddress,
        company_postal_code: companyPostalCode,
        company_phone: companyPhone,
        company_email: companyEmail,
        company_website: companyWebsite,
        rbq_categories: rbqCategories,
        ccq_status: ccqStatus.length > 0 ? ccqStatus[0] : null,
      })
      .eq('id', user.id);

    if (error) throw error;

    alert(
      language === 'fr'
        ? 'Modifications enregistrées avec succès.'
        : 'Changes saved successfully.'
    );
  } catch (error) {
    console.log('Erreur sauvegarde profil entreprise :', error);
    alert(error.message);
  }
};
  const [customerReviews, setCustomerReviews] = useState([]);
const [publicReviews, setPublicReviews] = useState([]);
const [reviewRating, setReviewRating] = useState(5);
const [reviewComment, setReviewComment] = useState('');
const [reviewSaving, setReviewSaving] = useState(false);
  useEffect(() => {
  const loadPublicReviews = async () => {
    if (!selectedPro?.id) {
      setPublicReviews([]);
      return;
    }

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('company_id', selectedPro.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Erreur chargement avis publics :', error);
      return;
    }

    setPublicReviews(data || []);
  };

  loadPublicReviews();
}, [selectedPro]);
const submitReview = async () => {
  if (!selectedPro?.id || reviewSaving) return;

  if (!reviewComment.trim()) {
    alert(
      language === 'fr'
        ? 'Écrivez un commentaire.'
        : 'Write a comment.'
    );
    return;
  }

  try {
    setReviewSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert(
        language === 'fr'
          ? 'Vous devez être connecté.'
          : 'You must be logged in.'
      );
      return;
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        company_id: selectedPro.id,
        client_id: user.id,
        rating: reviewRating,
        comment: reviewComment.trim(),
      })
      .select()
      .single();

    if (error) throw error;

    setPublicReviews((current) => [data, ...current]);
    setReviewComment('');
    setReviewRating(5);

    alert(
      language === 'fr'
        ? 'Avis publié avec succès.'
        : 'Review published successfully.'
    );
  } catch (error) {
  console.log('Erreur publication avis :', error);

  if (error.code === '23505') {
    alert(
      language === 'fr'
        ? 'Vous avez déjà publié un avis pour cette entreprise.'
        : 'You have already reviewed this company.'
    );
  } else {
    alert(error.message);
  }
} finally {
    setReviewSaving(false);
  }
};
  useEffect(() => {
  const loadCustomerReviews = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('company_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCustomerReviews(data || []);
    } catch (error) {
      console.log('Erreur chargement avis clients :', error);
    }
  };

  loadCustomerReviews();
}, []);

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
    base64: true,
  });

  if (result.canceled || !result.assets?.length) return;

  try {
    const asset = result.assets[0];

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !asset.base64) return;

    const binary = atob(asset.base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const filePath = `${user.id}/avatar-${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, bytes.buffer, {
        contentType: asset.mimeType || 'image/jpeg',
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (profileError) throw profileError;

    setProfilePhoto(publicUrl);
    setClientPhoto(publicUrl);

    if (onProfilePhotoChange) {
      onProfilePhotoChange(publicUrl);
    }
  } catch (error) {
    console.log('Erreur photo profil :', error);
    alert(error.message);
  }
};
  const pickClientPhoto = async () => {
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
    base64: true,
  });

  if (result.canceled || !result.assets?.length) return;

  try {
    const asset = result.assets[0];

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !asset.base64) return;

    const binary = atob(asset.base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const filePath =
      `${user.id}/avatar-${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, bytes.buffer, {
        contentType: asset.mimeType || 'image/jpeg',
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (profileError) throw profileError;

    setClientPhoto(publicUrl);
    setProfilePhoto(publicUrl);
if (onProfilePhotoChange) {
  onProfilePhotoChange(publicUrl);
}
  } catch (error) {
    console.log('Erreur photo client :', error);
    alert(error.message);
  }
};
  const saveClientProfile = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: clientName,
        phone: clientPhone,
        avatar_url: clientPhoto,
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;

    setClientEmail(user.email || '');

    alert(
      language === 'fr'
        ? 'Profil client enregistré.'
        : 'Client profile saved.'
    );
  } catch (error) {
    console.log('Erreur sauvegarde profil client :', error);
    alert(error.message);
  }
    };
const pickCompanyPhoto = async () => {
  if (companyPhotos.length >= 10) return;

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
  allowsMultipleSelection: true,
  selectionLimit: 10 - companyPhotos.length,
  quality: 0.8,
  base64: true,
});

if (result.canceled || !result.assets?.length) return;

try {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const uploadedPhotos = [];

  for (const asset of result.assets) {
    if (!asset.base64) {
      throw new Error('Impossible de lire la photo.');
    }

    const binary = atob(asset.base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const extension =
      asset.fileName?.split('.').pop()?.toLowerCase() || 'jpg';

    const filePath =
      `${user.id}/${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${extension}`;

    const { error } = await supabase.storage
      .from('company-photos')
      .upload(filePath, bytes.buffer, {
        contentType: asset.mimeType || 'image/jpeg',
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from('company-photos')
      .getPublicUrl(filePath);

    uploadedPhotos.push(data.publicUrl);
  }

  setCompanyPhotos((current) =>
    [...current, ...uploadedPhotos].slice(0, 10)
  );
} catch (error) {
  alert(error.message);
}

      
};
  if (profileSection) {
    
    
  return (
    <ScrollView
  contentContainerStyle={styles.page}
  scrollEnabled={profileSection !== 'Profil client'}
  showsVerticalScrollIndicator={false}
>
      <AppHeader language={language} setLanguage={setLanguage} />

{['Mes favoris'].includes(profileSection) && (
  <TouchableOpacity
    onPress={() => setProfileSection('Profil client')}
    style={{
      alignSelf: 'flex-start',
      marginBottom: 12,
      paddingVertical: 8,
    }}
  >
    <Text
      style={{
        color: COLORS.navy,
        fontSize: 16,
        fontWeight: '800',
      }}
    >
      {language === 'fr' ? '← Retour' : '← Back'}
    </Text>
  </TouchableOpacity>
)}
  {profileSection === 'Profil client' ? (
  <>
   
    <Text style={styles.sectionTitle}>
      {language === 'fr' ? '👤 Profil client' : '👤 Client profile'}
    </Text>

    <View
      style={{
        alignItems: 'center',
        marginTop: 6,
marginBottom: 12,
      }}
    >
      {clientPhoto ? (
        <Image
          source={{ uri: clientPhoto }}
          style={{
            width: 90,
height: 90,
borderRadius: 45,
          }}
        />
      ) : (
        <View
          style={{
            width: 90,
height: 90,
borderRadius: 45,
            backgroundColor: COLORS.navy,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 42,
              fontWeight: '800',
            }}
          >
            {clientName.trim()
              ? clientName.trim()[0].toUpperCase()
              : '👤'}
          </Text>
        </View>
      )}
    </View>
<TouchableOpacity
  style={[styles.primaryBtn, { marginBottom: 20 }]}
  onPress={pickClientPhoto}
>
  <Text style={styles.primaryBtnText}>
    {language === 'fr'
      ? clientPhoto
        ? '📷 Modifier ma photo'
        : '📷 Ajouter une photo'
      : clientPhoto
        ? '📷 Change my photo'
        : '📷 Add a photo'}
  </Text>
</TouchableOpacity>
    <TextInput
      value={clientName}
      onChangeText={setClientName}
      placeholder={language === 'fr' ? 'Nom complet' : 'Full name'}
      placeholderTextColor={COLORS.muted}
      style={styles.input}
    />

    <TextInput
      value={clientEmail}
      onChangeText={setClientEmail}
      placeholder={language === 'fr' ? 'Courriel' : 'Email'}
      placeholderTextColor={COLORS.muted}
      keyboardType="email-address"
      autoCapitalize="none"
      style={styles.input}
    />

    <TextInput
      value={clientPhone}
      onChangeText={setClientPhone}
      placeholder={language === 'fr' ? 'Téléphone' : 'Phone'}
      placeholderTextColor={COLORS.muted}
      keyboardType="phone-pad"
      style={styles.input}
    />
      <TouchableOpacity
  style={[styles.primaryBtn, { marginTop: -70 }]}
  onPress={saveClientProfile}
>
  <Text style={styles.primaryBtnText}>
    {language === 'fr'
      ? '💾 Enregistrer mon profil'
      : '💾 Save my profile'}
  </Text>
</TouchableOpacity>
    <TouchableOpacity
  style={[styles.primaryBtn, { marginTop: 8 }]}
  onPress={() => setProfileSection('Mes favoris')}
>
  <Text style={styles.primaryBtnText}>
    {language === 'fr' ? '♡ Vos favoris' : '♡ Your favorites'}
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.primaryBtn, { marginTop: 8 }]}
  onPress={() => setProfileSection('Abonnement')}
>
  <Text style={styles.primaryBtnText}>
    {language === 'fr' ? '🏢 Espace entreprise' : '🏢 Business area'}
  </Text>
</TouchableOpacity>
    <TouchableOpacity
  style={[styles.primaryBtn, { marginTop: 8, marginBottom: 70 }]}
  onPress={onLogout}
>
  <Text style={styles.primaryBtnText}>
    {language === 'fr' ? '🚪 Déconnexion' : '🚪 Log out'}
  </Text>
</TouchableOpacity>
  </>
) : profileSection === 'Informations entreprise' ? (
    <>
  <TouchableOpacity
  onPress={() => setProfileSection(accountType === 'client' ? 'Profil client' : null)}
  style={{ alignSelf: 'flex-start', marginBottom: 8 }}
>
  <Text style={{ color: COLORS.navy, fontSize: 16, fontWeight: '700' }}>
    {language === 'fr' ? '← Retour au profil' : '← Back to profile'}
  </Text>
</TouchableOpacity>
      <Text style={styles.sectionTitle}>{language === 'fr' ? 'Informations de l’entreprise' : 'Company information'}</Text>
<Text style={[styles.infoText, { fontWeight: '700', marginBottom: 6 }]}>
  {language === 'fr' ? "Nom de l’entreprise" : 'Company name'}
</Text>
      <TextInput
  value={companyName}
  onChangeText={setCompanyName}
  placeholder={language === 'fr' ? 'Nom de l’entreprise' : 'Company name'}
  style={styles.input}
/>
   <View
  style={{
    marginTop: 18,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
  }}
>
  <Text style={[styles.sectionTitle, { marginBottom: 14 }]}>
    {language === 'fr'
      ? '📞 Coordonnées de l’entreprise'
      : '📞 Business contact information'}
  </Text>

  <TextInput
    value={companyAddress}
    onChangeText={setCompanyAddress}
    placeholder={language === 'fr' ? 'Adresse de l’entreprise' : 'Business address'}
    placeholderTextColor={COLORS.muted}
    style={[styles.input, { width: '100%', marginBottom: 10 }]}
  />

  <TextInput
    value={companyCity}
    onChangeText={setCompanyCity}
    placeholder={language === 'fr' ? 'Ville' : 'City'}
    placeholderTextColor={COLORS.muted}
    style={[styles.input, { width: '100%', marginBottom: 10 }]}
  />

  <TextInput
    value={companyPostalCode}
    onChangeText={setCompanyPostalCode}
    placeholder={language === 'fr' ? 'Code postal' : 'Postal code'}
    placeholderTextColor={COLORS.muted}
    autoCapitalize="characters"
    maxLength={7}
    style={[styles.input, { width: '100%', marginBottom: 10 }]}
  />

  <TextInput
    value={companyPhone}
    onChangeText={setCompanyPhone}
    placeholder={language === 'fr' ? 'Téléphone' : 'Phone'}
    placeholderTextColor={COLORS.muted}
    keyboardType="phone-pad"
    style={[styles.input, { width: '100%', marginBottom: 10 }]}
  />

  <TextInput
    value={companyEmail}
    onChangeText={setCompanyEmail}
    placeholder={language === 'fr' ? 'Courriel' : 'Email'}
    placeholderTextColor={COLORS.muted}
    keyboardType="email-address"
    autoCapitalize="none"
    style={[styles.input, { width: '100%', marginBottom: 10 }]}
  />

  <TextInput
    value={companyWebsite}
    onChangeText={setCompanyWebsite}
    placeholder={
      language === 'fr'
        ? 'Site Web (facultatif)'
        : 'Website (optional)'
    }
    placeholderTextColor={COLORS.muted}
    autoCapitalize="none"
    style={[styles.input, { width: '100%' }]}
  />
</View>
   <View
  style={{
    marginTop: 18,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
  }}
>
  <Text style={[styles.sectionTitle, { marginBottom: 6 }]}>
    {language === 'fr'
  ? '📝 Présentation et description'
  : '📝 Presentation and description'}
  </Text>

  <Text
    style={[
      styles.infoText,
      { marginBottom: 12, lineHeight: 20 },
    ]}
  >
    {language === 'fr'
      ? 'Présentez vos spécialités, votre expérience et ce qui distingue votre entreprise.'
      : 'Present your specialties, experience and what makes your business stand out.'}
  </Text>

  <TextInput
    value={companyDescription}
    onChangeText={setCompanyDescription}
    placeholder={
      language === 'fr'
        ? 'Présentez votre entreprise, vos spécialités et votre expérience'
        : 'Introduce your business, specialties and experience'
    }
    placeholderTextColor={COLORS.muted}
    maxLength={1000}
    multiline
    textAlignVertical="top"
    style={[
  styles.input,
  {
    width: '100%',
    minHeight: 220,
    paddingTop: 14,
    paddingHorizontal: 16,
    marginBottom: 6,
    alignSelf: 'stretch',
  },
]}
  />

  <Text
    style={[
      styles.infoText,
      { textAlign: 'right' },
    ]}
  >
    {companyDescription.length}/1000
  </Text>
</View>

<View style={{ marginTop: 8, marginBottom: 14 }}>
  <Text
    style={[
      styles.sectionTitle,
      {
        fontSize: 28,
        fontWeight: '900',
        color: COLORS.navy,
        marginBottom: 14,
      },
    ]}
  >
    {language === 'fr' ? '👤 Profil public' : '👤 Public profile'}
  </Text>

  <Text style={styles.sectionTitle}>
    {language === 'fr'
      ? '📸 Photos des réalisations'
      : '📸 Project photos'}
  </Text>
</View>

<Text style={styles.infoText}>
  {language === 'fr'
    ? `Ajoutez jusqu’à 10 photos (${companyPhotos.length}/10)`
    : `Add up to 10 photos (${companyPhotos.length}/10)`}
</Text>

<TouchableOpacity
  onPress={pickCompanyPhoto}
  disabled={companyPhotos.length >= 10}
  style={[
    styles.primaryBtn,
    {
      marginTop: 10,
      marginBottom: 14,
      opacity: companyPhotos.length >= 10 ? 0.45 : 1,
    },
  ]}
>
  <Text style={styles.primaryBtnText}>
    {companyPhotos.length >= 10
      ? language === 'fr'
        ? '✅ Maximum atteint (10/10)'
        : '✅ Maximum reached (10/10)'
      : language === 'fr'
      ? `📸 Ajouter une photo (${companyPhotos.length}/10)`
      : `📸 Add a photo (${companyPhotos.length}/10)`}
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
      <Text style={[styles.infoText, { fontWeight: '800', marginBottom: 6 }]}>
  {language === 'fr' ? 'NEQ' : 'NEQ'}
</Text>

<TextInput
  value={neq}
  onChangeText={setNeq}
  placeholder={language === 'fr' ? 'Numéro d’entreprise du Québec' : 'Quebec enterprise number'}
  placeholderTextColor={COLORS.muted}
  keyboardType="number-pad"
  maxLength={10}
  style={[styles.input, { width: '100%' }]}
/>

{neq.trim() !== '' && !isNeqValid && (
  <Text style={[styles.infoText, { marginBottom: 12 }]}>
    {language === 'fr'
      ? 'Le NEQ doit contenir exactement 10 chiffres.'
      : 'The NEQ must contain exactly 10 digits.'}
  </Text>
)}

<Text style={[styles.infoText, { fontWeight: '800', marginTop: 8, marginBottom: 6 }]}>
  {language === 'fr' ? 'Licence RBQ' : 'RBQ licence'}
</Text>

<TextInput
  value={rbq}
  onChangeText={setRbq}
  placeholder={language === 'fr' ? 'Ex. 1234-5678-01' : 'Ex. 1234-5678-01'}
  placeholderTextColor={COLORS.muted}
  style={[styles.input, { width: '100%' }]}
/>

{rbq.trim() !== '' && !isRbqValid && (
  <Text style={[styles.infoText, { marginBottom: 12 }]}>
    {language === 'fr'
      ? 'Format RBQ attendu : 1234-5678-01.'
      : 'Expected RBQ format: 1234-5678-01.'}
  </Text>
)}
<TouchableOpacity
  style={[
    styles.primaryBtn,
    {
      marginTop: 18,
      marginBottom: 18,
      width: '100%',
    },
  ]}
  onPress={() => setProfileSection('Métiers et services')}
>
  <Text style={styles.primaryBtnText}>
    {language === 'fr'
      ? '🛠️ Métiers et services professionnels  ›'
      : '🛠️ Trades and professional services  ›'}
  </Text>
</TouchableOpacity>
    {rbqCategories.length > 0 && (
  <View
    style={{
      marginTop: 14,
      marginBottom: 18,
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 16,
    }}
  >
    <Text style={{ fontWeight: '700', marginBottom: 8 }}>
      {language === 'fr'
        ? 'Métiers et services sélectionnés :'
        : 'Selected trades and services:'}
    </Text>

    <Text style={styles.infoText}>
      {rbqCategories.join(', ')}
    </Text>
  </View>
)}
  
  <TouchableOpacity style={[styles.primaryBtn, (!companyName.trim() || !isNeqValid || !isRbqValid || !companyCity.trim() || rbqCategories.length === 0) && { opacity: 0.4 }]} disabled={!companyName.trim() || !isNeqValid || !isRbqValid || !companyCity.trim() || rbqCategories.length === 0} onPress={() => setProfileSection('Vérification en cours')}>
        <Text style={styles.primaryBtnText}>{language === 'fr' ? 'Commencer la vérification' : 'Start verification'}</Text>
      </TouchableOpacity>
  <TouchableOpacity
  style={[styles.primaryBtn, { marginTop: 18 }]}
  onPress={async () => {
  await saveCompanyProfile();

  if (subscriptionFlow) {
    setProfileSection('Choix divisions');
  }
}}
>
  <Text style={styles.primaryBtnText}>
    {language === 'fr'
      ? '💾 Enregistrer les modifications'
      : '💾 Save changes'}
  </Text>
</TouchableOpacity>
    </>
) : profileSection === 'Choix divisions' ? (
  <>
    <TouchableOpacity
  onPress={() => setProfileSection('Abonnement')}
  style={{
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 16,
      fontWeight: '800',
    }}
  >
    {language === 'fr' ? '← Retour' : '← Back'}
  </Text>
</TouchableOpacity>

    <Text style={styles.sectionTitle}>
      {language === 'fr'
        ? '🏗️ Choisissez votre forfait'
        : '🏗️ Choose your plan'}
    </Text>

    <Text style={[styles.infoText, { marginBottom: 16 }]}>
      {language === 'fr'
        ? 'Sélectionnez le nombre de divisions pour votre entreprise.'
        : 'Select the number of divisions for your business.'}
    </Text>

    <TouchableOpacity
      style={[
        styles.categoryCard,
        { marginBottom: 12 },
        selectedDivisionCount === 1 && {
          borderColor: COLORS.gold,
          borderWidth: 2,
        },
      ]}
      onPress={() => setSelectedDivisionCount(1)}
    >
      <Text style={styles.categoryText}>
        {selectedDivisionCount === 1 ? '✓ ' : ''}
        {language === 'fr'
          ? '1 division — 27,77 $ / mois'
          : '1 division — $27.77 / month'}
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.categoryCard,
        { marginBottom: 12 },
        selectedDivisionCount === 2 && {
          borderColor: COLORS.gold,
          borderWidth: 2,
        },
      ]}
      onPress={() => setSelectedDivisionCount(2)}
    >
      <Text style={styles.categoryText}>
        {selectedDivisionCount === 2 ? '✓ ' : ''}
        {language === 'fr'
          ? '2 divisions — 37,77 $ / mois'
          : '2 divisions — $37.77 / month'}
      </Text>
    </TouchableOpacity>
      <TouchableOpacity
  style={[
    styles.categoryCard,
    { marginBottom: 12 },
    selectedDivisionCount === 3 && {
      borderColor: COLORS.gold,
      borderWidth: 2,
    },
  ]}
  onPress={() => setSelectedDivisionCount(3)}
>
  <Text style={styles.categoryText}>
    {selectedDivisionCount === 3 ? '✓ ' : ' '}
    {language === 'fr'
      ? '3 divisions – 47,77 $ / mois'
      : '3 divisions – $47.77 / month'}
  </Text>
</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.primaryBtn,
    {
      marginTop: 20,
      opacity: selectedDivisionCount ? 1 : 0.4,
    },
  ]}
  disabled={!selectedDivisionCount}
  onPress={() => setProfileSection('Sélection divisions')}
>
  <Text style={styles.primaryBtnText}>
    {language === 'fr' ? 'Continuer ›' : 'Continue ›'}
  </Text>
</TouchableOpacity>
    
  </>

  ) : profileSection === 'Sélection divisions' ? (
  <>
    <TouchableOpacity
  onPress={() => setProfileSection('Choix forfait')}
  style={{
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 16,
      fontWeight: '800',
    }}
  >
    {language === 'fr' ? '← Retour' : '← Back'}
  </Text>
</TouchableOpacity>
    <Text style={styles.sectionTitle}>
      {language === 'fr'
        ? '🏗️ Choisissez vos divisions'
        : '🏗️ Choose your divisions'}
    </Text>

    <Text style={[styles.infoText, { marginBottom: 16 }]}>
      {language === 'fr'
        ? `Sélectionnez ${selectedDivisionCount} division${selectedDivisionCount > 1 ? 's' : ''}.`
        : `Select ${selectedDivisionCount} division${selectedDivisionCount > 1 ? 's' : ''}.`}
    </Text>

    {[
      'Résidentiel',
      'Résidentiel – CCQ',
      'Commercial',
      'Inspection et services professionnels',
      'Nettoyage et conteneur',
    ].map((division) => {
      const isSelected = selectedDivisions.includes(division);

      return (
        <TouchableOpacity
          key={division}
          style={[
            styles.categoryCard,
            { marginBottom: 12, width: '100%' },
            isSelected && {
              borderColor: COLORS.gold,
              borderWidth: 2,
            },
          ]}
          onPress={() => {
            if (isSelected) {
              setSelectedDivisions(
                selectedDivisions.filter((item) => item !== division)
              );
            } else if (
              selectedDivisions.length < selectedDivisionCount
            ) {
              setSelectedDivisions([...selectedDivisions, division]);
            }
          }}
        >
          <Text style={styles.categoryText}>
  {isSelected ? '✓ ' : ''}
  {language === 'fr'
    ? division
    : ({
        'Résidentiel': 'Residential',
        'Résidentiel - CCQ': 'Residential - CCQ',
        'Commercial': 'Commercial',
        'Inspection et services professionnels': 'Inspection and professional services',
        'Nettoyage et conteneur': 'Cleaning and container services',
      }[division] || division)}
</Text>
        </TouchableOpacity>
      );
    })}

    <TouchableOpacity
      style={[
        styles.primaryBtn,
        {
          marginTop: 18,
          opacity:
            selectedDivisions.length === selectedDivisionCount ? 1 : 0.4,
        },
      ]}
      disabled={
        selectedDivisions.length !== selectedDivisionCount
      }
      onPress={() => setProfileSection('Résumé forfait')}
    >
      <Text style={styles.primaryBtnText}>
        {language === 'fr' ? 'Continuer ›' : 'Continue ›'}
      </Text>
    </TouchableOpacity>
  </>
) : profileSection === 'Résumé forfait' ? (
  <>
    <TouchableOpacity
  onPress={() => setProfileSection('Choix divisions')}
  style={{
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 16,
      fontWeight: '800',
    }}
  >
    {language === 'fr' ? '← Retour' : '← Back'}
  </Text>
</TouchableOpacity>

    <Text style={styles.sectionTitle}>
      {language === 'fr'
        ? '💳 Résumé de votre forfait'
        : '💳 Your plan summary'}
    </Text>

    <View
      style={{
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        marginTop: 10,
      }}
    >
      <Text style={[styles.profileInfo, { textAlign: 'center' }]}>
  {selectedDivisionCount === 1
    ? '1 division'
    : `${selectedDivisionCount} divisions`}
</Text>
      <Text style={[styles.infoText, { textAlign: 'center', marginTop: 10 }]}>
  {language === 'fr' ? 'Divisions : ' : 'Divisions: '}
  {selectedDivisions.join(', ')}
</Text>

<Text
  style={[
    styles.sectionTitle,
    { textAlign: 'center', marginTop: 18 },
  ]}
>
  {selectedDivisionCount === 1
    ? (language === 'fr' ? '27,77 $ / mois' : '$27.77 / month')
    : selectedDivisionCount === 2
    ? (language === 'fr' ? '37,77 $ / mois' : '$37.77 / month')
    : (language === 'fr' ? '47,77 $ / mois' : '$47.77 / month')}
</Text>
      

      <Text style={[styles.infoText, { textAlign: 'center' }]}>
        {language === 'fr'
          ? 'Abonnement entreprise QualiVérifié'
          : 'QualiVérifié business subscription'}
      </Text>
    </View>

    <TouchableOpacity
      style={[styles.primaryBtn, { marginTop: 20 }]}
      onPress={() => setProfileSection('Choix divisions')}
    >
      <Text style={styles.primaryBtnText}>
        {language === 'fr'
          ? '‹ Modifier mon choix'
          : '‹ Change my selection'}
      </Text>
    </TouchableOpacity>
        <TouchableOpacity
  style={[styles.primaryBtn, { marginTop: 12 }]}
  onPress={() => setProfileSection('Paiement')}
>
  <Text style={styles.primaryBtnText}>
    {language === 'fr'
      ? '💳 Passer au paiement'
      : '💳 Proceed to payment'}
  </Text>
</TouchableOpacity>
  </>
) : profileSection === 'Paiement' ? (
  <>
    
  <TouchableOpacity
  onPress={() => setProfileSection('Résumé forfait')}
  style={{
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 16,
      fontWeight: '800',
    }}
  >
    {language === 'fr' ? '← Retour' : '← Back'}
  </Text>
</TouchableOpacity>
<Text style={styles.sectionTitle}>
  {language === 'fr'
    ? '💳 Paiement'
    : '💳 Payment'}
</Text>
      

    <View
      style={{
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        marginTop: 10,
      }}
    >
      <Text style={[styles.profileInfo, { textAlign: 'center' }]}>
        {language === 'fr'
          ? 'Abonnement entreprise QualiVérifié'
          : 'QualiVérifié business subscription'}
      </Text>

      <Text
        style={[
          styles.sectionTitle,
          { textAlign: 'center', marginTop: 18 },
        ]}
      >
        {selectedDivisionCount === 1
  ? (language === 'fr' ? '27,77 $ / mois' : '$27.77 / month')
  : selectedDivisionCount === 2
  ? (language === 'fr' ? '37,77 $ / mois' : '$37.77 / month')
  : (language === 'fr' ? '47,77 $ / mois' : '$47.77 / month')}
      </Text>

      <Text
        style={[
          styles.infoText,
          { textAlign: 'center', marginTop: 12 },
        ]}
      >
        {language === 'fr'
          ? 'Votre paiement sera effectué de façon sécurisée.'
          : 'Your payment will be processed securely.'}
      </Text>
    </View>

    <TouchableOpacity
      style={[styles.primaryBtn, { marginTop: 20, opacity: 0.5 }]}
      disabled={true}
    >
      <Text style={styles.primaryBtnText}>
        {language === 'fr'
          ? '🔒 Paiement sécurisé'
          : '🔒 Secure payment'}
      </Text>
    </TouchableOpacity>

    
</>
) : profileSection === 'Métiers et services' ? (
<>
  <TouchableOpacity
  onPress={() => setProfileSection('Informations entreprise')}
  style={{
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 16,
      fontWeight: '800',
    }}
  >
    {language === 'fr' ? '← Retour' : '← Back'}
  </Text>
</TouchableOpacity>
    <Text style={styles.sectionTitle}>
      {language === 'fr'
        ? '🛠️ Métiers et services professionnels'
        : '🛠️ Trades and professional services'}
    </Text>

    <Text style={[styles.infoText, { marginBottom: 16 }]}>
      {language === 'fr'
        ? 'Sélectionnez tous les métiers et services offerts par votre entreprise.'
        : 'Select all trades and services offered by your business.'}
    </Text>

    {[
  'Agent d’immeuble',
  'Aluminium',
  'Aménagement de bureau',
  'Après sinistre',
  'Architecte',
  'Armoires de cuisine',
  'Arpenteur-géomètre',
  'Ascenseurs et monte-charges',
  'Béton',
  'Briqueteur',
  'Calfeutrage',
  'Céramique',
  'Charpente et menuiserie',
  'Chauffage',
  'Climatisation',
  'Clôture',
  'Conteneur',
  'Crépi',
  'Crépi acrylique',
  'Décontamination',
  'Démolition',
  'Designer intérieur',
  'Drain français',
  'Ébéniste',
  'Électricité',
  'Entrepreneur général',
  'Entretien ménager',
  'Époxy',
  'Escaliers et rampes',
'Excavation',
'Exterminateur / gestion parasitaire',
'Ferblanterie',
  'Fissure de béton',
  'Fissure de fondation',
  'Fondation',
  'Frigoriste',
  'Génie civil',
  'Gouttière',
  'Grutier',
  'Imperméabilisation',
  'Ingénieur',
  'Inspection de bâtiment',
  'Isolation',
  'Lavage à pression',
  'Maçonnerie',
  'Marketing',
  'Monteur d’acier',
  'Nettoyage après construction',
  'Nettoyage commercial',
  'Nettoyage de conduits',
  'Nettoyage de gouttières',
  'Nettoyage de tapis et meubles',
  'Nettoyage de vitres',
  'Nettoyage résidentiel',
  'Pavage et asphalte',
  'Paysagiste',
  'Peinture',
  'Photographie immobilière',
  'Piscine et spa',
  'Plâtrier et tireur de joints',
  'Plomberie',
'Portes de garage',
'Portes et fenêtres',
'Pose de gypse',
'Propane et gaz',
'Protection incendie',
  'Puits',
  'Revêtement de plancher',
  'Revêtement extérieur',
  'Serrurerie',
  'Soudure',
  'Systèmes d’alarme et sécurité',
  'Systèmes intérieurs',
  'Technologue',
  'Test de radon',
  'Toiture',
  'Ventilation',

    ].map((category) => (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryCard,
          {
            width: '100%',
            marginBottom: 10,
          },
          rbqCategories.includes(category) && {
            borderColor: COLORS.gold,
            borderWidth: 2,
          },
        ]}
        onPress={() => toggleRbqCategory(category)}
      >
        <Text style={styles.categoryText}>
          {rbqCategories.includes(category) ? '✓ ' : ''}
          {language === 'fr'
  ? category
  : (tradeTranslations[category] || category)}
        </Text>
      </TouchableOpacity>
    ))}

    <TouchableOpacity
      style={[styles.primaryBtn, { marginTop: 18 }]}
      onPress={() => setProfileSection('Informations entreprise')}
    >
      <Text style={styles.primaryBtnText}>
        {language === 'fr'
          ? '✓ Confirmer mes sélections'
          : '✓ Confirm selections'}
      </Text>
    </TouchableOpacity>
  </>
) : profileSection === 'Vérification en cours' ? (
<>
  <TouchableOpacity
  onPress={() => setProfileSection('Informations entreprise')}
  style={{
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 16,
      fontWeight: '800',
    }}
  >
    {language === 'fr' ? '← Retour' : '← Back'}
  </Text>
</TouchableOpacity>
    <Text style={styles.sectionTitle}>{language === 'fr' ? 'Vérification en cours' : 'Verification in progress'}</Text>
    <Text style={styles.profileInfo}>{language === 'fr' ? 'Entreprise' : 'Company'} : {companyName}</Text>
    <Text style={styles.profileInfo}>NEQ : {neq}</Text>
    <Text style={styles.profileInfo}>{language === 'fr' ? 'Licence RBQ' : 'RBQ licence'} : {rbq}</Text>
    <Text style={styles.profileInfo}>
  {language === 'fr' ? 'Métiers et services' : 'Trades and services'} : {rbqCategories.join(', ')}
</Text>

<Text style={styles.profileInfo}>
  {language === 'fr' ? 'Statut CCQ' : 'CCQ status'} : {ccqStatus.length > 0 ? ccqStatus.join(', ') : (language === 'fr' ? 'Non renseigné' : 'Not specified')}
</Text>
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
  <TouchableOpacity
  onPress={() => setProfileSection(null)}
  style={{
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 16,
      fontWeight: '800',
    }}
  >
    {language === 'fr' ? '← Retour' : '← Back'}
  </Text>
</TouchableOpacity>
    <Text style={styles.sectionTitle}>
      {language === 'fr' ? '⭐ Avis clients' : '⭐ Customer reviews'}
    </Text>

    

    <Text style={styles.profileInfo}>
  {language === 'fr'
    ? `Note moyenne : ${averageRating} / 5`
    : `Average rating: ${averageRating} / 5`}
</Text>

<Text style={styles.infoText}>
  {language === 'fr'
    ? `${customerReviews.length} avis client${customerReviews.length !== 1 ? 's' : ''}`
    : `${customerReviews.length} customer review${customerReviews.length !== 1 ? 's' : ''}`}
</Text>

{customerReviews.length === 0 ? (
  <Text style={[styles.infoText, { marginTop: 14 }]}>
    {language === 'fr'
      ? 'Aucun avis pour le moment.'
      : 'No reviews yet.'}
  </Text>
) : (
  customerReviews.map((review) => (
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
        {review.comment}
      </Text>
    </View>
  ))
)}
</>
) : profileSection === 'Abonnement' ? (
  <>
  <TouchableOpacity
  onPress={() =>
  setProfileSection(accountType === 'client' ? 'Profil client' : null)
  }
  style={{
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 16,
      fontWeight: '800',
    }}
  >
    {language === 'fr' ? '← Retour' : '← Back'}
  </Text>
</TouchableOpacity>
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
  <Text style={[styles.infoText, { marginTop: 8, textAlign: 'center' }]}>
  {language === 'fr'
    ? '3 divisions — 47,77 $ / mois'
    : '3 divisions — $47.77 / month'}
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
        {language === 'fr' ? 'Statut' : 'Status'}
      </Text>

      <Text style={styles.infoText}>
        {language === 'fr'
          ? 'Aucun abonnement entreprise actif'
: 'No active business subscription'}
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
  onPress={() => {
  setSubscriptionFlow(true);
  setProfileSection('Choix divisions');
}}
>
    
      <Text style={styles.primaryBtnText}>
        {language === 'fr'
          ? 'Prendre un abonnement entreprise'
: 'Get a business subscription'}
</Text>
    </TouchableOpacity>
  </>
) : profileSection === 'Paramètres' ? (
  <>
  <TouchableOpacity
  onPress={() => setProfileSection(null)}
  style={{
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
  }}
>
  <Text
    style={{
      color: COLORS.navy,
      fontSize: 16,
      fontWeight: '800',
    }}
  >
    {language === 'fr' ? '← Retour' : '← Back'}
  </Text>
</TouchableOpacity>
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
  <TouchableOpacity
    onPress={() => onNavigate('Pros', selectedPro?.trade || '')}
    style={{ marginBottom: 12 }}
  >
    <Text
      style={{
        color: COLORS.navy,
        fontSize: 15,
        fontWeight: '800',
      }}
    >
      {language === 'fr' ? '‹ Retour aux pros' : '‹ Back to pros'}
    </Text>
  </TouchableOpacity>

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

    
      {companyAddress.trim() !== '' && (
  <Text style={styles.infoText}>
    {language === 'fr'
      ? `📍 Adresse : ${companyAddress}`
      : `📍 Address: ${companyAddress}`}
  </Text>
)}

<Text style={styles.infoText}>
  {language === 'fr'
    ? `🏙️ Ville : ${companyCity && companyCity.trim() ? companyCity : 'Non renseignée'}`
    : `🏙️ City: ${companyCity && companyCity.trim() ? companyCity : 'Not provided'}`}
</Text>

{companyPostalCode.trim() !== '' && (
  <Text style={styles.infoText}>
    {language === 'fr'
      ? `📮 Code postal : ${companyPostalCode}`
      : `📮 Postal code: ${companyPostalCode}`}
  </Text>
)}
{companyPhone.trim() !== '' && (
  <Text style={styles.infoText}>
    {language === 'fr'
      ? `📞 Téléphone : ${companyPhone}`
      : `📞 Phone: ${companyPhone}`}
  </Text>
)}

{companyEmail.trim() !== '' && (
  <Text style={styles.infoText}>
    {language === 'fr'
      ? `✉️ Courriel : ${companyEmail}`
      : `✉️ Email: ${companyEmail}`}
  </Text>
)}

{companyWebsite.trim() !== '' && (
  <Text style={styles.infoText}>
    {language === 'fr'
      ? `🌐 Site Web : ${companyWebsite}`
      : `🌐 Website: ${companyWebsite}`}
  </Text>
)}
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


) : profileSection === 'Abonnement' ? (
  <>
    <TouchableOpacity
      onPress={() => setProfileSection(null)}
      style={{
  alignSelf: 'flex-start',
  marginBottom: 12,
  paddingVertical: 8,
  paddingHorizontal: 4,
  zIndex: 10,
}}
    >
      <Text style={{ color: COLORS.navy, fontSize: 16, fontWeight: '700' }}>
        {language === 'fr' ? '← Retour au profil' : '← Back to profile'}
      </Text>
    </TouchableOpacity>

    <Text style={styles.screenTitle}>
      {language === 'fr'
        ? 'Abonnement entreprise'
        : 'Business subscription'}
    </Text>

    <Text style={[styles.infoText, { marginBottom: 18 }]}>
      {language === 'fr'
        ? 'Créez votre profil d’entreprise et choisissez les branches dans lesquelles vous souhaitez apparaître.'
        : 'Create your business profile and choose the categories in which you want to appear.'}
    </Text>

    <TouchableOpacity
      onPress={() => setProfileSection('Informations entreprise')}
      style={styles.quoteBtn}
    >
      <Text style={styles.quoteBtnText}>
        {language === 'fr'
          ? '💳 Prendre un abonnement entreprise'
          : '💳 Get a business subscription'}
      </Text>
    </TouchableOpacity>
  </>
) : (
  <Text style={styles.infoText}>
    {language === 'fr'
      ? 'Cette section sera bientôt disponible dans QualiVérifié.'
      : 'This section will be available soon in QualiVérifié.'}
  </Text>
)}

</ScrollView>
);
}
return (
<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
  <ScrollView
  contentContainerStyle={[styles.page, { paddingBottom: 16 }]}
  keyboardShouldPersistTaps="handled"
  keyboardDismissMode="on-drag"
>
<AppHeader language={language} setLanguage={setLanguage} />
<>
{selectedPro && (
  <TouchableOpacity
    onPress={() => onNavigate('Pros', selectedPro.trade)}
    style={{ marginBottom: 10 }}
  >
    <Text
      style={{
        color: COLORS.navy,
        fontSize: 15,
        fontWeight: '800',
      }}
    >
      {language === 'fr' ? '‹ Retour aux pros' : '‹ Back to pros'}
    </Text>
  </TouchableOpacity>
)}

<Text style={styles.screenTitle}>
  {language === 'fr'
    ? (selectedPro ? 'Profil QualiVérifié' : 'Mon profil')
    : (selectedPro ? 'QualiVérifié Profile' : 'My profile')}
</Text>
</>
<View style={styles.profileCard}>
<TouchableOpacity
  style={styles.avatarLarge}
  onPress={pickProfilePhoto}
>
  {profilePhoto || (!selectedPro && clientPhoto) ? (
  <Image
    source={{ uri: profilePhoto || clientPhoto }}
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
{selectedPro && (
  <>
    <View style={styles.verifiedBadge}>
      <Text style={styles.verifiedBadgeText}>
        {language === 'fr'
          ? '✓ QualiVérifié — Professionnel vérifié'
          : '✓ QualiVérifié — Verified professional'}
      </Text>
    </View>

    <Text style={styles.sectionTitle}>
      {language === 'fr' ? 'À propos' : 'About'}
    </Text>

    <Text style={styles.profileInfo}>
      {language === 'fr'
        ? 'Constructions RL accompagne ses clients dans leurs projets de rénovation intérieure avec un service professionnel, fiable et soigné.'
        : 'Constructions RL supports its clients with professional, reliable and meticulous renovation services.'}
    </Text>

    <Text style={styles.profileInfo}>
      {language === 'fr'
        ? '🏆 Plus de 10 ans d’expérience'
        : '🏆 Over 10 years of experience'}
    </Text>

    

    <TouchableOpacity
      style={styles.quoteBtn}
      onPress={() => onNavigate('Messages', '', selectedPro)}
    >
      <Text style={styles.quoteBtnText}>
        {language === 'fr'
          ? '💬 Message'
: '💬 Message'}
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.quoteBtn}
      onPress={() =>
        setFavorites((prev) =>
          prev.some((fav) => fav.id === selectedPro.id)
            ? prev.filter((fav) => fav.id !== selectedPro.id)
            : [...prev, selectedPro]
        )
      }
    >
      <Text style={styles.quoteBtnText}>
        {favorites.some((fav) => fav.id === selectedPro.id)
          ? language === 'fr'
            ? '❤️ Retirer des favoris'
            : '❤️ Remove from favorites'
          : language === 'fr'
          ? '♡ Ajouter aux favoris'
          : '♡ Add to favorites'}
      </Text>
    </TouchableOpacity>

    <Text style={styles.sectionTitle}>
      {language === 'fr' ? '🛡️ Vérifications' : '🛡️ Verifications'}
    </Text>

    <Text style={styles.profileInfo}>
      {language === 'fr'
        ? '✅ RBQ  •  ✅ Assurance  •  ✅ Identité'
        : '✅ RBQ  •  ✅ Insurance  •  ✅ Identity'}
    </Text>

    <Text style={styles.sectionTitle}>
      {language === 'fr' ? '📍 Zones desservies' : '📍 Service areas'}
    </Text>

    <Text style={styles.profileInfo}>
      Montréal • Laval • Rive-Nord • Rive-Sud
    </Text>

    

    <Text style={styles.sectionTitle}>
  {language === 'fr' ? '⭐ Avis clients' : '⭐ Customer reviews'}
</Text>

<Text style={styles.profileInfo}>
  {language === 'fr'
    ? `Note moyenne : ${
        publicReviews.length > 0
          ? (
              publicReviews.reduce(
                (total, review) => total + Number(review.rating || 0),
                0
              ) / publicReviews.length
            ).toFixed(1)
          : '0.0'
      } / 5 (${publicReviews.length} avis)`
    : `Average rating: ${
        publicReviews.length > 0
          ? (
              publicReviews.reduce(
                (total, review) => total + Number(review.rating || 0),
                0
              ) / publicReviews.length
            ).toFixed(1)
          : '0.0'
      } / 5 (${publicReviews.length} reviews)`}
</Text>

{publicReviews.length === 0 ? (
  <Text style={styles.infoText}>
    {language === 'fr'
      ? 'Aucun avis pour le moment.'
      : 'No reviews yet.'}
  </Text>
) : (
  publicReviews.map((review) => (
    <View
      key={review.id}
      style={{
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 14,
        marginTop: 10,
      }}
    >
      <Text style={{ fontSize: 20 }}>
        {'⭐'.repeat(review.rating)}
      </Text>

      <Text style={styles.infoText}>
        {review.comment}
      </Text>
    </View>
  ))
)}

{accountType === 'client' && (
  <View
    style={{
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 14,
      marginTop: 16,
    }}
  >
    <Text style={styles.infoText}>
      {language === 'fr'
        ? 'Votre note'
        : 'Your rating'}
    </Text>

    <View
      style={{
        flexDirection: 'row',
        marginVertical: 10,
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => setReviewRating(star)}
        >
          <Text style={{ fontSize: 32 }}>
            {star <= reviewRating ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    <TextInput
      value={reviewComment}
      onChangeText={setReviewComment}
      placeholder={
        language === 'fr'
          ? 'Écrivez votre commentaire...'
          : 'Write your comment...'
      }
      multiline
      style={[
        styles.input,
        {
          minHeight: 90,
          textAlignVertical: 'top',
        },
      ]}
    />

    <TouchableOpacity
      style={[
        styles.primaryBtn,
        {
          marginTop: 12,
          opacity: reviewSaving ? 0.6 : 1,
        },
      ]}
      onPress={submitReview}
      disabled={reviewSaving}
    >
      <Text style={styles.primaryBtnText}>
        {reviewSaving
          ? language === 'fr'
            ? 'Publication...'
            : 'Publishing...'
          : language === 'fr'
          ? 'Publier mon avis'
          : 'Publish my review'}
      </Text>
    </TouchableOpacity>
  </View>
)}
  </>
)}
{!selectedPro && [
  
  { fr: '⭐ Avis', en: '⭐ Reviews', section: 'Mes avis' },
  { fr: '💳 Abonnement', en: '💳 Subscription', section: 'Abonnement' },
  { fr: '⚙️ Paramètres', en: '⚙️ Settings', section: 'Paramètres' },
  {
    fr: '🏢 Informations de l’entreprise',
    en: '🏢 Company information',
    section: 'Informations entreprise',
  },
  { fr: '🚪 Déconnexion', en: '🚪 Log out', section: 'Déconnexion' },
].map((item) => (
  <TouchableOpacity
    key={item.section}
    onPress={() => {
      if (item.section === 'Déconnexion') {
        onLogout();
      } else {
        setProfileSection(item.section);
      }
    }}
    style={styles.menuRow}
  >
    <Text style={styles.menuText}>
      {language === 'fr' ? item.fr : item.en}
    </Text>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
))}

    </ScrollView>
</KeyboardAvoidingView>
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
          '💬',
          language === 'fr' ? 'Messages clients' : 'Client messages',
          language === 'fr'
            ? '2 conversations actives'
            : '2 active conversations',
        ],
        [
  '🏢',
  language === 'fr'
    ? 'Informations de l’entreprise'
    : 'Company information',
  language === 'fr'
    ? 'Nom, description, photos, NEQ et RBQ'
    : 'Name, description, photos, NEQ and RBQ',
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
  if (
    title ===
    (language === 'fr' ? 'Messages clients' : 'Client messages')
  ) {
    onNavigate('Messages');
  } else if (
    title ===
    (language === 'fr'
      ? 'Informations de l’entreprise'
      : 'Company information')
  ) {
    setProfileSection('🛡 Devenir un pro vérifié');
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
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuoteRequests = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setRequests([]);
          return;
        }

        const { data, error } = await supabase
          .from('quote_requests')
          .select(`
            id,
            client_id,
            company_id,
            address,
            description,
            status,
            created_at
          `)
          .eq('company_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setRequests(data || []);
      } catch (error) {
        console.log('Erreur chargement soumissions :', error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuoteRequests();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader
        language={language}
        setLanguage={setLanguage}
        onNavigate={onNavigate}
      />

      <TouchableOpacity
        onPress={() => onNavigate('Profil')}
        style={{
          alignSelf: 'flex-start',
          paddingVertical: 8,
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
          ← {language === 'fr' ? 'Retour' : 'Back'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.screenTitle}>
        {language === 'fr'
          ? 'Demandes de soumission'
          : 'Quote requests'}
      </Text>

      {loading ? (
        <Text style={styles.infoText}>
          {language === 'fr'
            ? 'Chargement des demandes...'
            : 'Loading requests...'}
        </Text>
      ) : requests.length === 0 ? (
        <Text style={styles.infoText}>
          {language === 'fr'
            ? 'Aucune demande de soumission pour le moment.'
            : 'No quote requests yet.'}
        </Text>
      ) : (
        requests.map((request) => (
          <View
            key={request.id}
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
                marginBottom: 8,
              }}
            >
              {request.description}
            </Text>

            <Text style={styles.infoText}>
              📍 {request.address}
            </Text>

            <Text style={[styles.infoText, { marginTop: 6 }]}>
              {language === 'fr' ? 'Statut' : 'Status'} : {request.status}
            </Text>

            <Text style={[styles.infoText, { marginTop: 6 }]}>
              {new Date(request.created_at).toLocaleDateString(
                language === 'fr' ? 'fr-CA' : 'en-CA'
              )}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
 function Projets({ onNavigate, selectedPro, projects, setProjects, language, setLanguage }) {
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [sent, setSent] = useState(false);

  const sendQuoteRequest = async () => {
  if (!description.trim() || !address.trim() || !selectedPro?.id) {
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert(
        language === 'fr'
          ? 'Vous devez être connecté.'
          : 'You must be logged in.'
      );
      return;
    }

    const { data, error } = await supabase
  .from('quote_requests')
  .insert({
    client_id: user.id,
    company_id: selectedPro.id,
    address: address.trim(),
    description: description.trim(),
    status: 'new',
  })
  .select()
  .single();

if (error) throw error;

const user1Id =
  user.id < selectedPro.id ? user.id : selectedPro.id;

const user2Id =
  user.id < selectedPro.id ? selectedPro.id : user.id;

const {
  data: existingConversation,
  error: findConversationError,
} = await supabase
  .from('conversations')
  .select('id')
  .eq('user1_id', user1Id)
  .eq('user2_id', user2Id)
  .maybeSingle();

if (findConversationError) {
  throw findConversationError;
}

let conversationId = existingConversation?.id;

if (!conversationId) {
  const {
    data: newConversation,
    error: createConversationError,
  } = await supabase
    .from('conversations')
    .insert({
      user1_id: user1Id,
      user2_id: user2Id,
    })
    .select('id')
    .single();

  if (createConversationError) {
    throw createConversationError;
  }

  conversationId = newConversation.id;
}

const { error: messageError } = await supabase
  .from('messages')
  .insert({
    conversation_id: conversationId,
    sender_id: user.id,
    content:
      (language === 'fr'
        ? '📋 Nouvelle demande de soumission'
        : '📋 New quote request') +
      '\n' +
      description.trim() +
      '\n📍 ' +
      address.trim(),
  });

if (messageError) throw messageError;

setProjects((current) => [data, ...current]);
setSent(true);
  } catch (error) {
    console.log('Erreur soumission :', error);
    alert(error.message);
  }
};

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <AppHeader
        language={language}
        setLanguage={setLanguage}
        onNavigate={onNavigate}
      />

      <TouchableOpacity
        onPress={() => onNavigate('Pros', selectedPro?.trade || '', selectedPro)}
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
function Login({ onNavigate, language, setLanguage, onAccountTypeChange }) {
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('account_type')
    .eq('id', data.user.id)
    .single();

  if (profileError) {
    alert(profileError.message);
    return;
  }

  await AsyncStorage.setItem(
    'qualiverifie_account_type',
    profile.account_type
  );
onAccountTypeChange(profile.account_type);
  onNavigate('Profil');
};
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
          marginBottom: 24,
        }}
      >
        {language === 'fr' ? 'Connexion' : 'Sign in'}
      </Text>

      <TextInput
  value={email}
  onChangeText={setEmail}
  placeholder={language === 'fr' ? 'Courriel' : 'Email'}
  placeholderTextColor="#6B7280"
  autoCapitalize="none"
  keyboardType="email-address"
  style={styles.input}
/>

<TextInput
  value={password}
  onChangeText={setPassword}
  placeholder={language === 'fr' ? 'Mot de passe' : 'Password'}
  placeholderTextColor="#6B7280"
  secureTextEntry
  style={styles.input}
/>

      <TouchableOpacity
  style={{
    backgroundColor: '#071D3A',
    borderRadius: 14,
    paddingVertical: 17,
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }}
  onPress={handleLogin}
>
  <Text
    style={{
      color: '#D4AF37',
      fontSize: 18,
      fontWeight: '800',
    }}
  >
    {language === 'fr' ? 'Se connecter  ›' : 'Sign in  ›'}
  </Text>
</TouchableOpacity>
    </ScrollView>
  );
}
 function Signup({ onNavigate, language, setLanguage }) {
  
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [accountType, setAccountType] = useState('client');
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
    marginBottom: 16,
  }}
>
  <TouchableOpacity
    onPress={() => setAccountType('client')}
    style={{
      flex: 1,
      marginRight: 6,
      paddingVertical: 15,
      borderRadius: 14,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLORS.line,
      backgroundColor:
        accountType === 'client' ? COLORS.gold2 : COLORS.card,
    }}
  >
    <Text
      style={{
        color: COLORS.navy,
        fontSize: 16,
        fontWeight: '900',
      }}
    >
      {language === 'fr' ? 'Particulier' : 'Client'}
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => setAccountType('business')}
    style={{
      flex: 1,
      marginLeft: 6,
      paddingVertical: 15,
      borderRadius: 14,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLORS.line,
      backgroundColor:
        accountType === 'business' ? COLORS.gold2 : COLORS.card,
    }}
  >
    <Text
      style={{
        color: COLORS.navy,
        fontSize: 16,
        fontWeight: '900',
      }}
    >
      {language === 'fr' ? 'Entreprise' : 'Business'}
    </Text>
  </TouchableOpacity>
</View>  
  

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
onPress={async () => {
  if (!email || !password || !confirmPassword) {
    alert(language === 'fr' ? 'Veuillez remplir tous les champs obligatoires.' : 'Please fill in all required fields.');
    return;
  }
  
  if (password !== confirmPassword) {
    alert(language === 'fr' ? 'Les mots de passe ne correspondent pas.' : 'Passwords do not match.');
    return;
  }
  const { data, error } = await supabase.auth.signUp({
  email: email.trim(),
  password,
  options: {
    data: {
      account_type: accountType,
    },
  },
});

if (error) {
  alert(error.message);
  return;
}

alert(language === 'fr' ? 'Compte créé !' : 'Account created!');
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
const [userLocation, setUserLocation] = useState(null);
  const [accountType, setAccountType] = useState(null);
 const [unreadCount, setUnreadCount] = useState(0);
  const [navProfilePhoto, setNavProfilePhoto] = useState(null);
const [navProfileInitial, setNavProfileInitial] = useState('●');

  const loadUnreadCount = async () => {
  if (!accountType) {
    setUnreadCount(0);
    return;
  }

  const { data, error } = await supabase.rpc(
    'get_unread_message_count'
  );

  if (!error) {
    setUnreadCount(Number(data || 0));
  }
};

useEffect(() => {
  loadUnreadCount();

  const interval = setInterval(() => {
    loadUnreadCount();
  }, 5000);

  return () => clearInterval(interval);
}, [accountType]);
useEffect(() => {
  const loadNavProfile = async () => {
    if (!accountType) {
      setNavProfilePhoto(null);
      setNavProfileInitial('●');
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setNavProfilePhoto(null);
      setNavProfileInitial('●');
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('avatar_url, full_name, company_name')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      console.log('Erreur photo barre profil :', error);
      return;
    }

    setNavProfilePhoto(data?.avatar_url || null);

    const displayName =
      data?.full_name?.trim() ||
      data?.company_name?.trim() ||
      user.email?.trim() ||
      '';

    setNavProfileInitial(
      displayName ? displayName.charAt(0).toUpperCase() : '●'
    );
  };

  loadNavProfile();
}, [accountType, tab]);
useEffect(() => {
  const loadAccountType = async () => {
    const savedAccountType = await AsyncStorage.getItem(
      'qualiverifie_account_type'
    );

    if (savedAccountType) {
      setAccountType(savedAccountType);
    }
  };

  loadAccountType();
}, []);
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
  const handleLogout = async () => {
  await supabase.auth.signOut();
  await AsyncStorage.removeItem('qualiverifie_account_type');
  setAccountType(null);
  setSelectedPro(null);
  setTab('Accueil');
};
  const onDemoLogin = async (type) => {
    setAccountType(type);
    await AsyncStorage.setItem('qualiverifie_account_type', type);
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
    userLocation={userLocation}
    setUserLocation={setUserLocation}
      accountType={accountType}
  />
) :
tab === 'Login' ? (
  <Login
    onNavigate={navigate}
    language={language}
    setLanguage={setLanguage}
      onAccountTypeChange={setAccountType}
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
    onNavigate={navigate}
      onUnreadChange={loadUnreadCount}
  />
) : (
  <Profile
  onNavigate={navigate}
  selectedPro={selectedPro}
  favorites={favorites}
  setFavorites={setFavorites}
  language={language}
  setLanguage={setLanguage}
  accountType={accountType}
  onProfilePhotoChange={setNavProfilePhoto}
    onLogout={handleLogout}
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
          <TouchableOpacity
  key={tabName}
  style={styles.navItem}
  onPress={() =>
    (tabName === 'Profil' || tabName === 'Messages') && !accountType
      ? navigate('Login')
      : navigate(tabName)
  }
>
  {tabName === 'Profil' && accountType ? (
  navProfilePhoto ? (
    <Image
      source={{ uri: navProfilePhoto }}
      style={{
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor:
          tab === 'Profil' || tab === 'EntrepriseDemo'
            ? COLORS.gold2
            : '#AFB9C8',
      }}
    />
  ) : (
    <View
      style={{
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.gold2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: COLORS.navy,
          fontWeight: '900',
          fontSize: 14,
        }}
      >
        {navProfileInitial}
      </Text>
    </View>
  )
) : (
  <View
    style={{
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text
      style={[
        styles.navIcon,
        (tab === tabName ||
          (tabName === 'Profil' && tab === 'EntrepriseDemo')) &&
          styles.navActive,
      ]}
    >
      {icon}
    </Text>

    {tabName === 'Messages' && unreadCount > 0 ? (
      <View
        style={{
          position: 'absolute',
          top: -6,
          right: -12,
          minWidth: 18,
          height: 18,
          borderRadius: 9,
          paddingHorizontal: 4,
          backgroundColor: COLORS.gold2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: COLORS.navy,
            fontSize: 11,
            fontWeight: '900',
          }}
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Text>
      </View>
    ) : null}
  </View>
)}

  <Text style={[styles.navText, (tab === tabName || (tabName === 'Profil' && tab === 'EntrepriseDemo')) && styles.navActive]}>{label}</Text>
</TouchableOpacity>
))}
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
  grid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: 10,
},

categoryCard: {
  width: '48%',
  backgroundColor: COLORS.card,
  minHeight: 74,
  paddingVertical: 12,
  paddingHorizontal: 12,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: COLORS.line,
  justifyContent: 'center',
},

categoryIcon: {
  fontSize: 20,
  color: COLORS.gold,
  width: 26,
  textAlign: 'center',
},

categoryText: {
  color: COLORS.text,
  fontWeight: '800',
  fontSize: 14,
  lineHeight: 18,
},
  infoCard: { flexDirection: 'row', gap: 5, alignItems: 'center', backgroundColor: COLORS.card, padding: 6, borderRadius: 9, marginBottom: 4, borderWidth: 1, borderColor: COLORS.line },
  infoIcon: { color: COLORS.gold, fontWeight: '900', fontSize: 15, width: 20, textAlign: 'center' },
  infoTitle: { color: COLORS.text, fontWeight: '800', fontSize: 12 },
  infoText: { color: COLORS.muted, fontSize: 10, lineHeight: 13, marginTop: 1 },
  screenTitle: { color: COLORS.navy, fontWeight: '900', fontSize: 27, marginBottom: 12 },
  helper: { color: COLORS.muted, lineHeight: 20, marginBottom: 14 },
  input: {
  width: '100%',
  alignSelf: 'stretch',
  backgroundColor: COLORS.card,
  borderWidth: 1,
  borderColor: COLORS.line,
  borderRadius: 12,
  padding: 14,
  fontSize: 15,
  marginBottom: 10,
  color: COLORS.text,
},
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
  smallGoldBtn: { backgroundColor: COLORS.gold, borderRadius: 9, paddingVertical: 8, paddingHorizontal: 14 },
  smallGoldBtnText: {
  color: COLORS.navy,
  fontWeight: '800',
  fontSize: 12,
},
  
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
  minHeight: 180,
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
