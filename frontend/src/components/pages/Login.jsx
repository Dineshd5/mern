import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Inside Login.jsx

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // inside your Login component
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      const token = res.data.token;

      if (token) {
        // Store token in localStorage (or use secure cookie later)
        localStorage.setItem("token", token);

        // Optional: show success or toast here
        alert("Login successful!");

        // Redirect to dashboard
        nav("/dashboard");
      } else {
        alert("Login failed: No token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm p-8 bg-white shadow-xl rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Log In
          </button>

          {/* Optional Links */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
