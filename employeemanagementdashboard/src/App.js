import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';

import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";

import "./styles/global.css";
import "./styles/variables.css";

export default function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("auth") === "true"
  );

  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("employees");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const login = () => {
    localStorage.setItem("auth", "true");
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuth(false);
  };

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route
          path="/login"
          element={
            isAuth ? <Navigate to="/dashboard" /> : <Login onLogin={login} />
          }
        />

        <Route
          path="/dashboard"
          element={
            isAuth ? (
              <Dashboard employees={employees} onLogout={logout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/employees"
          element={
            isAuth ? (
              <Employees
                employees={employees}
                setEmployees={setEmployees}
                onLogout={logout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
