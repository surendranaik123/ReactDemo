import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/order.css';
import { useLocation} from 'react-router-dom';
// import Navbar  from '../components/Navbar';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';

export const OrderDe = () => {
  // const navigate=useNavigate()
  const [data, setData] = useState([]);
  // const [searchedName, setSearchedName] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userNameFromQuery = queryParams.get('username');
console.log(data,setSuccess);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userNameFromQuery) {
          // Fetch order details based on the username query parameter
          const response = await axios.get(
            `http://localhost:9000/api/v1/orders/name?name=${userNameFromQuery}`
          );
          setSearchResult(response.data);
        } else {
          // Fetch all orders if no username is provided
          const response = await axios.get('http://localhost:9000/api/v1/orders');
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, [userNameFromQuery]);

 
  return (
    <div>
   <Navbar/>
      <h2 style={{ textAlign: "center", color: "blue", marginTop: "20px" }}>Order History</h2>
      {/* <center>
      <h2 style={{color:"green",marginTop:"-20px"}}>--------------------</h2>
      </center> */}
      <div>
         {/* <h3 style={{color:"blue"}}>UserName: @{user ? user.name : 'Guest'}</h3> */}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table className="table" style={{backgroundColor:"red"}}>
          <thead>
            <tr>
              <th scope="col">UserName</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">PhoneNo</th>
              <th scope="col">ProductId</th>
              <th scope="col">ProductName</th>
              <th scope="col">ProductQty</th>
              <th scope="col">TotalPrice</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((order, index) => (
              <tr key={index} className="details">
                <td>{order.username}</td>
                <td>{order.name}</td>
                <td>{order.addres}</td>
                <td>{order.phoneno}</td>
                <td>{order.productid}</td>
                <td>{order.producttitle}</td>
                <td>{order.productqty}</td>
                <td>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
