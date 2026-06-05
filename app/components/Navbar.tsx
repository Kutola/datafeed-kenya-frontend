"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }); // no [] — runs after every render

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    router.push("/login");
  };

  return (
    <nav className="bg-[var(--surface)] border-b border-[var(--border)] px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/3q-xM2Md_400x400.jpg"
            alt="Newsfeed Kenya"
            width={44}
            height={44}
            className="rounded-3xl shadow-lg"
          />
          <div className="leading-none">
            <span className="font-black text-3xl tracking-[-2px]">Data</span>
            <span className="font-black text-3xl tracking-[-2px] text-green-500">Feed</span>
            <span className="font-black text-3xl tracking-[-2px] text-red-500">Kenya</span>
          </div>
        </Link>

        <div className="flex items-center gap-8 text-sm">
          <Link
            href="/"
            style={{ color: "var(--text-secondary)" }}
            className="hover:text-white transition-colors font-medium">
            Home
          </Link>
          <Link
            href="/dashboard"
            style={{ color: "var(--text-secondary)" }}
            className="hover:text-white transition-colors font-medium">
            Dashboard
          </Link>

          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full font-semibold transition-colors text-white">
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              style={{ backgroundColor: "var(--accent)" }}
              className="px-6 py-2.5 rounded-full font-semibold transition-colors text-white hover:opacity-90">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}