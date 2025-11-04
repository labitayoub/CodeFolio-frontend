import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink  } from "@apollo/client/link/error";

const httpLink = HttpLink({

    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
})


const authLink = new SetContextLink(() => {
  const token = localStorage.getItem('token');
  const headers = {};

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return { headers };
});

// Gestion des erreurs

const errorLink = ErrorLink (({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      console.error(`[GraphQL error]: ${err.message}`);
      if (err.message.includes("Unauthorized")) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// Création du client Apollo
const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;