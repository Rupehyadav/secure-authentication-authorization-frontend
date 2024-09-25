import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import UserManagement from "./components/UserManagement";
import ForgotPassword from "./components/ForgotPassword";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow container mx-auto p-4 text-center">
          <h1 className="text-4xl font-bold">
            Secure Authentication and Authorization
          </h1>

          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<RegisterForm />} />

            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
          {/* <RegisterForm /> */}
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
