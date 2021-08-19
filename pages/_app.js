import AuthLayout from "../components/auth/auth";
import { LayoutContextProvider } from "../store/layout-context";
import { AuthLayoutProvider } from "../store/auth-context";
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthLayoutProvider>
      <LayoutContextProvider>
        <Component {...pageProps} />
        <AuthLayout />
      </LayoutContextProvider>
    </AuthLayoutProvider>
  );
}

export default MyApp;
