import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import axios from "../Axios";
import "./Captcha.css";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [input2FACode, setInput2FACode] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isUserVerified, setIsUserVerified] = useState(true);

  const navigate = useNavigate();

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setNotification({
        message: "Please complete the CAPTCHA.",
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.post("/users/login/", {
        email,
        password,
        captchaToken,
      });

      if (response.status === 200) {
        const data = response.data;

        if (data.tokens) {
          if (data.isVerified) {
            if (data.two_factor_required) {
              // If 2FA is required, enable 2FA input
              setIsLoggedIn(true);
              setIs2FAEnabled(true);
              setNotification({
                message: "A verification code has been sent to your email.",
                type: "success",
              });
            } else {
              // If 2FA is not required, login is complete
              setNotification({
                message: "Login successful!",
                type: "success",
              });
              // Store JWT tokens and redirect to dashboard
              localStorage.setItem("access_token", data.tokens.access);
              localStorage.setItem("refresh_token", data.tokens.refresh);
              navigate("/dashboard");
            }
          } else {
            // User is not verified
            setIsUserVerified(false);
            setNotification({
              message: "Your email is not verified. Please check your inbox.",
              type: "error",
            });
          }
        } else {
          setNotification({
            message: "Login failed. Please try again.",
            type: "error",
          });
        }
      } else {
        setNotification({
          message: "Login failed. Invalid credentials.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred during login. Please try again.",
        type: "error",
      });
    }
  };

  // Handle 2FA Code Submission
  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/users/verify-2fa", {
        email,
        two_factor_code: input2FACode,
      });

      if (response.status === 200) {
        const data = response.data;

        if (data.success) {
          setNotification({
            message: "2FA verified! You are successfully logged in.",
            type: "success",
          });

          // Store JWT tokens and redirect to dashboard
          localStorage.setItem("access_token", data.tokens.access);
          localStorage.setItem("refresh_token", data.tokens.refresh);

          navigate("/dashboard"); // Redirect to dashboard
        } else {
          setNotification({
            message: "Invalid verification code.",
            type: "error",
          });
        }
      } else {
        setNotification({
          message: "Verification failed. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred during verification. Please try again.",
        type: "error",
      });
    }
  };

  // Resend verification email if user is not verified
  const handleResendVerification = async () => {
    try {
      const response = await axios.post("/users/resend-verification", {
        email,
      });

      if (response.status === 200) {
        setNotification({
          message: "A new verification link has been sent to your email.",
          type: "success",
        });
      } else {
        setNotification({
          message: "Failed to resend verification link. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred while resending the verification link.",
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

      {/* If user is not verified, show resend verification link */}
      {!isUserVerified && (
        <div>
          <button
            onClick={handleResendVerification}
            className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Resend Verification Link
          </button>
        </div>
      )}

      {/* If the user is logged in but 2FA is enabled, show the 2FA form */}
      {isLoggedIn && is2FAEnabled ? (
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">
            2FA Verification
          </h2>
          <form onSubmit={handle2FASubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="2faCode"
              >
                Enter Verification Code
              </label>
              <input
                id="2faCode"
                type="text"
                value={input2FACode}
                onChange={(e) => setInput2FACode(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter the code sent to your email"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Verify
              </button>
            </div>
          </form>

          <button
            onClick={handleResendVerification}
            className="mt-4 w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Resend Verification Code
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleLoginSubmit}>
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
                Login
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="text-center mt-4">
            <p className="text-gray-700">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
