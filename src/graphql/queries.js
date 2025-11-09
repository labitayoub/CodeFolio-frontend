import { gql } from '@apollo/client';
export const GET_CURRENT_USER = gql`
  query GetProfil {
    getProfil {
      id
      nom
      prenom
      username
      email
      bio
    }
  }
`;

// Query pour récupérer tous les projets
export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      titre
      description
      urlGit
      urlDemo
      image
    }
  }
`;

// Query pour récupérer toutes les compétences
export const GET_SKILLS = gql`
  query GetCompetences {
    getCompetences {
      id
      name
      categorie
    }
  }
`;


// Query pour récupérer les expériences
export const GET_EXPERIENCES = gql`
  query GetExperiences {
    getExperiences {
      id
      company
      role
      startDate
      endDate
      description
    }
  }
`;

export const GET_DOCUMENTS = gql`
  query GetDocuments {
    documents {
      _id
      nom
      urlStocket
    }
  }
`;

// Query pour récupérer les formations
export const GET_FORMATIONS = gql`
  query GetFormations {
    formations {
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
export const GET_SOCIAL = gql`
  query GetSocial {
    resieauxSociauxs {
      id
      nom
      liensSociaux
      icon
    }
  }
`;

// Query pour portfolio public (visiteur)
export const GET_PORTFOLIO_BY_USERNAME = gql`
  query GetPortfolioByUsername($username: String!) {
    getPortfolioByUsername(username: $username) {
      user {
        id
        nom
        prenom
        username
        bio
      }
      projects {
        id
        titre
        description
        urlGit
        urlDemo
        image
      }
      experiences {
        id
        company
        role
        startDate
        endDate
        description
      }
      formations {
        id
        filiere
        ecole
        localisation
        dateDebut
        dateFinal
        description
      }
      skills {
        id
        name
        categorie
      }
      documents {
        _id
        nom
        urlStocket
      }
      social {
        id
        nom
        liensSociaux
        icon
      }
    }
  }
`;
