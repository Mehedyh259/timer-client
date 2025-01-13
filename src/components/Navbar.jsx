"use client";

import { useEffect, useState } from "react";
import Logout from "./Logout";
import { doLogout } from "@/app/actions";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkSession = async () => {
    const user = await fetch("/api/auth/session").then((res) => res.json());
    setIsLoggedIn(!!user?.user);
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <nav className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">Productive App</div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/statistics"
                className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition"
              >
                Statistics
              </Link>
              {/* <Logout /> */}
              <button
                onClick={async () => {
                  await doLogout()
                  setIsLoggedIn(false);
                }}
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => alert("Redirect to Login")}
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => alert("Redirect to Register")}
                className="bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-700 transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
