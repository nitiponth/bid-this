import AuthLayout from "../components/auth/auth";
import { LayoutContextProvider } from "../store/layout-context";
import { AuthContextProvider } from "../store/auth-context";
import { ApolloProvider } from "@apollo/client";

import client from "../apollo-client";

import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <LayoutContextProvider>
          <Component {...pageProps} />
          <AuthLayout />
        </LayoutContextProvider>
      </AuthContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
