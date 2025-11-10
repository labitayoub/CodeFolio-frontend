# 📚 DOCUMENTATION COMPLÈTE - CodeFolio

## 🎯 Vue d'ensemble du projet

**CodeFolio** est une application web full-stack permettant aux développeurs de créer et gérer leur portfolio professionnel en ligne. L'application offre un espace d'administration privé pour gérer le contenu et génère automatiquement un portfolio public accessible via un nom d'utilisateur unique.

---

## 🏗️ Architecture Technique

### Stack Technologique

**Frontend:**
- React 19 - Framework UI moderne
- Vite - Build tool ultra-rapide
- React Router v7 - Navigation SPA
- Apollo Client - Client GraphQL
- Tailwind CSS - Framework CSS utility-first
- Lucide React - Bibliothèque d'icônes
- React Hook Form - Gestion des formulaires
- React Hot Toast - Notifications

**Backend (API):**
- GraphQL - API sur http://localhost:4000/graphql
- JWT - Authentification par tokens
- MongoDB - Base de données

---

## 📂 Structure du Projet

```
src/
├── apollo/
│   └── client.js              # Configuration Apollo Client + gestion auth
├── components/
│   ├── Auth/                  # Login & Register
│   ├── layout/                # DashboardLayout & Sidebar
│   ├── portfolio/             # Composants portfolio public
│   ├── Projects/              # CRUD Projets
│   ├── Experience/            # CRUD Expériences
│   ├── Formation/             # CRUD Formations
│   ├── Skill/                 # CRUD Compétences
│   ├── Document/              # CRUD Documents
│   ├── Social/                # CRUD Réseaux sociaux
│   └── ui/                    # Composants réutilisables
├── graphql/
│   ├── mutations.js           # Toutes les mutations GraphQL
│   └── queries.js             # Toutes les queries GraphQL
├── middleware/
│   └── RouteGuard.jsx         # Protection des routes
├── pages/
│   ├── Dashboard.jsx          # Page d'accueil dashboard
│   ├── DashboardProjects.jsx  # Gestion projets
│   ├── DashboardExperiences.jsx
│   ├── DashboardFormations.jsx
│   ├── DashboardSkills.jsx
│   ├── DashboardDocuments.jsx
│   ├── DashboardSocial.jsx
│   ├── DashboardProfile.jsx
│   └── Portfolio.jsx          # Portfolio public
├── utils/
│   ├── auth.js                # Gestion JWT localStorage
│   └── errorHandler.js
└── App.jsx                    # Configuration routes
```

---

## 🔐 Système d'Authentification

### Workflow d'authentification

1. **Inscription** (`/register`)
   - L'utilisateur remplit : nom, prénom, username, email, password, bio
   - Mutation GraphQL `REGISTER_MUTATION`
   - Création du compte dans MongoDB
   - Redirection vers `/login`

2. **Connexion** (`/login`)
   - L'utilisateur entre email + password
   - Mutation GraphQL `LOGIN_MUTATION`
   - Backend retourne un JWT token
   - Token stocké dans `localStorage`
   - Redirection vers `/dashboard`

3. **Protection des routes**
   - `ProtectedRoute` : Vérifie la présence du token
   - Si non authentifié → redirection `/login`
   - `PublicRoute` : Si déjà authentifié → redirection `/dashboard`

4. **Déconnexion**
   - Suppression du token du localStorage
   - Redirection vers `/login`

### Configuration Apollo Client

```javascript
// apollo/client.js
- authLink : Injecte le JWT dans le header Authorization
- errorLink : Gère les erreurs (déconnexion auto si token invalide)
- httpLink : Connexion au backend GraphQL
```

---

## 🎨 Interface Utilisateur

### 1. Dashboard (Espace Privé)

**Layout:**
- **Sidebar** (gauche) : Navigation entre les sections
- **Header** (haut) : Titre + bouton déconnexion
- **Main** (centre) : Contenu dynamique

**Sections du Dashboard:**

#### a) Dashboard Principal (`/dashboard`)
- **Carte profil** : Affiche nom, prénom, username, email, bio
- **Statistiques** : 4 cards avec compteurs
  - Nombre de projets
  - Nombre d'expériences
  - Nombre de formations
  - Nombre de compétences
- **Actions rapides** : Liste des tâches à accomplir

#### b) Projets (`/dashboard/projects`)
**Fonctionnalités:**
- Affichage en grille (3 colonnes)
- Bouton "Ajouter un projet"
- Chaque carte projet contient :
  - Image du projet
  - Titre
  - Description
  - Lien GitHub
  - Lien démo
  - Boutons Modifier/Supprimer

**Workflow CRUD:**
1. **Créer** : Modal avec formulaire → Mutation `CREATE_PROJECT`
2. **Lire** : Query `GET_PROJECTS` au chargement
3. **Modifier** : Clic sur "Modifier" → Modal pré-rempli → Mutation `UPDATE_PROJECT`
4. **Supprimer** : Confirmation → Mutation `DELETE_PROJECT`

