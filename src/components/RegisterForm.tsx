import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ username, email, phoneNumber, password });

    // Check if all fields are filled
    if (username && email && phoneNumber && password) {
      // Add some basic password validation here
      if (password.length < 6) {
        // Set notification to error type (red color)
        setNotification({
          message: "Password must be at least 6 characters long.",
          type: "error",
        });
        return;
      }

      // On successful registration, show success notification
      setIsRegistered(true);
      setNotification({
        message: "Email verification link has been sent to your email address.",
        type: "success",
      });

      // Clear the form (optional)
      setUsername("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");

      // Redirect to login page after 5 seconds
      setTimeout(() => {
        navigate("/login");
        setNotification({ message: "", type: "" }); // Clear notification
      }, 5000);
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-20 pb-8 mb-4">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

      {/* Show Notification */}
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
        {/* Username Field */}
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

        {/* Email Field */}
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

        {/* Phone Number Field */}
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

        {/* Password Field */}
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

        {/* Submit Button */}
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
