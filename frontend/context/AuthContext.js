import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load token and user on the client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token);
        axios
          .get("http://localhost:8080/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then((res) => setUser(res.data))
          .catch((err) => {
            console.error("Error fetching user:", err);
            localStorage.removeItem("token");
          });
      }
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.token);
        setAuthToken(res.data.token);
      }
      setUser(res.data.user);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed! Check your credentials.");
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", { name, email, password });
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.token);
        setAuthToken(res.data.token);
      }
      setUser(res.data.user);
      router.push("/dashboard");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed! Try again.");
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setUser(null);
    setAuthToken(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
