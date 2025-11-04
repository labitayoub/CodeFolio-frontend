export const getErrorMessage = (error) => {
  if (!error) return 'Une erreur inconnue est survenue';
  
  // Erreur GraphQL
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return error.graphQLErrors[0].message;
  }
  
  // Erreur réseau
  if (error.networkError) {
    return 'Erreur de connexion au serveur. Veuillez réessayer.';
  }
  
  // Erreur générique
  return error.message || 'Une erreur est survenue';
};

export const isAuthError = (error) => {
  const message = getErrorMessage(error).toLowerCase();
  return message.includes('unauthorized');
};
