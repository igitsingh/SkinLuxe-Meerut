"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/admin/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("admin_token", response.data.token);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-dark via-dark to-primary/20 p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 border-l border-b border-white/10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 border-r border-t border-white/10"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <img
              src="/skinluxe-logo-white.png"
              alt="SkinLuxe Aesthetics & Academy"
              className="h-24 w-auto"
            />
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-serif text-white mb-6 leading-tight">
            Medical Precision<br />
            <span className="italic font-light text-secondary">Meets</span> Luxury.
          </h2>
          <p className="text-white/70 text-lg font-light leading-relaxed max-w-md">
            Manage your clinic with elegance. Access appointments, treatments, and client data from your centralized dashboard.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-white/40 text-sm">
            © 2026 SkinLuxe. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-light">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <img
                src="/skinluxe-logo-dark.png"
                alt="SkinLuxe Aesthetics & Academy"
                className="h-24 w-auto"
              />
            </div>
            <p className="text-sm text-gray-600 tracking-wider uppercase">Admin Panel</p>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-dark mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2 tracking-wide"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                placeholder="admin@skinluxe.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2 tracking-wide"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Quick Login Button for Development */}
            <button
              type="button"
              onClick={() => {
                setEmail("admin@skinluxe.com");
                setPassword("adminpassword");
                // Auto-submit after a brief delay to show the filled values
                setTimeout(() => {
                  const form = document.querySelector('form');
                  if (form) {
                    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                  }
                }, 100);
              }}
              className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-dark font-medium py-3 px-6 rounded-lg transition-all shadow-sm hover:shadow-md border border-secondary/20"
            >
              ⚡ Quick Login (Dev)
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-8 border-t border-secondary">
            <p className="text-xs text-gray-500 text-center">
              Secure admin access for authorized personnel only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
