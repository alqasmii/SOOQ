import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <Link href="/">
        <a className="text-xl font-bold">Sooq App</a>
      </Link>
      <div>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded-md">
            Logout
          </button>
        ) : (
          <div className="flex gap-4">
            <Link href="/auth/login">
              <a className="bg-blue-500 px-4 py-2 rounded-md">Login</a>
            </Link>
            <Link href="/auth/register">
              <a className="bg-green-500 px-4 py-2 rounded-md">Register</a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
