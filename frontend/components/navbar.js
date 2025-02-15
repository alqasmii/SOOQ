import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">Sooq App</h1>
      {user ? (
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded-md">
          Logout
        </button>
      ) : (
        <a href="/auth/login" className="bg-blue-500 px-4 py-2 rounded-md">Login</a>
      )}
    </nav>
  );
}
