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

export const  CREATE_SKILL = gql`

mutation CreateSkill($name: String!, $categorie: String){
  CreateSkill(name: $name, categorie: $categorie){
    id
    name
    categorie
  }
}
`;
export const UPDATE_SKILL = gql`
mutation UpdateSkill($id: ID!, $name: String, $categorie: String){
  UpdateSkill(id: $id, name: $name, categorie: $categorie){
    id
    name
    categorie
  }
}
`;

export const DELETE_SKILL = gql`
mutation DeleteSkill($id: ID!){
  DeleteSkill(id: $id){
    id
  }
}
`;