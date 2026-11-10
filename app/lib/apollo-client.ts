import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({ uri: "http://elovate-immobilien.local/graphql" }),
  cache: new InMemoryCache(),
});
