import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../Axios";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const { uid, token } = useParams<{ uid: string; token: string }>(); // Get uid and token from URL params
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNotification({
        message: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    // Submit the new password and the token for validation
    try {
      const response = await axios.post("/users/reset-password/", {
        password,
        uid,
        token,
      });

      if (response.status === 200) {
        setNotification({
          message: "Password has been reset successfully!",
          type: "success",
        });

        // Optionally redirect to login after reset
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Redirect after 3 seconds
      } else {
        setNotification({
          message: "Error resetting password. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-40 pb-8 mb-4">
      {/* Show Notification */}
      {notification.message && (
        <div
          className={`px-4 py-3 rounded relative mb-4 ${
            notification.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
          role="alert"
        >
          <span className="block sm:inline">{notification.message}</span>
        </div>
      )}

      <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        {/* Password Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter new password"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Confirm new password"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset Password
          </button>
        </div>
      </form>

      {/* Link to login */}
      <div className="text-center mt-4">
        <p className="text-gray-700">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
