import React from 'react';
import { useNavigate } from 'react-router-dom';

const Detail = () => {
  const navigate = useNavigate();

  const UserDetails = (e) => {
    e.preventDefault();
    navigate("/userdetails");
  };
  const OrderDetails = (e) => {
    e.preventDefault();
    navigate("/orderdetails");
  };

  return (
    <>
      <button className='add' onClick={UserDetails} style={{marginLeft:"50px"}}>User Details</button>
      <button className='buy' onClick={OrderDetails}>Order Details</button>
    </>
  );
};

export default Detail;
