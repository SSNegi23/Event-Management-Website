import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    dob: Date.now(),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const collectData = async () => {
    console.warn(formData);
    let result = await fetch("http://localhost:5000/signup", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/login");
  };

  const gologin = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter Name"
      />
      <input
        className="inputBox"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter Password"
      />
      <input
        className="inputBox"
        type="number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Enter Phone Number"
      />
      <input
        className="inputBox"
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        placeholder="Enter DOB"
      />
      <label>Gender</label>
      <div>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={formData.gender === "Male"}
          onChange={handleChange}
        />
        <label>Male</label>
      </div>
      <div>
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={formData.gender === "Female"}
          onChange={handleChange}
        />
        <label>Female</label>
      </div>
      <button className="appButton" type="button" onClick={collectData}>
        Sign Up
      </button>
      <button className="appButton" type="button" onClick={gologin}>
        Login
      </button>
    </div>
  );
};

export default SignUp;
