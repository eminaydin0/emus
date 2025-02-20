// src/App.js

import { Routes, Route } from "react-router-dom";

import Login from './components/Login';
import Signup from "./components/SignUp";
import Home from './Home';

export default function App() {
  return (
    <Routes>
      {/* Ana Sayfa */}
      <Route path="/" element={<Home />} />

      {/* Giriş Yap */}
      <Route path="/login" element={<Login />} />

      {/* Kaydol */}
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
