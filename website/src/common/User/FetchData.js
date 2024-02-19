import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const FetchData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/v1/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log("Deleting user with ID:", id);
      await axios.delete(`http://localhost:9000/api/v1/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      alert("Deleted user");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  return (
    <div>
      <div className="col-md-6" style={{ marginLeft: "350px" }}>
        <div style={{ backgroundColor: "blue" }}>
          <h1 className="text-white text-center mt-2">User Data</h1>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Age</th>
              <th scope="col">PhoneNo</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.age}</td>
                <td>{user.phoneno}</td>
                <td>
                  <Link to={`/edit/${user._id}`}>
                    <button className="btn btn-primary">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "1rem" }}
                    onClick={() => handleDelete(user._id)} // Pass user ID to handleDelete
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

