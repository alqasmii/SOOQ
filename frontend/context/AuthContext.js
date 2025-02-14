import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8080/api/auth/me", { headers: { Authorization: token } })
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.error("Error fetching user:", err);
          localStorage.removeItem("token");
        });
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      router.push("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed! Check your credentials.");
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      router.push("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed! Try again.");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/auth/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
