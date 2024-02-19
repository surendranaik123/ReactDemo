 import axios from 'axios';
import React, { useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css';

export const Details = () => {
  const [data,setData]=useState(null)
  console.log(data);
  useEffect(() => {
    axios.post("http://localhost:9000/api/v1/userdetails")
        .then((res) => {
            console.log("Data fetched successfully:", res.data);
            setData(res.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}, []);
  return (
 <div>
    <table className='min-w-full bg-white border border-gray-300'>
      <thead>
        <tr>
          <th className='py-2 px-4 border-b'>FName</th>
          <th className='py-2 px-4 border-b'>LName</th>
          <th className='py-2 px-4 border-b'>Email</th> 
          <th className='py-2 px-4 border-b'>Password</th>
          <th className='py-2 px-4 border-b'>Contact</th>
          <th className='py-2 px-4 border-b'>Age</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((item, index) => (
          <tr key={index}>
            <td className='py-2 px-4 border-b'>{item.fname}</td>
            <td className='py-2 px-4 border-b'>{item.lname}</td>
            <td className='py-2 px-4 border-b'>{item.email}</td>
            <td className='py-2 px-4 border-b'>{item.password}</td>
            <td className='py-2 px-4 border-b'>{item.phoneno}</td>
            <td className='py-2 px-4 border-b'>{item.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}