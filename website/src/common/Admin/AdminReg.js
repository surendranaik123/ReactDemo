import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Define error state variables
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation logic for each input field
    if (!input.name) {
      setNameError("Name is required.");
    } else if (input.name.length < 5) {
      setNameError("Name should be at least 5 characters.");
    } else {
      setNameError("");
    }

    if (!input.email) {
      setEmailError("Email is required.");
    } else {
      setEmailError("");
    }

    if (!input.password) {
      setPasswordError("Password is required.");
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*()_+[\]{};':"\\|,.<>/?])/.test(input.password)) {
      setPasswordError("Give Strong Password,  uppercase letter & lowercase lette & number & special character");
    } else {
      setPasswordError("");
    }

    // Check if all fields are filled out and meet the requirements
    if (input.name && input.email && input.password && input.name.length >= 3 && /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*()_+[\]{};':"\\|,.<>/?])/.test(input.password)) {
      try {
        // Perform form submission logic here
        await axios.post("http://localhost:9000/api/v1/adm", input);

        setInput({
          name: "",
          email: "",
          password: "",
        });

        alert("Success");
        navigate("/adminlog");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form.");
      }
    }
  };

  return (
    <div className="container" style={{ marginLeft: "24rem" }}>
      <div className="row">
        <div className="col-md-7">
          <div style={{ backgroundColor: "blue" }}>
            <h1 className="text-white text-center mt-2">Admin Register Page</h1>
          </div>
        </div>
        <div className="col-md-7">
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                name="name"
                value={input.name}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                type="text"
                className="form-control"
                id="name"
              />
              {nameError && <div className="text-danger">{nameError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                name="email"
                value={input.email}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                type="email"
                className="form-control"
                id="email"
              />
              {emailError && <div className="text-danger">{emailError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                name="password"
                type="password"
                className="form-control"
                id="password"
              />
              {passwordError && <div className="text-danger">{passwordError}</div>}
            </div>
            <div>
              <div>
                Already have an account?{" "}
                <Link to={"/adminlog"}>Admin Login</Link>
              </div>
              <br />
              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
