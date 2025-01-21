import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      {/* Define routes for Login, Products, and Cart later */}
    </Routes>
  );
}
