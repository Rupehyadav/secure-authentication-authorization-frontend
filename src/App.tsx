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
import ResetPassword from "./components/ResetPassword";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Contact from "./components/Contact";
import ProtectedRoute from "./components/ProtectedRoute";

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
            {/* Public Routes*/}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/" element={<HomePage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-management"
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
