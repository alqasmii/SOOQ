import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Store, ShoppingCart, BarChart3 } from "lucide-react";

export default function Dashboard() {
<<<<<<< HEAD
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
=======
  const [darkMode, setDarkMode] = useState(false);
>>>>>>> parent of 37abadc (v0.4)

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-6" : "bg-gray-100 text-black min-h-screen p-6"}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sooq App Dashboard</h1>
        <Button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 flex items-center space-x-4">
          <Store className="w-10 h-10 text-blue-500" />
          <CardContent>
            <h2 className="text-lg font-semibold">Manage Store</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Customize your store settings and branding.</p>
          </CardContent>
        </Card>
        
        <Card className="p-4 flex items-center space-x-4">
          <ShoppingCart className="w-10 h-10 text-green-500" />
          <CardContent>
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Track and manage customer orders easily.</p>
          </CardContent>
        </Card>
        
        <Card className="p-4 flex items-center space-x-4">
          <BarChart3 className="w-10 h-10 text-yellow-500" />
          <CardContent>
            <h2 className="text-lg font-semibold">Analytics</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">View insights on sales and customer behavior.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
