import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password:'',
    age: "",
    phoneno:"",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/v1/users/single/${id}`
        );
        setInput(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleEditData = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/api/v1/users/${id}`, input);
      navigate("/fetch");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div style={{ backgroundColor: "blue" }}>
            <h1 className="text-white text-center mt-2">User Edit Page</h1>
          </div>
        </div>
        <div className="col-md-12">
          <form onSubmit={handleEditData}>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                className="form-control"
                id="nameInput"
                aria-describedby="nameHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                className="form-control"
                id="emailInput"
              />
            </div>
 
            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                className="form-control"
                id="passwordInput"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ageInput" className="form-label">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={input.age}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                className="form-control"
                id="ageInput"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phonenoInput" className="form-label">
               PhoneNo
              </label>
              <input
                type="phoneno"
                name="phoneno"
                value={input.phoneno}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                className="form-control"
                id="phoneInput"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
      <button onClick={() => navigate("/")} className="btn btn-info mt-2">
        Go To Home
      </button>
    </div>
  );
};

export default Edit;
