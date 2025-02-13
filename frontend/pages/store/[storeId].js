import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { ShoppingCart, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Storefront() {
  const router = useRouter();
  const { storeId } = router.query;
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (storeId) {
      axios.get(`http://localhost:8080/api/stores/${storeId}`)
        .then((res) => setStore(res.data))
        .catch((err) => console.error("Error fetching store:", err));

      axios.get(`http://localhost:8080/api/products/store/${storeId}`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.error("Error fetching products:", err));

      setLoading(false);
    }
  }, [storeId]);

  if (loading) return <p className="text-center text-gray-500">Loading store...</p>;
  if (!store) return <p className="text-center text-red-500">Store not found!</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{store.name}</h1>
      <p className="text-gray-600">Welcome to {store.name}! Browse our products below.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          products.map((product) => (
            <Card key={product.id} className="p-4">
              <div className="relative w-full h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <CardContent>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500">{product.description}</p>
                <p className="text-lg font-bold">{product.price} OMR</p>
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => router.push(`/checkout/${product.id}`)} className="flex-1">
                    <ShoppingCart className="w-5 h-5 mr-2" /> Buy Now
                  </Button>
                  <Button variant="outline">
                    <PhoneCall className="w-5 h-5 mr-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