#### c) Expériences (`/dashboard/experiences`)
**Champs:**
- Entreprise (company)
- Poste (role)
- Date début (startDate)
- Date fin (endDate) - optionnel
- Description

**Affichage:** Grille 2 colonnes avec cards

#### d) Formations (`/dashboard/formations`)
**Champs:**
- Filière
- École
- Localisation
- Date début
- Date fin
- Description

**Affichage:** Grille 2 colonnes

#### e) Compétences (`/dashboard/skills`)
**Champs:**
- Nom de la compétence
- Catégorie (Frontend, Backend, Database, etc.)

**Affichage:** Groupées par catégorie avec badges

#### f) Documents (`/dashboard/documents`)
**Types de documents:**
- CV (PDF/lien Google Drive)
- Photo de profil
- Cover de profil

**Validation:** Un seul document de chaque type autorisé

**Workflow:**
- Upload via URL (Google Drive, Cloudinary, etc.)
- Stockage de l'URL dans MongoDB
- Affichage avec aperçu et lien externe

#### g) Réseaux Sociaux (`/dashboard/social`)
**Champs:**
- Nom du réseau (LinkedIn, GitHub, Twitter, etc.)
- URL du profil
- Icône

**Affichage:** Cards avec icônes et liens

#### h) Profil (`/dashboard/profile`)
**Modification du profil utilisateur:**
- Nom, prénom, username, email, bio
- Mutation `UPDATE_PROFILE`

---

### 2. Portfolio Public (`/:username`)

**Accès:** Accessible sans authentification via `https://app.com/johndoe`

**Structure:**

#### a) Header
- Photo de profil (ou emoji par défaut)
- Cover image (ou gradient par défaut)
- Nom complet
- Username
- Bio
- **Bouton "Voir mon CV"** : Ouvre le CV dans un nouvel onglet

#### b) Section Projets
- Grille de projets avec images
- Titre, description
- Liens GitHub et démo

#### c) Timeline Expériences
- Affichage chronologique
- Entreprise, poste, dates, description

#### d) Section Formations
- Liste des formations
- École, filière, dates

#### e) Section Compétences
- Groupées par catégorie
- Affichage en badges

#### f) Liens Sociaux
- Icônes cliquables vers les profils sociaux

#### g) Footer
- Copyright avec nom de l'utilisateur

**Query utilisée:** `GET_PORTFOLIO_BY_USERNAME`
- Récupère TOUTES les données d'un utilisateur en une seule requête
- Retourne : user, projects, experiences, formations, skills, documents, social

---

## 🔄 Workflows Détaillés

### Workflow 1 : Création d'un Projet

```
1. Utilisateur clique "Ajouter un projet"
2. Modal s'ouvre avec formulaire vide
3. Utilisateur remplit :
   - Titre
   - Description
   - URL GitHub
   - URL Démo
   - URL Image
4. Soumission du formulaire
5. Validation côté client (React Hook Form)
6. Mutation GraphQL CREATE_PROJECT
7. Variables envoyées : { titre, description, urlGit, urlDemo, image, userId }
8. Backend crée le projet dans MongoDB
9. Réponse GraphQL avec le projet créé
10. Refetch de GET_PROJECTS pour actualiser la liste
11. Toast de succès
12. Fermeture du modal
```

### Workflow 2 : Modification d'un Document

```
1. Utilisateur clique "Modifier" sur un document
2. État editingDocument est défini
3. Modal s'ouvre avec données pré-remplies
4. Utilisateur modifie l'URL
5. Soumission
6. Mutation UPDATE_DOCUMENT avec { id, input: { nom, urlStocket } }
7. Backend met à jour MongoDB
8. Refetch de GET_DOCUMENTS
9. Toast de succès
10. Réinitialisation de editingDocument
11. Fermeture du modal
```

### Workflow 3 : Suppression avec Gestion d'Erreur

```
1. Utilisateur clique "Supprimer"
2. Confirmation native du navigateur
3. Si confirmé :
   - Mutation DELETE_DOCUMENT
   - Try/catch pour gérer l'erreur de type Boolean
   - Si erreur contient "Boolean cannot represent" → ignorée
   - Sinon → affichage de l'erreur
4. Toast de succès
5. Refetch pour actualiser
```

### Workflow 4 : Consultation du Portfolio Public

```
1. Visiteur accède à /johndoe
2. useParams() extrait "johndoe"
3. Query GET_PORTFOLIO_BY_USERNAME avec variable { username: "johndoe" }
4. Backend recherche l'utilisateur par username
5. Si trouvé :
   - Retourne toutes les données (user, projects, etc.)
   - Affichage du portfolio complet
6. Si non trouvé :
   - Message "Portfolio non trouvé"
```

---

## 🎯 Fonctionnalités Clés

### 1. Gestion Complète du Portfolio
- ✅ CRUD complet pour 6 entités (Projets, Expériences, Formations, Compétences, Documents, Réseaux sociaux)
- ✅ Interface intuitive avec modals
- ✅ Validation des formulaires
- ✅ Notifications toast pour chaque action

