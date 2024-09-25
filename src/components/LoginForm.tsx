import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [is2FAEnabled, setIs2FAEnabled] = useState(false); // Track 2FA status
  const [verificationCode, setVerificationCode] = useState(""); // Store the 2FA code
  const [input2FACode, setInput2FACode] = useState(""); // Store the input 2FA code
  const [notification, setNotification] = useState({ message: "", type: "" }); // Notification message

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /*=========================================================================
    To be used after integrating api
    const handleLoginSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const response = await fetch("https://your-api.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();

          // If login is successful, trigger 2FA
          if (data.success) {
            setIsLoggedIn(true);
            setIs2FAEnabled(true); // Enable 2FA for this user
            setNotification("A verification code has been sent to your email.");

            // Optionally, retrieve the verification code from the response (for testing)
            setVerificationCode(data.verificationCode); // Simulated for frontend testing
            console.log(`2FA Code sent: ${data.verificationCode}`);
          } else {
            setNotification("Login failed. Please try again.");
          }
        } else {
          setNotification("Login failed. Invalid credentials.");
        }
      } catch (error) {
        setNotification("An error occurred during login. Please try again.");
      }
    };

    const handle2FASubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const response = await fetch("https://your-api.com/verify-2fa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, verificationCode: input2FACode }),
        });

        if (response.ok) {
          const data = await response.json();

          // If the 2FA code is verified successfully
          if (data.success) {
            setNotification("2FA verified! You are successfully logged in.");
            // Optionally redirect to a protected route (e.g., dashboard)
            navigate("/dashboard"); // Example route
          } else {
            setNotification("Invalid verification code.");
          }
        } else {
          setNotification("Verification failed. Please try again.");
        }
      } catch (error) {
        setNotification("An error occurred during verification. Please try again.");
      }
    };


    =========================================================================*/
    const handleResendCode = async () => {
      try {
        const response = await fetch("https://your-api.com/resend-2fa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setNotification(
            "A new verification code has been sent to your email."
          );
        } else {
          setNotification("Failed to resend the code. Please try again.");
        }
      } catch (error) {
        setNotification("An error occurred while resending the code.");
      }
    };

    // Simulate login validation (normally you'd make an API request here)
    if (email === "test@example.com" && password === "password") {
      setIsLoggedIn(true);
      setIs2FAEnabled(true); // Enable 2FA for this example
      setNotification({
        message: "A verification code has been sent to your email.",
        type: "success",
      });

      // Simulate sending 2FA code (in real case, an email is sent)
      const code = "123456"; // Example verification code
      setVerificationCode(code);
      console.log(`2FA Code sent: ${code}`);
    } else {
      setNotification({
        message: "Invalid email or password",
        type: "error",
      });
    }
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verify the entered 2FA code
    if (input2FACode === verificationCode) {
      setNotification({
        message: "2FA verified! You are successfully logged in.",
        type: "success",
      });
      // Here you can redirect to the dashboard or proceed further
    } else {
      setNotification({
        message: "Invalid verification code",
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
            notification.type === "error"
              ? "bg-red-100 border border-red-400 text-red-700"
              : "bg-green-100 border border-green-400 text-green-700"
          }`}
          role="alert"
        >
          <span className="block sm:inline">{notification.message}</span>
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
              <button
                onClick={handleResendCode}
                className="mt-4 w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Resend Verification Code
              </button>
            </div>
          </form>
        </div>
      ) : (
        // If the user is not logged in yet, show the login form
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

            {/* Forgot Password Link */}
            <div className="flex justify-end mb-4">
              <a
                href="/forgot-password"
                className="text-blue-500 hover:underline text-sm"
              >
                Forgot Password?
              </a>
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
