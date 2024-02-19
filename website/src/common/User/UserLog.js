import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/img.jpg';

const UserLoginAuth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phoneno, setPhoneno] = useState('')
  async function handleSignIn(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/api/v1/login", {
        email, password
      })
        .then(res => {
          if (res.data == "exist") {
            navigate("/", { state: { id: email } })
          }
          else if (res.data == "notexist") {
            alert("User have not sign up")
          }
        })
        .catch(e => {
          alert("wrong details")
          console.log(e);
        })

    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container" style={{ marginLeft: '24rem' }}>
      <div className="row">
        <div className="col-md-7">
          <center>
            <img src={img} alt="presentation" style={{ height: '100px' }} />
          </center>
          <div style={{ backgroundColor: 'blue' }}>
            <h1 className="text-white text-center mt-2">User Login Page</h1>
          </div>
        </div>
        <div className="col-md-7">
          <form onSubmit={handleSignIn}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                placeholder="Email"
                className="form-control"
                id="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                placeholder="Password"
                className="form-control"
                id="password"
              />
            </div>
            <div>
              Don't have an account? <Link to="/userreg">Register here</Link>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLoginAuth;


// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"


// function Login() {

//     const history=useNavigate();
//     const [name,setName]=useState('')
//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')

//     async function submit(e){
//         e.preventDefault();

//         try{

//             await axios.post("http://localhost:9000/api/v1/login",{
//                 email,password
//             })
//             .then(res=>{
//                 if(res.data=="exist"){
//                     history("/",{state:{id:email}})
//                 }
//                 else if(res.data=="notexist"){
//                     alert("User have not sign up")
//                 }
//             })
//             .catch(e=>{
//                 alert("wrong details")
//                 console.log(e);
//             })

//         }
//         catch(e){
//             console.log(e);

//         }

//     }


//     return (
//         <div className="login">

//             <h1>Login</h1>

//             <form action="POST">
//                 <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
//                 <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
//                 <input type="submit" onClick={submit} />

//             </form>

//             <br />
//             <p>OR</p>
//             <br />

//             <Link to="/signup">Signup Page</Link>

//         </div>
//     )
// }

// export default Login