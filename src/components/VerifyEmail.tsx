import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../Axios";

interface VerifyEmailProps {}

const VerifyEmail: React.FC<VerifyEmailProps> = () => {
  const { token } = useParams<{ token: string }>();
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/users/verify-email/${token}/`);
        setMessage(response.data.message);
        setError(null);

        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } catch (err: any) {
        setError(err.response?.data?.message || "Email verification failed.");
        setMessage("");
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold">Email Verification</h2>
      {message && (
        <div className="text-green-500 mt-4">
          {message}
          <p>Redirecting to login...</p>
        </div>
      )}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default VerifyEmail;
