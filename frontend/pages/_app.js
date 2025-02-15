import "../styles/globals.css";
<<<<<<< HEAD
import { AuthProvider } from "../context/AuthContext"; // ✅ Use "../"
import Navbar from "../components/Navbar";
=======
import { AuthProvider } from "@/context/AuthContext"; // ✅ Import AuthProvider
>>>>>>> parent of 37abadc (v0.4)

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
