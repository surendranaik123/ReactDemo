import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom'
import img from '../../assets/img.jpg';




export const AdminLogAuth = () => {
    const navigate=useNavigate()
  const [data, setData] = useState([]);
  const [input, setInput] = useState({ name: '', email: '' }); // Add 'name' to initial state
  const [loginError, setLoginError] = useState('');
  const [loginErrorname, setLoginErrorname] = useState('');

  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/v1/adm");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getAllData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
  
    const admin = data.find(
      (adminData) =>
      adminData.email.toLowerCase() === input.email.toLowerCase() &&
        adminData.password === input.password
    );
  
    if (admin) {
      // Successful login
      setLoginError('');
      setLoginErrorname('');
      alert('Login successful!');
      navigate('/details');
    } else {
      if (!data.some((adminData) => adminData.email.toLowerCase() === input.email.toLowerCase())) {
        // Invalid email
        setLoginError('Invalid email');
      } else {
        setLoginError('');
      }
  
      if (!data.some((adminData) =>adminData.password === input.password)) {
        // Invalid name
        setLoginErrorname('Invalid password');
      } else {
        setLoginErrorname('');
      }
    }
  };

  return (
    <>
      <div className="container" style={{ marginLeft: "24rem"}}>
        <div className="row">
          <div className="col-md-7 ">
            <div>
              <center>
            {/* <img src={img1} alt='image' style={{height:"100px",}}/> */}
            <image src={img} alt='presentation' style={{height:"100px",}}/>
            </center>
            </div>
            <div style={{ backgroundColor: "blue" }}>
              <h1 className="text-white text-center mt-2">Admin Login Page</h1>
            </div>
          </div>
          <div className="col-md-7">
            <form onSubmit={handleLogin}>
             
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
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
                  id="exampleInputPassword1"
                />
                         {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
                         <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                 Password
                </label>
                <input name="password"
                  value={input.password}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="password"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
             {  loginErrorname && <div style={{ color: 'red' }}>{  loginErrorname}</div>}

              </div>
              <div>
              Don't have account?<Link to={"/adminreg"}>Admin Register</Link>
              </div>
              <br/>
              <button type="submit" className="btn btn-primary">
                Singin
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
 export default AdminLogAuth;