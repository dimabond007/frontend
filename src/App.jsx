import React from "react";
import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function TopNavLink(props) {
  const { href, children } = props;
  return (
    <NavLink
      className="text-gray-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      style={({ isActive }) => {
        return isActive ? { color: "salmon" } : {};
      }}
      to={href}
    >
      {children}
    </NavLink>
  );
}

function App() {
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
          <li>
            <TopNavLink href="/">Home</TopNavLink>
          </li>
          <li>
            <TopNavLink href="/product">Products</TopNavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product">
          <Route index element={<ProductPage />} />
          <Route path=":id" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
