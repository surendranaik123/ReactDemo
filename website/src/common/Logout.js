import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App'; // Import your UserContext
import { Navbar } from '../components/Navbar';

const Logout = () => {
  const {state,dispatch } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:9000/api/v1/logout'); // Adjust the URL as needed
      dispatch({ type: 'USER', payload: false });// Clear user context
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (<><Navbar/>
  <button onClick={handleLogout}>Logout</button>;</>)
};

export default Logout;

