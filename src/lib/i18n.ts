// ─── Lightweight EN/FR dictionary ────────────────────────────────────────────
// Covers chrome (header, footer), home-page sections (hero, quick services,
// CTA) and the search overlay. Page body content stays English; any key not
// translated falls back to EN because `fr` must satisfy `Dictionary`.

export type Language = 'en' | 'fr';

export const LANGUAGE_STORAGE_KEY = 'iad_lang';

export const en = {
  nav: {
    home: 'Home',
    about: 'About',
    mandate: 'Mandate & Services',
    vision: 'Vision',
    functions: 'Functions',
    leadership: 'Leadership',
    structure: 'Organisational Structure',
    auditUnits: 'Audit Units',
    transparency: 'Transparency',
    findingsTracker: 'Audit Findings Tracker',
    registry: 'IAC Registry',
    verify: 'Verify Certificate',
    services: 'Services',
    specialAudit: 'Special Audit Requests',
    consultancy: 'Consultancy',
    reportFraud: 'Report Fraud / Whistleblowing',
    rti: 'Right to Information',
    feedback: 'Feedback',
    track: 'Track Submission',
    news: 'News & Events',
    newsList: 'News',
    events: 'Events',
    publications: 'Publications',
    contact: 'Contact',
  },
  header: {
    republic: 'Republic of Ghana',
    contactUs: 'Contact Us',
    search: 'Search',
    viewAll: 'View all',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    navigation: 'Navigation',
    english: 'English language',
    french: 'French language',
  },
  hero: {
    eyebrow: 'Republic of Ghana — Office of the Head of the Civil Service',
    headlineA: 'Independent',
    headlineAccent: 'Assurance.',
    headlineB: 'Accountable Governance.',
    subtitle:
      "The Internal Audit Department is the headquarters of internal audit in the Ghana Civil Service — safeguarding public resources, strengthening controls, and coordinating the Internal Audit Units of every Ministry, Department and Agency.",
    ctaFraud: 'Report Fraud or Waste',
    ctaUnits: 'Explore Audit Units',
    chipWhistleblower: 'Whistleblower Act, 2006 (Act 720)',
    chipClass: 'Internal Audit Class of the Civil Service',
    scroll: 'Scroll',
  },
  quickServices: {
    eyebrow: 'Our Services',
    titleA: 'How Can We',
    titleAccent: 'Help You',
    subtitle:
      'Request audit and advisory services, report fraud or waste, and access official publications online.',
    getStarted: 'Get started',
    cards: {
      specialAudit: {
        title: 'Special Audit Requests',
        description: 'Request a special audit, risk assessment, or controls review.',
      },
      reportFraud: {
        title: 'Report Fraud or Waste',
        description: 'Blow the whistle on fraud, abuse, or waste — anonymously if you wish.',
      },
      rti: {
        title: 'Right to Information',
        description: 'Submit RTI requests for public records and data.',
      },
      publications: {
        title: 'Publications & Downloads',
        description: 'Access audit reports, annual plans, policies, and manuals.',
      },
    },
  },
  cta: {
    stayConnected: 'Stay Connected',
    headlineA: 'Seen Fraud or',
    headlineAccent: 'Waste?',
    body: 'Help us protect public resources. Report fraud, abuse, or waste — you can remain anonymous, and no identifying details are stored unless you choose to share them.',
    reportButton: 'Report Fraud or Waste',
    subscribePrompt: 'Stay Connected — subscribe for departmental updates:',
    emailPlaceholder: 'Enter your email',
    subscribe: 'Subscribe',
    finePrint: 'No spam. Official IAD updates only. Unsubscribe anytime.',
    successTitle: "You're Subscribed!",
    successBody: "You're subscribed — official IAD updates only",
    successDetail: "We'll send updates to",
    alreadyTitle: "You're already on the list",
    alreadyBody: 'This email address is already subscribed to IAD updates.',
    errorTitle: 'Something went wrong',
    errorBody: "We couldn't subscribe you just now. Please try again.",
    retry: 'Retry',
    quickActions: {
      reportFraud: 'Report Fraud or Waste',
      track: 'Track Submission',
      publications: 'Browse Publications',
    },
  },
  footer: {
    description:
      "The Internal Audit Department provides independent assurance, audit coordination, and advisory services that strengthen accountability, risk management, and compliance across Ghana's Civil Service.",
    officeHours: 'Office Hours',
    officeHoursValue: 'Mon – Fri, 8:00 AM – 5:00 PM',
    quickLinks: 'Quick Links',
    services: 'Services',
    getInTouch: 'Get in Touch',
    addressLabel: 'Address',
    addressLine1: 'Internal Audit Department,',
    addressLine2: 'Office of the Head of the Civil Service,',
    addressLine3: 'P.O. Box M.49, Accra, Ghana',
    phone: 'Phone',
    email: 'Email',
    copyright: 'Internal Audit Department — Office of the Head of the Civil Service',
    rights: 'Republic of Ghana • All rights reserved',
    links: {
      aboutIad: 'About IAD',
      auditUnits: 'Audit Units',
      publications: 'Publications',
      newsEvents: 'News & Events',
      rti: 'Right to Information',
      contactUs: 'Contact Us',
    },
    serviceLinks: {
      specialAudit: 'Special Audit Requests',
      consultancy: 'Consultancy',
      reportFraud: 'Report Fraud / Whistleblowing',
      feedback: 'Feedback',
      track: 'Track Submission',
    },
    privacy: 'Privacy Policy',
    accessibility: 'Accessibility',
    sitemap: 'Sitemap',
  },
  search: {
    dialogLabel: 'Site search',
    placeholder: 'Search pages, services, audit units…',
    closeLabel: 'Close search',
    noResults: "No results for “{query}” — try 'audit', 'fraud', 'certificate'",
    groups: {
      pages: 'Pages',
      services: 'Services',
      auditUnits: 'Audit Units',
      publications: 'Publications',
    },
  },
};

