"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import { setSignIn } from "../../lib/redux/features/userSlice";
import { useAppDispatch } from "../../lib/redux/hooks";

const ADMIN_EMAIL = "admin@gmail.com";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Sending login request...");
      const res = await api.post("/auth/login", { email, password });
      
      console.log("Login response:", res.data);
      const user = res.data;
  
      if (!user || user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        console.log("Access denied - not admin");
        alert("AKSES DILARANG, HANYA ADMIN");
        return;
      }
  
      console.log("Login successful, saving user:", user);
      // Simpan ke localStorage dan Redux
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setSignIn(user));
  
      console.log("Redirecting to dashboard...");
      router.push("/dashboard/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login gagal. Cek kembali email dan password.");
    }
  };

  // Restore session if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setSignIn(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen bg-blue-700">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={login}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Page;
