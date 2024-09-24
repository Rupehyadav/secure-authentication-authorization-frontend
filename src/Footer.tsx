import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="max-w-5xl mx-auto text-center">
        <p>&copy; 2024 My Website. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <span className="mx-2">|</span>
          <a href="/terms" className="hover:text-gray-400">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
