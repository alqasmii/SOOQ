import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "../../components/ui/button";

export default function Checkout() {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:8080/api/products/${productId}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [productId]);

  const handleOrder = async () => {
    try {
      const order = {
        customerName,
        storeId: product.storeId,
        products: [product.id],
        total: product.price,
        paymentMethod: "Cash",
        phoneNumber
      };
      await axios.post("http://localhost:8080/api/orders", order);
      alert("Order placed! The store will contact you.");
      router.push(`/store/${product.storeId}`);
    } catch (err) {
      console.error("Order creation failed:", err.response?.data || err);
      alert("Order failed! Please try again.");
    }
  };

  if (!product) return <p className="text-center text-gray-500">Loading product...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="text-gray-600">Order {product.name}</p>
      <div className="mt-4">
        <input
          className="border p-2 w-full rounded-md"
          type="text"
          placeholder="Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <input
          className="border p-2 w-full rounded-md"
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <Button onClick={handleOrder} className="w-full mt-4 bg-blue-500 text-white">
        Place Order
      </Button>
    </div>
  );
}