export type Dictionary = typeof en;

export const fr: Dictionary = {
  nav: {
    home: 'Accueil',
    about: 'À propos',
    mandate: 'Mandat et Services',
    vision: 'Vision',
    functions: 'Fonctions',
    leadership: 'Direction',
    structure: 'Structure Organisationnelle',
    auditUnits: "Unités d’Audit",
    transparency: 'Transparence',
    findingsTracker: 'Suivi des Constatations d’Audit',
    registry: 'Registre de la Classe d’Audit Interne',
    verify: 'Vérifier un Certificat',
    services: 'Services',
    specialAudit: 'Demandes d’Audit Spécial',
    consultancy: 'Conseil et Consultance',
    reportFraud: 'Signaler une Fraude / Dénonciation',
    rti: 'Droit à l’Information',
    feedback: 'Commentaires',
    track: 'Suivre une Soumission',
    news: 'Actualités et Événements',
    newsList: 'Actualités',
    events: 'Événements',
    publications: 'Publications',
    contact: 'Contact',
  },
  header: {
    republic: 'République du Ghana',
    contactUs: 'Contactez-nous',
    search: 'Rechercher',
    viewAll: 'Tout voir',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    navigation: 'Navigation',
    english: 'Langue anglaise',
    french: 'Langue française',
  },
  hero: {
    eyebrow: 'République du Ghana — Bureau du Chef de la Fonction Publique',
    headlineA: 'Assurance',
    headlineAccent: 'Indépendante.',
    headlineB: 'Gouvernance Responsable.',
    subtitle:
      "Le Département de l’Audit Interne est le siège de l’audit interne dans la Fonction Publique du Ghana — il protège les ressources publiques, renforce les contrôles et coordonne les Unités d’Audit Interne de chaque Ministère, Département et Agence.",
    ctaFraud: 'Signaler une Fraude ou un Gaspillage',
    ctaUnits: 'Explorer les Unités d’Audit',
    chipWhistleblower: 'Loi sur les Lanceurs d’Alerte, 2006 (Loi 720)',
    chipClass: 'Classe d’Audit Interne de la Fonction Publique',
    scroll: 'Défiler',
  },
  quickServices: {
    eyebrow: 'Nos Services',
    titleA: 'Comment Pouvons-Nous',
    titleAccent: 'Vous Aider',
    subtitle:
      'Demandez des services d’audit et de conseil, signalez une fraude ou un gaspillage, et accédez aux publications officielles en ligne.',
    getStarted: 'Commencer',
    cards: {
      specialAudit: {
        title: 'Demandes d’Audit Spécial',
        description: 'Demandez un audit spécial, une évaluation des risques ou un examen des contrôles.',
      },
      reportFraud: {
        title: 'Signaler une Fraude ou un Gaspillage',
        description: 'Signalez une fraude, un abus ou un gaspillage — anonymement si vous le souhaitez.',
      },
      rti: {
        title: 'Droit à l’Information',
        description: 'Soumettez des demandes d’accès aux documents et données publics.',
      },
      publications: {
        title: 'Publications et Téléchargements',
        description: 'Accédez aux rapports d’audit, plans annuels, politiques et manuels.',
      },
    },
  },
  cta: {
    stayConnected: 'Restez Connecté',
    headlineA: 'Vous Avez Vu une Fraude ou un',
    headlineAccent: 'Gaspillage ?',
    body: 'Aidez-nous à protéger les ressources publiques. Signalez une fraude, un abus ou un gaspillage — vous pouvez rester anonyme, et aucune donnée d’identification n’est conservée sauf si vous choisissez de la partager.',
    reportButton: 'Signaler une Fraude ou un Gaspillage',
    subscribePrompt: 'Restez connecté — abonnez-vous aux actualités du département :',
    emailPlaceholder: 'Entrez votre e-mail',
    subscribe: 'S’abonner',
    finePrint: 'Pas de spam. Uniquement les actualités officielles de l’IAD. Désabonnement à tout moment.',
    successTitle: 'Vous êtes abonné !',
    successBody: 'Vous êtes abonné — uniquement les actualités officielles de l’IAD',
    successDetail: 'Nous enverrons les actualités à',
    alreadyTitle: 'Vous êtes déjà sur la liste',
    alreadyBody: 'Cette adresse e-mail est déjà abonnée aux actualités de l’IAD.',
    errorTitle: 'Une erreur est survenue',
    errorBody: 'Nous n’avons pas pu vous abonner pour le moment. Veuillez réessayer.',
    retry: 'Réessayer',
    quickActions: {
      reportFraud: 'Signaler une Fraude ou un Gaspillage',
      track: 'Suivre une Soumission',
      publications: 'Parcourir les Publications',
    },
  },
  footer: {
    description:
      'Le Département de l’Audit Interne fournit une assurance indépendante, une coordination des audits et des services de conseil qui renforcent la redevabilité, la gestion des risques et la conformité dans l’ensemble de la Fonction Publique du Ghana.',
    officeHours: 'Heures d’Ouverture',
    officeHoursValue: 'Lun – Ven, 8h00 – 17h00',
    quickLinks: 'Liens Rapides',
    services: 'Services',
    getInTouch: 'Contactez-Nous',
    addressLabel: 'Adresse',
    addressLine1: 'Département de l’Audit Interne,',
    addressLine2: 'Bureau du Chef de la Fonction Publique,',
    addressLine3: 'B.P. M.49, Accra, Ghana',
    phone: 'Téléphone',
    email: 'E-mail',
    copyright: 'Département de l’Audit Interne — Bureau du Chef de la Fonction Publique',
    rights: 'République du Ghana • Tous droits réservés',
    links: {
      aboutIad: 'À propos de l’IAD',
      auditUnits: 'Unités d’Audit',
      publications: 'Publications',
      newsEvents: 'Actualités et Événements',
      rti: 'Droit à l’Information',
      contactUs: 'Contactez-nous',
    },
    serviceLinks: {
      specialAudit: 'Demandes d’Audit Spécial',
      consultancy: 'Conseil et Consultance',
      reportFraud: 'Signaler une Fraude / Dénonciation',
      feedback: 'Commentaires',
      track: 'Suivre une Soumission',
    },
    privacy: 'Politique de Confidentialité',
    accessibility: 'Accessibilité',
    sitemap: 'Plan du site',
  },
  search: {
    dialogLabel: 'Recherche du site',
    placeholder: 'Rechercher des pages, services, unités…',
    closeLabel: 'Fermer la recherche',
    noResults: 'Aucun résultat pour « {query} » — essayez « audit », « fraude », « certificat »',
    groups: {
      pages: 'Pages',
      services: 'Services',
      auditUnits: 'Unités d’Audit',
      publications: 'Publications',
    },
  },
};

