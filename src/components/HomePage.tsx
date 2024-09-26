import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../PageHeader";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <PageHeader title="Secure Authentication and Authorization" />
      <main className="flex flex-col items-center py-12 px-4">
        <section className="max-w-3xl text-center mb-12">
          <p className="text-lg text-gray-600">
            Our platform provides a highly secure and efficient authentication
            and authorization system. Safeguard your applications with our
            modern, robust system designed to protect your users' data and
            ensure secure access.
          </p>
        </section>

        <section className="flex flex-col sm:flex-row justify-around w-full max-w-4xl mb-12">
          <div className="p-6 bg-white rounded-lg shadow-lg m-4 w-80">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              User Authentication
            </h3>
            <p className="text-gray-600 mb-4">
              Our secure authentication process ensures only authorized users
              can access your system, with support for multi-factor
              authentication (MFA) and other security features.
            </p>
            <Link
              to="/login"
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg m-4 w-80">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              User Registration
            </h3>
            <p className="text-gray-600 mb-4">
              Easily register new users with our simple and secure registration
              process, complete with email verification and secure password
              handling.
            </p>
            <Link
              to="/register"
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </Link>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            We prioritize security and usability. Our platform is built to keep
            your data safe and your users happy, with advanced features like
            two-factor authentication, password recovery, and secure session
            management.
          </p>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
