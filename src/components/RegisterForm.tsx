import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../Axios";
import { Link, useNavigate } from "react-router-dom";
import "./Captcha.css";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [capchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!capchaToken) {
      setNotification({
        message: "Please complete the CAPTCHA.",
        type: "error",
      });
      return;
    }

    if (username && email && phoneNumber && password) {
      if (password.length < 6) {
        setNotification({
          message: "Password must be at least 6 characters long.",
          type: "error",
        });
        return;
      }

      try {
        const response = await axios.post("/users/register/", {
          username,
          email,
          phone_number: phoneNumber,
          password,
          capchaToken: capchaToken,
        });

        setIsRegistered(true);
        setNotification({
          message:
            "Email verification link has been sent to your email address.",
          type: "success",
        });

        setUsername("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");

        setTimeout(() => {
          navigate("/login");
          setNotification({ message: "", type: "" });
        }, 5000);
      } catch (error: any) {
        const errorMsg =
          error.response?.data?.message ||
          "An error occurred during registration. Please try again";
        setNotification({ message: errorMsg, type: "error" });

        setTimeout(() => {
          setNotification({ message: "", type: "" });
        }, 5000);
      }
    } else {
      setNotification({
        message: "Please fill out all fields.",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-20 pb-8 mb-4">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

      {notification.message && (
        <div
          className={`px-4 py-3 rounded relative mb-4 ${
            notification.type === "error"
              ? "bg-red-100 border border-red-400 text-red-700"
              : "bg-green-100 border border-green-400 text-green-700"
          }`}
          role="alert"
        >
          <span className="block sm:inline">{notification.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="recaptcha-container mb-6">
          <ReCAPTCHA
            sitekey="6Lcd3k4qAAAAAKyTgF6_s6eXa5gbYQ5tRWtmoo5x"
            onChange={handleCaptchaChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <p className="text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
