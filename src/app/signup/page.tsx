"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";
import { Toaster, toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success:", response.data);
      router.push("/login");
      toast.success("Signup successful! Please login.");
    } catch (error: any) {
      console.log("Signup error:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-gray-100 px-4">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 10000,
          style: {
            background: "#1f1f1f",
            color: "#fff",
            border: "1px solid #333",
          },
        }}
      />

      <div className="w-full max-w-md bg-[#111111] border border-gray-800 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.8)] p-8 backdrop-blur-sm">
        <h1 className="text-4xl font-semibold text-center text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500 mb-8">
          {loading ? "Processing..." : "Create Account"}
        </h1>

        {/* Username */}
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-400 mb-1"
        >
          Username
        </label>
        <input
          className="w-full p-3 mb-5 rounded-lg bg-[#1a1a1a] border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
        />

        {/* Email */}
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-400 mb-1"
        >
          Email
        </label>
        <input
          className="w-full p-3 mb-5 rounded-lg bg-[#1a1a1a] border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />

        {/* Password */}
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-400 mb-1"
        >
          Password
        </label>
        <input
          className="w-full p-3 mb-7 rounded-lg bg-[#1a1a1a] border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />

        {/* Button */}
        <button
          onClick={onSignup}
          className="w-full py-3 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-md hover:shadow-[0_0_10px_rgba(59,130,246,0.4)] focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          {buttonDisabled ? "Fill To Sign Up" : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 transition-all"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
