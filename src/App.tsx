// import React from "react";
// import Header from "./Header";
// import Footer from "./Footer";

// import Dashboard from "./components/Dashboard";

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <Header />
//       <div className="container mx-auto">
//         <h1 className="text-4xl font-bold mb-8 text-center">
//           Secure Authentication and Authorization
//         </h1>
//         <RegisterForm />
//         <Dashboard />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default App;

import React from "react";
import Header from "./Header"; // Import Header
import Footer from "./Footer"; // Import Footer
import RegisterForm from "./components/RegisterForm";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold">
          Secure Authentication and Authorization
        </h1>
        <RegisterForm />
      </main>

      <Footer />
    </div>
  );
};

export default App;
