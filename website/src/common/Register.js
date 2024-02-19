import React, {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoginSvg from "../assets/login.svg";

export default function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [phoneno, setPhonono] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (userType === "Admin" && secretKey !== "Admin") {
      alert("Invalid Admin");
    } else if (!fname || !lname || !email || !password || !userType || (userType !== "Admin" && (!phoneno || !address))) {
      // Check if any of the required fields are empty
      alert("Please fill in all required fields.");
    } else {
      console.log(fname, lname, phoneno, address, email, password, userType);
      fetch("http://localhost:9000/api/v1/common", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          lname,
          phoneno,
          address,
          email,
          password,
          userType,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Server Error");
          }
        })
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status === "ok") {
            alert("Something went wrong");
          } else {
            alert("Registration Successful");
            navigate("/login");
          }
        })
        .catch((error) => {
          alert("Server Error: Something went wrong");
        });
    }
  };
  

  return (
    <>
      <Navbar />
      <div className=" g-8 flex h-full flex-wrap items-center justify-center lg:justify-between  mt-1 mb-20 ml-9">
        <div className="log flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96 mt-2">
            <div>
              <h2
                className="mt-0 text-2xl font-extrabold text-center text-gray-900"
                style={{ color: "blue" }}
              >
                Register
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "10px", marginTop: "15px" }}>
                Register As
                <input
                  style={{ marginLeft: "10px" }}
                  type="radio"
                  name="userType"
                  value="User"
                  onChange={(e) => setUserType(e.target.value)}
                />
                User
                <input
                  style={{ marginLeft: "10px" }}
                  type="radio"
                  name="userType"
                  value="Admin"
                  onChange={(e) => setUserType(e.target.value)}
                />
                Admin
              </div>
              {userType === "Admin" ? (
                <div className="mb-3">
                  <label>Secret Key</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Secret Key"
                    onChange={(e) => setSecretKey(e.target.value)}
                  />
                </div>
              ) : null}

              <div className="mb-3">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {userType !== "Admin" ? (
                <>
                  <div className="mb-3">
                    <label>PhoneNo</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="phoneno"
                      onChange={(e) => setPhonono(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </>
              ) : null}

              <div style={{ marginTop: "5px" }}>
                Don't have an account?{" "}
                <Link to="/login" style={{ color: "blue" }}>
                  sign in?
                </Link>
              </div>
              <div className="d-grid">
                <button
                  className="w-full flex justify-center  mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bright-orange hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="primary"
                >
                 Register
                </button>
              </div>
            </form>
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
    </>
  );
}
