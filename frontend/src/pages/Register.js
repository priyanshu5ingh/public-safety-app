import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TransitionOverlay from "../components/TransitionOverlay";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    photo: null,
  });
  const [message, setMessage] = useState("");
  const [canLogin, setCanLogin] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionMsg, setTransitionMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setForm({ ...form, photo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });
      await axios.post("http://localhost:5000/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Registration successful!");
      setCanLogin(true);
    } catch (err) {
      setMessage("Registration failed. Username or email may already exist.");
    }
  };

  const handleLoginNavigate = () => {
    setTransitionMsg("Opening Login...");
    setShowTransition(true);
    setTimeout(() => {
      setShowTransition(false);
      navigate("/login");
    }, 3000);
  };

  return (
    <>
      <TransitionOverlay show={showTransition} message={transitionMsg} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 drop-shadow">Register</h2>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <input
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-3 rounded font-semibold shadow hover:from-indigo-700 hover:to-pink-600 transition-all duration-300"
          >
            Register
          </button>
          {message && <div className="text-center text-indigo-700 mt-4">{message}</div>}
          {canLogin && (
            <button
              type="button"
              onClick={handleLoginNavigate}
              className="w-full mt-4 bg-gradient-to-r from-pink-500 to-indigo-500 text-white py-2 rounded font-semibold shadow hover:from-pink-600 hover:to-indigo-600 transition-all duration-300"
            >
              You can log in now
            </button>
          )}
          <div className="mt-4 w-full flex flex-col items-center">
            <span className="text-gray-600 mb-2">Already have an account?</span>
            <button
              type="button"
              onClick={handleLoginNavigate}
              className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-2 rounded font-semibold shadow hover:from-indigo-600 hover:to-pink-600 transition-all duration-300"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
