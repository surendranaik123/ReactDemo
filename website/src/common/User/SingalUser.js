// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// export const SingalUser = ({ id }) => {
//    const [data, setData] = useState({});
//    console.log(data);

//    useEffect(() => {
//     const fetchData = async () => {
//         try {
//           const response = await axios.get(`http://localhost:9000/api/v1/user/singaluser/${id}`);
//           setData(response.data);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };
  
//       fetchData();
//    }, [id]);

//   return (
//     <div>
//       <h2>User Details</h2>
//       {data ? (
//         <div>
//           <p>ID: {data.id}</p>
//           <p>Name: {data.name}</p>
//           <p>Email: {data.email}</p>
//           <p>Age: {data.age}</p>
//           {/* Render other user details here */}
//         </div>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   )
// }


// client/src/DataDisplayPage.js
import React from 'react';

function DataDisplayPage({ user }) {
  return (
    <div>
      <h2>Data Display</h2>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          {/* Display user data here */}
        </div>
      ) : (
        <p>Please login to view your data.</p>
      )}
    </div>
  );
}

export default DataDisplayPage;

