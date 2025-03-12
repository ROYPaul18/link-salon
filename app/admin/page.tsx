"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../ui/header";
import Footer from "../ui/footer";
import Image from "next/image";
// 

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      sessionStorage.setItem("admin-auth", "true");
      router.push("/dashboard");
    } else {
      alert("Email ou mot de passe incorrect !");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="fixed inset-0">
        <Image
          src="/img/bg.jpeg"
          alt="Background image"
          fill
          priority
          className="object-fit fixed top-0 left-0 z-0"
        />
      </div>
      <div className="flex-grow flex items-center justify-center py-8 z-10">
        <div className="w-full max-w-md px-4">
          <div className="bg-gold p-8 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mt-4 text-redlink">
                Connexion Admin
              </h1>
            </div>
            
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full mb-4 bg-gold border-redlink text-redlink"
                required
              />
              
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full mb-4 bg-gold border-redlink text-redlink"
                required
              />
              
              <button
                type="submit"
                className="w-full p-2 bg-redlink text-white font-bold rounded hover:bg-red-700"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}