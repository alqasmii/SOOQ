import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Button } from "../components/ui/button"; // Updated path

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded-md mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full mt-4 bg-blue-500 text-white">
          Login
        </Button>
      </form>
    </div>
  );
}
