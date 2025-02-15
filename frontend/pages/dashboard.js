import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Link from "next/link";

export default function Dashboard() {
  const { user, logout, loading } = useContext(AuthContext);
  const [store, setStore] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/auth/login"; // ✅ Redirect without returning JSX
    } else if (user) {
      axios.get(`http://localhost:8080/api/stores/user/${user.id}`)
        .then((res) => setStore(res.data))
        .catch((err) => console.error("Error fetching store:", err));
    }
  }, [user, loading]);
  
  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold">Welcome, {user?.name}!</h2>
        <p className="text-gray-600">{user?.email}</p>

        <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {store ? (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Your Store</h2>
          <p className="text-lg">{store.name}</p>
          <Link href={`/store/${store.id}`} className="text-blue-500">View Store</Link>
        </div>
      ) : (
        <div className="mt-6">
          <p>You don’t have a store yet.</p>
          <Link href="/dashboard/create-store" className="bg-green-500 text-white px-4 py-2 rounded">
            Create Store
          </Link>
        </div>
      )}
    </div>
  );
}
