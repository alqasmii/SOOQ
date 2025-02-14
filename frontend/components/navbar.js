import { useContext } from "react";
import AuthContext from "../context/AuthContext"; // ✅ Use correct path

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Sooq App</h1>

      <div>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded-md">Logout</button>
        ) : (
          <div className="flex gap-4">
            <a href="/auth/login" className="bg-blue-500 px-4 py-2 rounded-md">Login</a>
            <a href="/auth/register" className="bg-green-500 px-4 py-2 rounded-md">Register</a>
          </div>
        )}
      </div>
    </nav>
  );
}
