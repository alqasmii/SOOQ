import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";

export default function CreateStore() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await axios.post("http://localhost:8080/api/stores", {

        name,
        ownerId: user.id,
      });
      router.push("/dashboard"); // Redirect to dashboard after creating store
    } catch (err) {
      console.error("Error creating store:", err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold">Create Your Store</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Store Name"
          className="border p-2 w-full rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="w-full mt-4 bg-green-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Creating..." : "Create Store"}
        </button>
      </form>
    </div>
  );
}
