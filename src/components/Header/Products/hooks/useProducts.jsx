// hooks/useProducts.js
import { useEffect, useState } from "react";
import axios from "axios";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.warn("Token không tồn tại");
          return;
        }

        const res = await axios.get(
          "http://222.255.119.40:8080/adamstore/v1/products?pageNo=1&pageSize=100&sortBy=price-desc",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(res.data.result.items || []);
      } catch (error) {
        console.error("Lỗi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
};
