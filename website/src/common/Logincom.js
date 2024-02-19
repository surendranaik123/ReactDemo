import React from "react";
import LoginSvg from "../assets/login.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/Reducer/authSlice";
import Navbar from "../components/Navbar"
import "../css/header.css";
export default function LoginCom() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(setError);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/login_common",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            userType: ["Admin", "User"],
          }),
        }
      );
      console.log(response);
      if (response.ok) {
        const user = await response.json();

        if (user.userType === "Admin") {
          dispatch(login(user));
          navigate("/admindashboard");
        } else if (user.userType === "User") {
          dispatch(login(user));

          navigate("/");
        }
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  }

  return (
    <>
    <Navbar/>
    <div className=" g-8 flex h-full flex-wrap items-center justify-center lg:justify-between  mt-1 mb-20 ml-9">
      <div className="log flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 mt-2">
          <div>
            <h2 className="mt-0 text-3xl font-extrabold text-center text-gray-900">
              Login
            </h2>
          </div>
          <div className="">
            <div>
              <div>
                <div className="mt-1 grid grid-cols-2 gap-3"></div>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}

                <div className="mb-3">
                  <label>Email</label>
                  <input id="email" name="email" type="email" 
                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter email"
                    value={email}
                   onChange={(e) => setEmail(e.target.value)} autoComplete="off"
                  />
                </div>
            
                 <div className="mb-3">
                  <label>Password</label>
                <input id="password" name="password" placeholder="Enter password" type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="off" value={password}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div> 

              

                <div className="mb-3">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div style={{ marginTop: "5px" }}>
                  Don't have an account?{" "}
                  <Link to="/register" style={{color:"blue"}}>Register here</Link>
                </div>
                <div className="d-grid">
                  <button
                    className="w-full flex justify-center  mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bright-orange hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 log">
        <img
          src={LoginSvg}
          alt="presentation"
          style={{ height: "350px", width: "600px" }}
        />
      </div>
    </div>
    </>);
}
