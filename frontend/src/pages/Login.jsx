import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./util";

function Login() {
  const navigate = useNavigate();
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyLoginInfo = { ...LoginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  // console.log("signup info logged-->", SignupInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    const {  email, password } = LoginInfo;
   if ( !email || !password) {
         return handleError("Email or password are required");
       }
       try {
         const apiUrl = "http://localhost:8080/auth/login";
         const response = await fetch(apiUrl, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(LoginInfo),
         });
        const result = await response.json()
      const { success, message , error , jwtToken, name } = result;
      if (success) {
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("loggedInUser", name)
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if(error){
        const details = error?.details[0].message;
        handleError(details)
      }
      else if(!success){
        handleError(message)
      }
      // console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form action="" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email..."
            name="email"
            value={LoginInfo.email}
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
            value={LoginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Does not have a account?
          <Link to={"/signup"}>SignUp</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;