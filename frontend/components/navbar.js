import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Sooq App
      </Link>
      <div>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded-md">
            Logout
          </button>
        ) : (
          <div className="flex gap-4">
            <Link href="/auth/login" className="bg-blue-500 px-4 py-2 rounded-md">
              Login
            </Link>
            <Link href="/auth/register" className="bg-green-500 px-4 py-2 rounded-md">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
