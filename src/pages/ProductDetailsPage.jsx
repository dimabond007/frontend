import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    async function getProductById() {
      const url = "http://localhost:3000/api/product/";
      const res = await fetch(url + id);
      const product = await res.json();
      setProduct(product);
    }
    getProductById();
  }, []);

  if (!product) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-2">
          Category: {product.category || "N/A"}
        </p>
        {product.price && (
          <p className="text-gray-900 font-bold text-2xl mb-4">
            ${product.price}
          </p>
        )}
        <p className="text-gray-600">
          {product.description || "No description available."}
        </p>
      </div>
    </div>
  );
}
