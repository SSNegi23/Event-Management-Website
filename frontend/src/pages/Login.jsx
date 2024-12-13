import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home", { replace: true }); // Use replace to avoid adding to history stack
    }
  }, [navigate]); // Add navigate as a dependency

  const handleLogin = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      // localStorage.setItem("token", JSON.stringify(result.auth));
      localStorage.setItem("token", result.auth);
      navigate("/home");
    } else {
      alert("Please enter correct details");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login">
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        className="inputBox"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleLogin} className="appButton" type="button">
        Login
      </button>
      <button onClick={handleSignup} className="appButton" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default Login;
