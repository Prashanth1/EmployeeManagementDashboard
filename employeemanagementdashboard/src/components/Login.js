import { useState } from "react";
import "../styles/login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    // mock authentication
    onLogin();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Employee Management</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => {setEmail(e.target.value);setError("")}}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => {setPassword(e.target.value);setError("")}}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
