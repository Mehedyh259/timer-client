"use client";
import { useRouter } from "next/navigation";
import SocialLogin from "./SocialLogin";
import { doCredentialLogin } from "@/app/actions";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const formData = new FormData(event.currentTarget);
      console.log(formData);
      const res = await doCredentialLogin(formData);
      if (!!res.error) {
        setError(res.error.message);
      } else {
        router.push("/home");
      }
    } catch (error) {
      setError("check your credentials");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
            Login
          </h1>
          {error && <p className="bg-gray-300 text-red-500 p-1 mb-3 rounded">{error}</p>}

          {/* <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form> */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
