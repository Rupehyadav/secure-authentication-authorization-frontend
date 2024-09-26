import React from "react";
import PageHeader from "../PageHeader";

const About: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <PageHeader title="What We Do" />
      <main className="flex flex-col items-center py-12 px-4">
        <section className="max-w-4xl text-center mb-12">
          <p className="text-lg text-gray-600 leading-relaxed">
            Our platform provides a modern, secure, and user-friendly
            authentication and authorization system designed to protect your
            applications and users. We offer a comprehensive solution that
            includes multi-factor authentication, role-based access control,
            password management, and much more.
          </p>
        </section>

        <section className="w-full max-w-5xl mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Secure Authentication
            </h3>
            <p className="text-gray-600">
              We offer a highly secure authentication process, ensuring that
              only authorized users can access your system. Our methods include
              password hashing, two-factor authentication (2FA), and session
              management.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Role-Based Access Control
            </h3>
            <p className="text-gray-600">
              We implement role-based access control (RBAC), allowing you to
              manage what each user or group can access based on their roles and
              responsibilities.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Data Protection
            </h3>
            <p className="text-gray-600">
              Security is at the core of what we do. We ensure that all user
              data is protected using encryption both at rest and in transit,
              keeping your sensitive information safe.
            </p>
          </div>
        </section>

        <section className="text-center max-w-4xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our mission is to provide a secure and scalable authentication and
            authorization platform that helps businesses protect their users'
            data and applications. We strive to deliver the best in security
            without compromising user experience.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
