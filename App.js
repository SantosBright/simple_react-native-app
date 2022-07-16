import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Main from "./screens/Main";

export default function App() {
  const client = new ApolloClient({
    uri: "https://api.graphql.jobs/",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}
