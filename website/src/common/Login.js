// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/Reducer/authSlice.js';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // import  Navbar  from '../components/Navbar.js';
// // import Footer from '../components/Footer.js';
// // import { Toast } from 'bootstrap';



// const Login = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [email, setEmail] = useState(''); 
//     const [password, setPassword] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const [data, setData] = useState(null); // Initialize data as null
//     const [LoginErrorPassword, setLoginErrorPassword] = useState('');

//     useEffect(() => {
//         axios.get("http://localhost:9000/api/v1/users")
//             .then((res) => {
//                 console.log("Data fetched successfully:", res.data);
//                 setData(res.data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//             });
//     }, []);

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             if (data) {
//                 // Assuming your API response includes a 'name' field
//                 const user = data.find((userData) => userData.email === email && userData.password === password);

//                 if (user) {
//                     // Successful login
//                     dispatch(login(user));
//                     // Toast.sucess('Login successful!')
//                     alert('Login successful!');
//                     navigate('/');
//                     console.log("data",user);
//                 } else {
//                     if (!data.some((userData) => userData.password.toLowerCase() === password.toLowerCase())) {
//                         // Invalid password
//                         setLoginErrorPassword('Invalid password');
//                     } else {
//                         setLoginErrorPassword('');
//                     }
//                     if (!data.some((userData) => userData.email.toLowerCase() === email.toLowerCase())) {
//                         // Invalid email
//                         setLoginError('Invalid email');
//                     } else {
//                         setLoginError('');
//                     }
//                 }
//             } else {
//                 // Data not fetched yet
//                 setLoginError('Data not fetched yet');
//             }
//         } catch (error) {
//             setLoginError('Invalid credentials');
//         }
//     };


//     return (
//         <div style={{overflowX:"hidden"}}>
           
//             <div className="container" style={{ marginLeft: '24rem',paddingTop:"50px",paddingBottom:"50px" }}>
//                 <div className="row">
//                     <div className="col-md-7">
//                         <center>
//                             <div style={{ backgroundColor: 'blue' }}>
//                                 <h1 className="text-white text-center mt-2">User Login Page</h1>
//                             </div>
//                         </center>
//                     </div>
//                     <div className="col-md-7">
//                         <form onSubmit={handleLogin}>
//                             <div className="mb-3">
//                                 <label htmlFor="email" className="form-label">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     placeholder="Email"
//                                     className="form-control"
//                                     id="email"
//                                 />
//                             </div>
//                             <div className="text-danger">{loginError}</div>
//                             <div className="mb-3">
//                                 <label htmlFor="password" className="form-label">
//                                     Password
//                                 </label>
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     placeholder="Password"
//                                     className="form-control"
//                                     id="password"
//                                 />
//                             </div>
//                             <div className="text-danger">{LoginErrorPassword}</div>
//                             <div>
//                                 Don't have an account? <Link to="/userreg">Register here</Link>
//                             </div>
//                             <br />
//                             <button type="submit" className="btn btn-primary">
//                                 Login
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
          
//         </div>
//     );
// };

// export default Login;


import React from 'react'

const Login = () => {
  return (
    <div className='gfg-div'>Login</div>
  )
}

export default Login
