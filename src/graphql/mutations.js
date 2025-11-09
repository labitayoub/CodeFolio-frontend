import { gql } from '@apollo/client';

// Mutation pour se connecter
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

// Mutation pour s'inscrire
export const REGISTER_MUTATION = gql`
  mutation Register($nom: String!, $prenom: String!, $username: String!, $email: String!, $password: String!, $bio: String) {
    register(nom: $nom, prenom: $prenom, username: $username, email: $email, password: $password, bio: $bio) {
      id
      nom
      prenom
      username
      email
      bio
    }
  }
`;


// Mutation pour se déconnecter
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;
// Projects
export const CREATE_PROJECT = gql`
  mutation CreateProject($titre: String!, $description: String!, $urlGit: String!, $urlDemo: String!, $image: String!, $userId: ID!) {
    createProject(titre: $titre, description: $description, urlGit: $urlGit, urlDemo: $urlDemo, image: $image, userId: $userId) {
      id
      titre
      description
      urlGit
      urlDemo
      image
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $titre: String, $description: String, $urlGit: String, $urlDemo: String, $image: String) {
    updateProject(id: $id, titre: $titre, description: $description, urlGit: $urlGit, urlDemo: $urlDemo, image: $image) {
      id
      titre
      description
      urlGit
      urlDemo
      image
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;
// Experiences
export const CREATE_EXPERIENCE = gql`
  mutation CreateExperience($company: String!, $role: String!, $startDate: String!, $endDate: String, $description: String) {
    createExperience(company: $company, role: $role, startDate: $startDate, endDate: $endDate, description: $description) {
      id
      company
      role
      startDate
      endDate
      description
    }
  }
`;

export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($id: ID!, $company: String, $role: String, $startDate: String, $endDate: String, $description: String) {
    updateExperience(id: $id, company: $company, role: $role, startDate: $startDate, endDate: $endDate, description: $description) {
      id
      company
      role
      startDate
      endDate
      description
    }
  }
`;

export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id) {
      id
    }
  }
`;
// Formations
export const CREATE_FORMATION = gql`
  mutation CreateFormation($filiere: String!, $ecole: String!, $localisation: String!, $dateDebut: String!, $dateFinal: String!, $description: String!, $userId: ID!) {
    createFormation(filiere: $filiere, ecole: $ecole, localisation: $localisation, dateDebut: $dateDebut, dateFinal: $dateFinal, description: $description, userId: $userId) {
      id
      filiere
      ecole
      localisation
      dateDebut
      dateFinal
      description
    }
  }
`;

export const UPDATE_FORMATION = gql`
  mutation UpdateFormation($id: ID!, $filiere: String, $ecole: String, $localisation: String, $dateDebut: String, $dateFinal: String, $description: String) {
    updateFormation(id: $id, filiere: $filiere, ecole: $ecole, localisation: $localisation, dateDebut: $dateDebut, dateFinal: $dateFinal, description: $description) {
      id
      filiere
      ecole
      localisation
      dateDebut
      dateFinal
      description
    }
  }
`;

export const DELETE_FORMATION = gql`
  mutation DeleteFormation($id: ID!) {
    deleteFormation(id: $id) {
      id
    }
  }
`;

// Skills
export const CREATE_SKILL = gql`
  mutation createCompetence($name: String!, $categorie: String) {
    createCompetence(name: $name, categorie: $categorie) {
      id
      name
      categorie
    }
  }
`;

export const UPDATE_SKILL = gql`
  mutation updateCompetence($id: ID!, $name: String, $categorie: String) {
    updateCompetence(id: $id, name: $name, categorie: $categorie) {
      id
      name
      categorie
    }
  }
`;

export const DELETE_SKILL = gql`
  mutation deleteCompetence($id: ID!) {
    deleteCompetence(id: $id) {
      id
    }
  }
`;

// Documents
export const CREATE_DOCUMENT = gql`
  mutation CreateDocument($input: DocumentInput!) {
    createDocument(input: $input) {
      _id
      nom
      urlStocket
    }
  }
`;

export const UPDATE_DOCUMENT = gql`
  mutation UpdateDocument($id: ID!, $input: DocumentInput!) {
    updateDocument(id: $id, input: $input) {
      _id
      nom
      urlStocket
    }
  }
`;

export const DELETE_DOCUMENT = gql`
  mutation DeleteDocument($id: ID!) {
    deleteDocument(id: $id)
  }
`;
// Réseaux Sociaux
export const CREATE_SOCIAL = gql`
  mutation CreateSocial($nom: String!, $liensSociaux: String!, $icon: String!, $userId: ID!) {
    createResieauxSociaux(nom: $nom, liensSociaux: $liensSociaux, icon: $icon, userId: $userId) {
      id
      nom
      liensSociaux
      icon
    }
  }
`;

export const UPDATE_SOCIAL = gql`
  mutation UpdateSocial($id: ID!, $nom: String, $liensSociaux: String, $icon: String) {
    updateResieauxSociaux(id: $id, nom: $nom, liensSociaux: $liensSociaux, icon: $icon) {
      id
      nom
      liensSociaux
      icon
    }
  }
`;

export const DELETE_SOCIAL = gql`
  mutation DeleteSocial($id: ID!) {
    deleteResieauxSociaux(id: $id) {
      id
    }
  }
`;
// Profile
export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($nom: String, $prenom: String, $username: String, $email: String, $bio: String) {
    updateProfil(nom: $nom, prenom: $prenom, username: $username, email: $email, bio: $bio) {
      id
      nom
      prenom
      username
      email
      bio
    }
  }
`;