export const dictionaries: Record<Language, Dictionary> = { en, fr };

export function getDictionary(lang: Language): Dictionary {
  return dictionaries[lang] ?? en;
}

export function isLanguage(value: unknown): value is Language {
  return value === 'en' || value === 'fr';
}

// ─── Nav label mapping ───────────────────────────────────────────────────────
// NAV_ITEMS in constants.ts keep English labels (used as stable identifiers);
// components translate at render time via this map. Unknown labels fall back
// to the English label unchanged.

export const NAV_LABEL_KEYS: Record<string, keyof Dictionary['nav']> = {
  Home: 'home',
  About: 'about',
  'Mandate & Services': 'mandate',
  Vision: 'vision',
  Functions: 'functions',
  Leadership: 'leadership',
  'Organisational Structure': 'structure',
  'Audit Units': 'auditUnits',
  Transparency: 'transparency',
  'Audit Findings Tracker': 'findingsTracker',
  'IAC Registry': 'registry',
  'Verify Certificate': 'verify',
  Services: 'services',
  'Special Audit Requests': 'specialAudit',
  Consultancy: 'consultancy',
  'Report Fraud / Whistleblowing': 'reportFraud',
  'Right to Information': 'rti',
  Feedback: 'feedback',
  'Track Submission': 'track',
  'News & Events': 'news',
  News: 'newsList',
  Events: 'events',
  Publications: 'publications',
  Contact: 'contact',
};

export function navLabel(label: string, dict: Dictionary): string {
  const key = NAV_LABEL_KEYS[label];
  return key ? dict.nav[key] : label;
}
