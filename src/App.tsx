import React from "react";
import "./App.css";

import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Secure Authentication and Authorization
        </h1>
        <RegisterForm />
        {/* <Dashboard /> */}
      </div>
    </div>
  );
};

export default App;
