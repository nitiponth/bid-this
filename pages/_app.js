import AuthLayout from "../components/auth/auth";
import { LayoutContextProvider } from "../store/layout-context";
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <LayoutContextProvider>
      <Component {...pageProps} />
      <AuthLayout />
    </LayoutContextProvider>
  );
}

export default MyApp;
