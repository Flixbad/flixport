import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Translations {
  [key: string]: string | Translations;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage$ = new BehaviorSubject<string>('fr');
  private translations: { [lang: string]: Translations } = {};

  constructor() {
    this.loadTranslations();
    // Récupérer la langue sauvegardée ou détecter la langue du navigateur
    const savedLang = localStorage.getItem('flixdev-lang');
    const browserLang = navigator.language.split('-')[0];
    const initialLang = savedLang || (browserLang === 'en' ? 'en' : 'fr');
    this.setLanguage(initialLang);
  }

  private loadTranslations() {
    this.translations = {
      fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.projects': 'Projets',
        'nav.services': 'Services',
        'nav.skills': 'Compétences',
        'nav.contact': 'Contact',
        
        // Home Page
        'home.hero.title': 'Bonjour, je suis',
        'home.hero.subtitle': 'Développeur Web passionné par le code, les jeux vidéo et la création d\'expériences digitales innovantes',
        'home.hero.btn.parcours': 'Découvrir mon parcours',
        'home.hero.btn.projects': 'Voir mes projets',
        'home.parcours.title': 'Mon Parcours',
        'home.parcours.intro': 'Mon aventure dans le développement web a commencé par une passion pour la technologie et les jeux vidéo. Fasciné par la manière dont les lignes de code peuvent donner vie à des expériences interactives, j\'ai décidé de transformer cette passion en carrière.',
        'home.parcours.timeline.start.title': 'Début de l\'aventure',
        'home.parcours.timeline.start.desc': 'Tout a commencé par une curiosité pour comprendre comment fonctionnent les sites web et les applications que j\'utilisais quotidiennement. Les jeux vidéo m\'ont également inspiré à créer des expériences interactives.',
        'home.parcours.timeline.formation.title': 'Formation et apprentissage',
        'home.parcours.timeline.formation.desc': 'J\'ai suivi une formation approfondie en développement web, maîtrisant les technologies modernes comme Angular, TypeScript, et les frameworks JavaScript. Chaque projet est une nouvelle opportunité d\'apprendre.',
        'home.parcours.timeline.today.title': 'Aujourd\'hui',
        'home.parcours.timeline.today.desc': 'Je continue à évoluer dans le développement web, en créant des applications performantes et des interfaces utilisateur modernes. Mon objectif est de combiner ma passion pour le code et les jeux vidéo dans des projets innovants.',
        'home.parcours.gaming.title': 'Passion Gaming',
        'home.parcours.gaming.desc': 'Les jeux vidéo m\'inspirent dans ma façon de penser l\'UX et l\'interactivité',
        'home.passions.title': 'Mes Passions',
        'home.passions.dev.title': 'Développement Web',
        'home.passions.dev.desc': 'Créer des applications web modernes avec les dernières technologies. J\'aime résoudre des problèmes complexes et construire des solutions élégantes.',
        'home.passions.gaming.title': 'Jeux Vidéo',
        'home.passions.gaming.desc': 'Les jeux vidéo sont une source d\'inspiration constante. Ils m\'apprennent l\'importance de l\'UX, de la performance et de l\'immersion utilisateur.',
        'home.passions.innovation.title': 'Innovation',
        'home.passions.innovation.desc': 'Toujours à l\'affût des nouvelles technologies et tendances. J\'aime expérimenter et pousser les limites du possible.',
        'home.passions.design.title': 'Design',
        'home.passions.design.desc': 'Créer des interfaces à la fois belles et fonctionnelles. Le design et le code vont de pair pour créer de meilleures expériences.',
        'home.why.title': 'Pourquoi le Développement Web ?',
        'home.why.p1': 'Le développement web représente pour moi la fusion parfaite entre créativité et logique. C\'est un domaine où chaque ligne de code peut avoir un impact réel sur la vie des utilisateurs.',
        'home.why.p2': 'Ce qui m\'attire particulièrement, c\'est la possibilité de créer des expériences interactives qui rappellent l\'immersion des jeux vidéo, mais dans un contexte professionnel et accessible à tous.',
        'home.why.p3': 'Le développement web est également un domaine en constante évolution, ce qui signifie qu\'il y a toujours quelque chose de nouveau à apprendre, de nouveaux défis à relever, et de nouvelles façons d\'innover.',
        
        // Projects Page
        'projects.title': 'Mes Projets',
        'projects.subtitle': 'Découvrez une sélection de mes réalisations en développement web, alliant performance, design moderne et expérience utilisateur optimale.',
        'projects.filter.all': 'Tous',
        'projects.filter.web': 'Web',
        'projects.filter.gaming': 'Gaming',
        'projects.filter.fullstack': 'Full Stack',
        'projects.noResults': 'Aucun projet trouvé dans cette catégorie.',
        'projects.1.title': 'Application E-Commerce',
        'projects.1.description': 'Plateforme e-commerce complète avec gestion de panier, paiement et administration. Interface moderne et responsive.',
        'projects.2.title': 'Dashboard Analytics',
        'projects.2.description': 'Tableau de bord interactif pour visualiser des données en temps réel avec graphiques et statistiques.',
        'projects.3.title': 'Jeu Web Interactif',
        'projects.3.description': 'Jeu développé en JavaScript avec Canvas API, combinant gameplay addictif et design moderne.',
        'projects.4.title': 'API RESTful',
        'projects.4.description': 'API robuste pour application web avec authentification JWT, gestion des utilisateurs et documentation complète.',
        'projects.5.title': 'Portfolio Créatif',
        'projects.5.description': 'Site portfolio avec animations fluides, transitions modernes et design épuré pour mettre en valeur les projets.',
        'projects.6.title': 'Simulateur de Jeu',
        'projects.6.description': 'Simulateur de gameplay avec mécaniques de jeu complexes, système de scores et classements.',
        
        // Contact Page
        'contact.title': 'Contactez-moi',
        'contact.subtitle': 'Une idée de projet ? Une question ? N\'hésitez pas à me contacter, je serai ravi d\'échanger avec vous !',
        'contact.info.title': 'Restons en contact',
        'contact.info.desc': 'Je suis toujours ouvert à discuter de nouveaux projets, d\'opportunités créatives ou simplement pour échanger autour du développement web et des jeux vidéo.',
        'contact.form.name': 'Nom',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Sujet',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Envoyer le message',
        'contact.form.submitting': 'Envoi en cours...',
        'contact.form.success': 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
        'contact.form.error': 'Erreur lors de l\'envoi. Veuillez réessayer ou me contacter directement par email.',
        'contact.availability': 'Disponible pour de nouveaux projets',
        
        // Footer
        'footer.desc': 'Développeur Web passionné par le code et les jeux vidéo',
        'footer.nav.title': 'Navigation',
        'footer.social.title': 'Réseaux',
        'footer.legal.link': 'Mentions légales & RGPD',
        'footer.cookies.link': 'Gestion des cookies',
        'footer.cookies.message': 'Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement.',
        'footer.cookies.cta': 'En savoir plus',
        'footer.copyright': 'Tous droits réservés.',
        
        // Skills Page
        'skills.title': 'Mes Compétences',
        'skills.subtitle': 'Découvrez mes compétences techniques organisées par catégories, avec des niveaux de maîtrise détaillés.',
        'skills.categories.frontend': 'Frontend',
        'skills.categories.backend': 'Backend',
        'skills.categories.tools': 'Outils & Technologies',
        'skills.level.beginner': 'Débutant',
        'skills.level.intermediate': 'Intermédiaire',
        'skills.level.advanced': 'Avancé',
        'skills.radial.title': 'Compétences Principales',
        
        // Services Page
        'services.title': 'Mes Services',
        'services.subtitle': 'Découvrez les services que je propose pour transformer vos idées en réalité digitale.',
        'services.web.title': 'Développement Web',
        'services.web.description': 'Création de sites web modernes et performants avec les dernières technologies.',
        'services.web.feature1': 'Sites web responsive et modernes',
        'services.web.feature2': 'Applications web interactives',
        'services.web.feature3': 'Optimisation des performances',
        'services.web.feature4': 'Intégration d\'APIs et services',
        'services.fullstack.title': 'Développement Full Stack',
        'services.fullstack.description': 'Solutions complètes de la conception à la mise en production.',
        'services.fullstack.feature1': 'Architecture backend robuste',
        'services.fullstack.feature2': 'Bases de données optimisées',
        'services.fullstack.feature3': 'APIs RESTful sécurisées',
        'services.fullstack.feature4': 'Déploiement et maintenance',
        'services.design.title': 'Design UI/UX',
        'services.design.description': 'Interfaces utilisateur intuitives et esthétiques pour une expérience optimale.',
        'services.design.feature1': 'Design moderne et épuré',
        'services.design.feature2': 'Expérience utilisateur optimisée',
        'services.design.feature3': 'Prototypage et maquettes',
        'services.design.feature4': 'Design responsive',
        'services.price.note': 'Sur devis',
        'services.process.title': 'Mon Processus de Travail',
        'services.process.step1.title': 'Analyse & Conception',
        'services.process.step1.description': 'Analyse de vos besoins, définition des objectifs et conception de l\'architecture technique.',
        'services.process.step2.title': 'Développement',
        'services.process.step2.description': 'Développement itératif avec des points de contrôle réguliers pour valider l\'avancement.',
        'services.process.step3.title': 'Tests & Optimisation',
        'services.process.step3.description': 'Tests approfondis, optimisation des performances et correction des bugs.',
        'services.process.step4.title': 'Déploiement & Support',
        'services.process.step4.description': 'Mise en production et accompagnement pour assurer le bon fonctionnement.',
        
        // Legal Page
        'legal.nav': 'Mentions légales & RGPD',
        'legal.title': 'Mentions légales, RGPD & Cookies',
        'legal.subtitle': 'Transparence sur l\'utilisation de vos données et le fonctionnement du site FlixDev.',
        'legal.identity.title': 'Éditeur du site',
        'legal.identity.content': 'Ce site est un portfolio personnel conçu et développé par FlixDev.\n\nObjectif : présenter mes compétences, mes projets et permettre un premier contact professionnel.',
        'legal.hosting.title': 'Hébergement',
        'legal.hosting.content': 'Le site est hébergé sur un VPS personnel. Les logs techniques peuvent être conservés pour la sécurité et le bon fonctionnement du service.',
        'legal.rgpd.title': 'Données personnelles',
        'legal.rgpd.content': 'Le formulaire de contact collecte uniquement les informations nécessaires pour vous répondre (nom, email, sujet, message).\n\nCes informations ne sont pas revendues et ne servent qu\'à vous recontacter dans le cadre d\'un échange professionnel. Vous pouvez demander la suppression de vos données en me contactant par email.',
        'legal.cookies.title': 'Cookies',
        'legal.cookies.content': 'Le site n\'utilise que des cookies techniques nécessaires à son bon fonctionnement (préférences de langue, thème sombre/clair). Aucun cookie publicitaire ni de suivi invasif n\'est utilisé.\n\nSi des outils de mesure d\'audience sont ajoutés (type Matomo, Plausible), ils seront configurés pour respecter votre vie privée.',
        'legal.analytics.title': 'Statistiques & Mesure d\'audience',
        'legal.analytics.content': 'Les futures statistiques de visite auront pour seul but d\'améliorer le site (pages les plus vues, support utilisé, langue, etc.). Aucun profil marketing individuel n\'est créé.',
        
        // 404 Page
        '404.title': 'Page introuvable',
        '404.message': 'Oups ! Il semble que la page que vous recherchez n\'existe pas ou a été déplacée.',
        '404.submessage': 'Peut-être qu\'une erreur de syntaxe s\'est glissée dans l\'URL ? 😉',
        '404.backHome': 'Retour à l\'accueil',
        '404.backPrevious': 'Page précédente',
        '404.suggestions': 'Vous cherchez peut-être :'
      },
      en: {
        // Navigation
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.services': 'Services',
        'nav.skills': 'Skills',
        'nav.contact': 'Contact',
        
        // Home Page
        'home.hero.title': 'Hello, I am',
        'home.hero.subtitle': 'Web Developer passionate about code, video games and creating innovative digital experiences',
        'home.hero.btn.parcours': 'Discover my journey',
        'home.hero.btn.projects': 'View my projects',
        'home.parcours.title': 'My Journey',
        'home.parcours.intro': 'My adventure in web development started with a passion for technology and video games. Fascinated by how lines of code can bring interactive experiences to life, I decided to turn this passion into a career.',
        'home.parcours.timeline.start.title': 'The Beginning',
        'home.parcours.timeline.start.desc': 'It all started with curiosity about understanding how websites and applications I used daily work. Video games also inspired me to create interactive experiences.',
        'home.parcours.timeline.formation.title': 'Training and Learning',
        'home.parcours.timeline.formation.desc': 'I followed comprehensive web development training, mastering modern technologies like Angular, TypeScript, and JavaScript frameworks. Each project is a new opportunity to learn.',
        'home.parcours.timeline.today.title': 'Today',
        'home.parcours.timeline.today.desc': 'I continue to evolve in web development, creating performant applications and modern user interfaces. My goal is to combine my passion for code and video games in innovative projects.',
        'home.parcours.gaming.title': 'Gaming Passion',
        'home.parcours.gaming.desc': 'Video games inspire me in how I think about UX and interactivity',
        'home.passions.title': 'My Passions',
        'home.passions.dev.title': 'Web Development',
        'home.passions.dev.desc': 'Creating modern web applications with the latest technologies. I love solving complex problems and building elegant solutions.',
        'home.passions.gaming.title': 'Video Games',
        'home.passions.gaming.desc': 'Video games are a constant source of inspiration. They teach me the importance of UX, performance, and user immersion.',
        'home.passions.innovation.title': 'Innovation',
        'home.passions.innovation.desc': 'Always on the lookout for new technologies and trends. I love experimenting and pushing the limits of what\'s possible.',
        'home.passions.design.title': 'Design',
        'home.passions.design.desc': 'Creating interfaces that are both beautiful and functional. Design and code go hand in hand to create better experiences.',
        'home.why.title': 'Why Web Development?',
        'home.why.p1': 'Web development represents for me the perfect fusion between creativity and logic. It\'s a field where every line of code can have a real impact on users\' lives.',
        'home.why.p2': 'What particularly attracts me is the possibility of creating interactive experiences that recall the immersion of video games, but in a professional and accessible context for everyone.',
        'home.why.p3': 'Web development is also a constantly evolving field, which means there\'s always something new to learn, new challenges to take on, and new ways to innovate.',
        
        // Projects Page
        'projects.title': 'My Projects',
        'projects.subtitle': 'Discover a selection of my web development achievements, combining performance, modern design and optimal user experience.',
        'projects.filter.all': 'All',
        'projects.filter.web': 'Web',
        'projects.filter.gaming': 'Gaming',
        'projects.filter.fullstack': 'Full Stack',
        'projects.noResults': 'No projects found in this category.',
        'projects.1.title': 'E-Commerce Application',
        'projects.1.description': 'Complete e-commerce platform with cart management, payment and administration. Modern and responsive interface.',
        'projects.2.title': 'Analytics Dashboard',
        'projects.2.description': 'Interactive dashboard to visualize real-time data with charts and statistics.',
        'projects.3.title': 'Interactive Web Game',
        'projects.3.description': 'Game developed in JavaScript with Canvas API, combining addictive gameplay and modern design.',
        'projects.4.title': 'RESTful API',
        'projects.4.description': 'Robust API for web application with JWT authentication, user management and complete documentation.',
        'projects.5.title': 'Creative Portfolio',
        'projects.5.description': 'Portfolio site with smooth animations, modern transitions and clean design to showcase projects.',
        'projects.6.title': 'Game Simulator',
        'projects.6.description': 'Gameplay simulator with complex game mechanics, scoring system and leaderboards.',
        
        // Contact Page
        'contact.title': 'Contact Me',
        'contact.subtitle': 'A project idea? A question? Don\'t hesitate to contact me, I\'ll be happy to chat with you!',
        'contact.info.title': 'Let\'s Stay in Touch',
        'contact.info.desc': 'I\'m always open to discussing new projects, creative opportunities or simply exchanging about web development and video games.',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Send message',
        'contact.form.submitting': 'Sending...',
        'contact.form.success': 'Message sent successfully! I will get back to you as soon as possible.',
        'contact.form.error': 'Error sending message. Please try again or contact me directly by email.',
        'contact.availability': 'Available for new projects',
        
        // Footer
        'footer.desc': 'Web Developer passionate about code and video games',
        'footer.nav.title': 'Navigation',
        'footer.social.title': 'Socials',
        'footer.legal.link': 'Legal & Privacy',
        'footer.cookies.link': 'Cookies policy',
        'footer.cookies.message': 'This site only uses technical cookies necessary for its operation.',
        'footer.cookies.cta': 'Learn more',
        'footer.copyright': 'All rights reserved.',
        
        // Skills Page
        'skills.title': 'My Skills',
        'skills.subtitle': 'Discover my technical skills organized by categories, with detailed proficiency levels.',
        'skills.categories.frontend': 'Frontend',
        'skills.categories.backend': 'Backend',
        'skills.categories.tools': 'Tools & Technologies',
        'skills.level.beginner': 'Beginner',
        'skills.level.intermediate': 'Intermediate',
        'skills.level.advanced': 'Advanced',
        'skills.radial.title': 'Main Skills',
        
        // Services Page
        'services.title': 'My Services',
        'services.subtitle': 'Discover the services I offer to transform your ideas into digital reality.',
        'services.web.title': 'Web Development',
        'services.web.description': 'Creation of modern and performant websites with the latest technologies.',
        'services.web.feature1': 'Responsive and modern websites',
        'services.web.feature2': 'Interactive web applications',
        'services.web.feature3': 'Performance optimization',
        'services.web.feature4': 'API and services integration',
        'services.fullstack.title': 'Full Stack Development',
        'services.fullstack.description': 'Complete solutions from conception to production.',
        'services.fullstack.feature1': 'Robust backend architecture',
        'services.fullstack.feature2': 'Optimized databases',
        'services.fullstack.feature3': 'Secure RESTful APIs',
        'services.fullstack.feature4': 'Deployment and maintenance',
        'services.design.title': 'UI/UX Design',
        'services.design.description': 'Intuitive and aesthetic user interfaces for an optimal experience.',
        'services.design.feature1': 'Modern and clean design',
        'services.design.feature2': 'Optimized user experience',
        'services.design.feature3': 'Prototyping and mockups',
        'services.design.feature4': 'Responsive design',
        'services.price.note': 'On quote',
        'services.process.title': 'My Work Process',
        'services.process.step1.title': 'Analysis & Design',
        'services.process.step1.description': 'Analysis of your needs, definition of objectives and technical architecture design.',
        'services.process.step2.title': 'Development',
        'services.process.step2.description': 'Iterative development with regular checkpoints to validate progress.',
        'services.process.step3.title': 'Testing & Optimization',
        'services.process.step3.description': 'Thorough testing, performance optimization and bug fixes.',
        'services.process.step4.title': 'Deployment & Support',
        'services.process.step4.description': 'Production deployment and support to ensure proper functioning.',
        
        // Legal Page
        'legal.nav': 'Legal & Privacy',
        'legal.title': 'Legal Notice, GDPR & Cookies',
        'legal.subtitle': 'Transparency about how your data is used and how the FlixDev site works.',
        'legal.identity.title': 'Site Owner',
        'legal.identity.content': 'This site is a personal portfolio designed and developed by FlixDev.\n\nGoal: showcase my skills, projects and allow an initial professional contact.',
        'legal.hosting.title': 'Hosting',
        'legal.hosting.content': 'The site is hosted on a personal VPS. Technical logs may be kept for security and proper functioning purposes.',
        'legal.rgpd.title': 'Personal Data',
        'legal.rgpd.content': 'The contact form only collects the information necessary to answer you (name, email, subject, message).\n\nThis information is not sold and is only used to contact you back in a professional context. You can request deletion of your data by contacting me by email.',
        'legal.cookies.title': 'Cookies',
        'legal.cookies.content': 'The site only uses technical cookies necessary for its proper functioning (language preferences, dark/light theme). No advertising or invasive tracking cookies are used.\n\nIf audience measurement tools are added (such as Matomo, Plausible), they will be configured to respect your privacy.',
        'legal.analytics.title': 'Analytics & Audience Measurement',
        'legal.analytics.content': 'Any future visit statistics will only be used to improve the site (most viewed pages, device, language, etc.). No individual marketing profile is created.',
        
        // 404 Page
        '404.title': 'Page Not Found',
        '404.message': 'Oops! It seems the page you\'re looking for doesn\'t exist or has been moved.',
        '404.submessage': 'Maybe a syntax error slipped into the URL? 😉',
        '404.backHome': 'Back to home',
        '404.backPrevious': 'Previous page',
        '404.suggestions': 'You might be looking for:'
      }
    };
  }

  getCurrentLanguage(): Observable<string> {
    return this.currentLanguage$.asObservable();
  }

  getCurrentLanguageValue(): string {
    return this.currentLanguage$.value;
  }

  setLanguage(lang: string) {
    if (this.translations[lang]) {
      this.currentLanguage$.next(lang);
      localStorage.setItem('flixdev-lang', lang);
      document.documentElement.lang = lang;
    }
  }

  translate(key: string): string {
    const lang = this.currentLanguage$.value;
    const translation = this.translations[lang]?.[key];
    // S'assurer que la traduction est une string
    if (typeof translation === 'string') {
      return translation;
    }
    return key;
  }

  instant(key: string): string {
    return this.translate(key);
  }
}