### 2. Authentification Sécurisée
- ✅ JWT tokens
- ✅ Protection des routes
- ✅ Gestion automatique des erreurs d'authentification
- ✅ Déconnexion automatique si token expiré

### 3. Portfolio Public Dynamique
- ✅ URL personnalisée par username
- ✅ Génération automatique à partir des données
- ✅ Design responsive
- ✅ Bouton CV avec ouverture dans nouvel onglet

### 4. Gestion des Documents
- ✅ Support des URLs externes (Google Drive, etc.)
- ✅ Validation : 1 seul document par type
- ✅ Affichage conditionnel (photo, cover, CV)

### 5. Expérience Utilisateur
- ✅ Interface moderne et épurée
- ✅ Feedback visuel immédiat (toasts)
- ✅ Confirmations avant suppression
- ✅ États de chargement (spinners)
- ✅ Messages d'état vide

---

## 🔧 Configuration et Déploiement

### Variables d'Environnement
```
VITE_GRAPHQL_URI=http://localhost:4000/graphql
```

### Commandes
```bash
npm install          # Installation des dépendances
npm run dev          # Lancement en développement (port 5173)
npm run build        # Build de production
npm run preview      # Prévisualisation du build
```

### Prérequis
- Node.js 18+
- Backend GraphQL sur port 4000
- MongoDB configuré

---

## 📊 Schéma de Données

### User
```
id, nom, prenom, username, email, password (hashé), bio
```

### Project
```
id, titre, description, urlGit, urlDemo, image, userId
```

### Experience
```
id, company, role, startDate, endDate, description, userId
```

### Formation
```
id, filiere, ecole, localisation, dateDebut, dateFinal, description, userId
```

### Skill
```
id, name, categorie, userId
```

### Document
```
_id, nom, urlStocket, userId
```

### Social
```
id, nom, liensSociaux, icon, userId
```

---

## 🎨 Design System

### Couleurs
- Primaire : Blue-600 (#2563eb)
- Succès : Green-500
- Danger : Red-600
- Neutre : Gray-50 à Gray-900

### Composants UI Réutilisables
- **Button** : Variants (primary, outline, danger)
- **Card** : Container avec padding et shadow
- **Input** : Champs de formulaire stylisés
- **Modal** : Overlay avec animation
- **Spinner** : Indicateur de chargement

### Responsive
- Mobile : 1 colonne
- Tablet : 2 colonnes
- Desktop : 3-4 colonnes

---

## 🚀 Points Forts du Projet

1. **Architecture Modulaire** : Composants réutilisables et séparation des responsabilités
2. **GraphQL** : Une seule requête pour le portfolio complet
3. **Sécurité** : JWT + protection des routes + validation
4. **UX Optimale** : Feedback immédiat, états de chargement, confirmations
5. **Scalabilité** : Facile d'ajouter de nouvelles entités
6. **Performance** : Cache Apollo + Vite build optimisé

---

## 🐛 Gestion des Erreurs

### Erreurs Gérées
1. **Authentification expirée** : Déconnexion auto + redirection
2. **Erreurs GraphQL** : Affichage dans toast
3. **Erreurs réseau** : Message d'erreur
4. **Validation formulaire** : Messages inline
5. **Erreur de type Boolean** : Ignorée pour DELETE_DOCUMENT

### Logs
- Console.error pour les erreurs GraphQL
- Toast pour les erreurs utilisateur

---

## 📈 Améliorations Futures Possibles

1. Upload direct de fichiers (au lieu d'URLs)
2. Éditeur WYSIWYG pour les descriptions
3. Thèmes personnalisables pour le portfolio
4. Analytics du portfolio (vues, clics)
5. Export PDF du portfolio
6. Partage sur réseaux sociaux
7. Mode sombre
8. Internationalisation (i18n)

---

## 🎓 Présentation du Projet

### Pitch Elevator (30 secondes)
"CodeFolio est une plateforme SaaS permettant aux développeurs de créer leur portfolio professionnel en quelques minutes. Avec un dashboard intuitif, ils gèrent leurs projets, expériences et compétences, et obtiennent instantanément un portfolio public accessible via leur nom d'utilisateur. Architecture moderne React + GraphQL, authentification JWT, et design responsive."

### Démonstration Recommandée
1. Inscription d'un nouvel utilisateur
2. Ajout de 2-3 projets avec images
3. Ajout d'expériences professionnelles
4. Upload de documents (CV, photo)
5. Configuration des réseaux sociaux
6. Consultation du portfolio public via /:username
7. Modification d'un projet
8. Suppression d'une compétence

### Points à Mettre en Avant
- ✅ CRUD complet et fonctionnel
- ✅ Authentification sécurisée
- ✅ Portfolio public généré automatiquement
- ✅ Interface moderne et intuitive
- ✅ Architecture scalable
- ✅ Gestion d'erreurs robuste

---

**Développé avec React 19, GraphQL, et Tailwind CSS**
