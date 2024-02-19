import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'

const UserReg = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phoneno: "",
  });

  // Define error state variables
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [phonenoError, setPhonenoError] = useState("");

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

    if (!input.age) {
      setAgeError("Age is required.");
    } else {
      setAgeError("");
    }

    if (!input.phoneno) {
      setPhonenoError("Phone number is required.");
    } else {
      setPhonenoError("");
    }

    // Check if all fields are filled out
    if (
      input.name &&
      input.email &&
      input.password &&
      input.age &&
      input.phoneno
      && input.name.length >= 3 && /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*()_+[\]{};':"\\|,.<>/?])/.test(input.password)
    ) {
      try {
        // Perform form submission logic here
        await axios.post("http://localhost:9000/api/v1/usercreate", input);

        setInput({
          name: "",
          email: "",
          password: "",
          age: "",
          phoneno: "",
        });

        alert("Success");
        navigate("/login");
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
            <h1 className="text-white text-center mt-2">User Register Page</h1>
          </div>
        </div>
        <div className="col-md-7">
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                name="name"
                value={input.name}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                placeholder="name"
                className="form-control"
                id="name"
              />
              {nameError && <div className="text-danger">{nameError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                name="email"
                value={input.email}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                placeholder="Email"
                className="form-control"
                id="email"
              />
              {emailError && <div className="text-danger">{emailError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                name="password"
                value={input.password}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                placeholder="password"
                className="form-control"
                id="password"
                type="password"
              />
              {passwordError && <div className="text-danger">{passwordError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age</label>
              <input
                name="age"
                value={input.age}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                placeholder="age"
                className="form-control"
                id="age"
              />
              {ageError && <div className="text-danger">{ageError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="phoneno" className="form-label">PhoneNo</label>
              <input
                name="phoneno"
                value={input.phoneno}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                placeholder="Phoneno"
                className="form-control"
                id="phoneno"
              />
              {phonenoError && <div className="text-danger">{phonenoError}</div>}
            </div>
            <div>
              Already have an account? <Link to="/userlog">User Login</Link>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserReg;
