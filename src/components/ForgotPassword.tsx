import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../Axios";
import { Link } from "react-router-dom";
import "./Captcha.css";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setNotification({
        message: "Please complete the CAPTCHA.",
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.post("/users/forgot-password/", {
        email,
        captchaToken,
      });

      if (response.status === 200) {
        setNotification({
          message: "A password reset link has been sent to your email.",
          type: "success",
        });
        setIsEmailSent(true);
      } else {
        setNotification({
          message: "Error occurred. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "Failed to send reset link. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-40 pb-8 mb-4">
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

      {!isEmailSent ? (
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 mb-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email address"
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
                Send Reset Link
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-700">
              Remembered your password?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-700">
            Please check your email for the password reset link.
          </p>
          <p>
            <Link to="/login" className="text-blue-500 hover:underline">
              Go to Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
