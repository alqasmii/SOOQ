import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext"; // ✅ Use "../"
import Navbar from "../Navbar";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar /> {/* ✅ Navbar is now global */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}
