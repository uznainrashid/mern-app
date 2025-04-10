import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./util";

function Signup() {
  const navigate = useNavigate();
  const [SignupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copySignupInfo = { ...SignupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  // console.log("signup info logged-->", SignupInfo);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = SignupInfo;
    if (!name || !email || !password) {
      return handleError("Name, email or password are required");
    }
    try {
      const apiUrl = "http://localhost:8080/auth/signup";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SignupInfo),
      });
      const result = await response.json();
      const { success, message , error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if(error){
        const details = error?.details[0].message;
        handleError(details)
      }
      else if(!success){
        handleError(message)
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="container">
      <h1>SignUp</h1>
      <form action="" onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter Your Name..."
            autoFocus
            name="name"
            value={SignupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email..."
            name="email"
            value={SignupInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password..."
            onChange={handleChange}
            name="password"
            value={SignupInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have a account?
          <Link to={"/login"}>login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
