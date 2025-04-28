import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TransitionOverlay from "../components/TransitionOverlay";
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState("");
  const [showTransition, setShowTransition] = useState(false);
  const [transitionMsg, setTransitionMsg] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/login", formData);
      setShowTransition(true);
      setTimeout(() => {
        login({ username: formData.email });
        setShowTransition(false);
        navigate("/");
      }, 3000);
    } catch {
      setMessage("Invalid email or password.");
    }
  };

  const handleRegisterNavigate = () => {
    setTransitionMsg("Opening Registration...");
    setShowTransition(true);
    setTimeout(() => {
      setShowTransition(false);
      navigate("/register");
    }, 3000);
  };

  return (
    <>
      <TransitionOverlay show={showTransition} message={transitionMsg || "Logging in..."} />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <ShieldCheckIcon className="h-16 w-16 text-white/90 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome to Namma Suraksha
            </h1>
            <p className="text-white/80 text-lg">Your safety is our priority</p>
          </div>

          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/30 bg-white/20 focus:ring-white/50"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-white">
                    Remember me
                  </label>
                </div>
                <button type="button" className="text-white hover:text-white/80">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-indigo-900 bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-700 transition-colors duration-200"
              >
                Sign in
              </button>

              <div className="text-center">
                <span className="text-white">Don't have an account? </span>
                <button
                  type="button"
                  onClick={handleRegisterNavigate}
                  className="text-white font-medium hover:text-white/80"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
          
          <p className="mt-8 text-center text-white/80 text-sm">
            Together we can create a safer community for everyone
          </p>
        </div>
      </div>
    </>
  );
}