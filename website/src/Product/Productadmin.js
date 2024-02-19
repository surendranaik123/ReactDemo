import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/order.css';
// import { useNavigate } from 'react-router-dom';
// import  Navbar from '../components/Navbar';
// import img from '../assets/Home.jpg'

export const Productadmin = () => {
  // const navigate=useNavigate()
  const [data, setData] = useState([]);
  
  const [error, setError] = useState('');
console.log(error); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);
 
  console.log(data);


  return (
    <div style={{margin:"20px" ,backgroundColor:"lightyellow",paddingTop:"30px"}}>
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
      {data.map((category) => (<div>
         <div style={{marginLeft:"15px" ,fontWeight:"bold"}}>{category.name}</div> 
        <div className="card" style={{ width: '18rem',margin:"10px",backgroundColor:"lightgrey" }} key={category._id}>
          <img src={category.image} className="card-img-top" alt="SubscriptionImage"  style={{borderRadius:"0px",height:"200px",width:"300px"}}/>
          <h5 className="card-title" style={{marginLeft:"6px",fontSize:"1.3rem",fontWeight:"bold"}}>{category.category}</h5>
          <h5 className="card-title" style={{ marginLeft: "6px", fontSize: "1rem" }}>{category.description.substring(0, 50)}</h5>

          <div className="card-body" style={{height:"40px",display:"flex"}}>
            <h5 className="card-title" style={{ margin: "auto 0",  flex: "1" ,}}>Prices:${category.price}</h5>
            <p className="card-text" style={{ margin: "auto 0",  textAlign: "right" }}>Rate{category.rating && category.rating.rate }</p>
          </div>
        </div>
        </div>))}
    </div>
     
    </div>
  );
};

