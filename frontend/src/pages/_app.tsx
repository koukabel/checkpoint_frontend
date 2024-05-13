import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import createApolloClient from "@/graphql/client";
import dynamic from "next/dynamic";

function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
