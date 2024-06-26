import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const URL = "http://localhost:3000/api/product";
export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams([]);

  // useEffect(() => {
  //   async function getProducts() {
  //     const res = await fetch(url);
  //     const products = await res.json();
  //     setProducts(products);
  //   }
  //   getProducts();
  // }, []);

  useEffect(() => {
    async function getProducts() {
      const page = searchParams.get("page");
      if (page < 1) searchParams.set("page", 1);
      setSearchParams(searchParams);

      const options = {
        params: {
          name: searchParams.get("name"),
          brand: searchParams.get("brand"),
          // manufacturer: searchParams.get("manufacturer"),
          minPrice: searchParams.get("minPrice"),
          maxPrice: searchParams.get("maxPrice"),
          page: page,
        },
      };
      const response = await axios.get(URL, options);
      setProducts(response.data);
    }
    getProducts();
  }, [searchParams]);

  function handlePagination(ev) {
    const value = ev.target.value;
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }
  function handleFilterChange(ev) {
    const inputName = ev.target.name;

    if (ev.target.type === "checkbox") {
      const checked = ev.target.checked;
      searchParams.set(inputName, checked);
    } else {
      const value = ev.target.value;
      searchParams.set(inputName, value);
    }
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <div>
          <div>
            <label htmlFor="isSomthing">Page: </label>
            <input
              className="outline outline-sky-500"
              min={1}
              id="page"
              name="page"
              type="number"
              value={searchParams.get("page") || "1"}
              onChange={handlePagination}
            />
          </div>
          {/* <label htmlFor="isSomthing">isSomthing: </label>
          <input
            className="outline outline-sky-500"
            id="isSomthing"
            name="isSomthing"
            type="checkbox"
            checked={searchParams.get("isSomthing") === "true" || false}
            onChange={handleFilterChange}
          /> */}
        </div>

        <div>
          <label htmlFor="name">Name: </label>
          <input
            className="outline outline-sky-500"
            id="name"
            name="name"
            type="text"
            value={searchParams.get("name") || ""}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="brand">Brand: </label>
          <input
            className="outline outline-sky-500"
            id="brand"
            name="brand"
            type="text"
            value={searchParams.get("brand") || ""}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="manufacturer">Minimum Price: </label>
          <input
            className="outline outline-sky-500"
            id="minPrice"
            type="number"
            name="minPrice"
            value={searchParams.get("minPrice") || 0}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="manufacturer">Maximum Price: </label>
          <input
            className="outline outline-sky-500"
            id="maxPrice"
            type="number"
            name="maxPrice"
            value={searchParams.get("maxPrice") || 100}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          return (
            <div key={product._id} className="bg-white  rounded-lg shadow-md">
              <img
                src={
                  product.image
                    ? product.image
                    : "https://dummyimage.com/720x400"
                }
                className="w-full"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-700">Category: {product.category}</p>
                <p className="text-gray-900 font-bold">${product.price}</p>
                <a href={`/product/${product._id}`}>View Details</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
