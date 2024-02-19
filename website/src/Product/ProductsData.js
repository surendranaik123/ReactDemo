// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Rating from "react-rating-stars-component";
// import Navbar from "../components/Navbar";
// import { NavLink, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function ProductsData() {
//   const [data, setData] = useState(null);
//   const location = useLocation();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   useEffect(() => {
//     axios
//       .get("http://localhost:9000/api/v1/productdata")
//       .then((res) => {
//         console.log("Data fetched successfully:", res.data);
//         setData(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <>
//       <Navbar />
      // <div
      //   style={{
      //     height: "500px",
      //     display: "flex",
      //     flexWrap: "wrap",
      //     alignContent: "center",
      //     justifyContent: "center",
      //   }}
      // >
      //   {data &&
      //     data.map((product) => (
      //       <div>
      //         <div style={{ marginLeft: "15px", fontWeight: "bold" }}>
      //           {product.name}
      //           {console.log(product)}
      //         </div>
      //         <NavLink
      //           style={{ margin: "auto 0", flex: "1", marginTop: "15px" }}
      //           to={`/productsdata/${product.id}`}
      //         >
      //           <div
      //             className="card"
      //             style={{
      //               width: "16rem",
      //               margin: "10px",
      //               backgroundColor: "lightgrey",
      //               height: "25rem",
      //             }}
      //             key={product._id}
      //           >
      //             <img
      //               src={product.image}
      //               className="card-img-top"
      //               alt="SubscriptionImage"
      //               style={{ borderRadius: "0px", height: "250px" }}
      //             />
      //             <div className="card-body" style={{ height: "40px" }}>
      //               <h4
      //                 style={{
      //                   fontSize: "1rem",
      //                   fontWeight: "bold",
      //                   color: "blue",
      //                   marginBottom: "10px",
      //                 }}
      //               >
      //                 {product.title.substring(0, 25)}
      //               </h4>

      //               <div style={{ display: "flex", flexWrap: "wrap" }}>
      //                 <h1>Price:</h1>
      //                 <h4
      //                   style={{
      //                     marginRight: "10px",
      //                     fontSize: "1rem",
      //                     fontWeight: "bold",
      //                   }}
      //                 >
      //                   ${product.discountedPrice}
      //                 </h4>
      //                 <h4
      //                   style={{
      //                     textDecoration: "line-through",
      //                     marginRight: "5px",
      //                   }}
      //                 >
      //                   ${product.price}
      //                 </h4>
      //                 <h4 style={{ color: "green" }}>
      //                   {product.discount}% off
      //                 </h4>
      //               </div>

      //               <Rating
      //                 count={5}
      //                 value={product.rating}
      //                 size={24}
      //                 activeColor="green"
      //               />
      //               <div style={{ marginTop: "-15px", marginLeft: "17px" }}>
      //               {isAuthenticated ? (
      //                 <>
      //                   <NavLink to={`/productsdata/${product.id}`}>
      //                     <button className="add">Add To Cart</button>
      //                   </NavLink>
      //                   <NavLink
      //                     to={`/order/${product.id}`}
      //                     state={{ UserEmail: location.state?.id }}
      //                   >
      //                     <button className="buynow">Buy Now</button>
      //                   </NavLink>
      //                 </>
      //               ) : (
      //                 <NavLink to={`/productsdata/${product.id}`}>
      //                   <button className="add">Add To Cart</button>
      //                 </NavLink>
      //               )}
      //             </div>

      //             </div>
      //           </div>
      //         </NavLink>
      //       </div>
      //     ))}
      // </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { NavLink, useLocation, useParams } from "react-router-dom";
import "../css/product.css";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import { Input } from "antd";
import Navbar from "../components/Navbar";
import { shuffle } from "lodash";
import Rating from "react-rating-stars-component";
import { useSelector } from "react-redux";

export default function ProductsData() {
  const { Search } = Input;
  const location = useLocation();
  const [data, setData] = useState([]);
  const [perpage, setPerpage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [user, setUser] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log(data, user);
  // Extract the id parameter from the route
  const { id } = useParams();



  useEffect(() => {
    // Fetch product data from API
    axios
      .get("http://localhost:9000/api/v1/productdata")
      .then((res) => {
        console.log("API Response:", res.data);
        // Shuffle the data randomly
        const shuffledData = shuffle(res.data);
        setData(shuffledData);
        setPerpage(shuffledData.slice(0, 4));
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });

    // Only fetch user data if id is available
    if (id) {
      axios
        .get(`http://localhost:9000/api/v1/users/single/${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    // Update products per page when category, data, or searchCategory changes
    const offset = currentPage * 4;
    let filteredData = data;

    if (currentCategory) {
      filteredData = filteredData.filter(
        (item) => item.category === currentCategory
      );
    }

    if (searchCategory) {
      filteredData = filteredData.filter(
        (item) => item.category === searchCategory
      );
    }

    setPerpage(filteredData.slice(offset, offset + 4));
  }, [currentCategory, data, currentPage, searchCategory]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filterProduct = (cat) => {
    setCurrentCategory(cat);
    setCurrentPage(0); // Reset to first page when applying filter
  };

  const onSearch = (cat) => {
    setSearchCategory(cat);
    setCurrentPage(0); // Reset to first page when applying filter
  };

  return (
    <>
      <Navbar />
      <div class="search-container">
        <Search
          className="search"
          placeholder="Search by category"
          onSearch={onSearch}
          enterButton
        />
      </div>

      <div className="home1">
        {data &&
          data.map((product) => (
            <div>
              <div style={{ marginLeft: "15px", fontWeight: "bold" }}>
                {product.name}
                {console.log(product)}
              </div>
              <NavLink
                style={{ margin: "auto 0", flex: "1", marginTop: "15px" }}
                to={`/productsdata/${product.id}`}
              >
                <div
                  className="card"
                  style={{
                    width: "16rem",
                    margin: "10px",
                    backgroundColor: "lightgrey",
                    height: "25rem",
                  }}
                  key={product._id}
                >
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt="SubscriptionImage"
                    style={{ borderRadius: "0px", height: "250px" }}
                  />
                  <div className="card-body" style={{ height: "40px" }}>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "blue",
                        marginBottom: "10px",
                      }}
                    >
                      {product.title.substring(0, 25)}
                    </h4>

                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      <h1>Price:</h1>
                      <h4
                        style={{
                          marginRight: "10px",
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        ${product.discountedPrice}
                      </h4>
                      <h4
                        style={{
                          textDecoration: "line-through",
                          marginRight: "5px",
                        }}
                      >
                        ${product.price}
                      </h4>
                      <h4 style={{ color: "green" }}>
                        {product.discount}% off
                      </h4>
                    </div>

                    <Rating
                      count={5}
                      value={product.rating}
                      size={24}
                      activeColor="green"
                    />
                    <div style={{ marginTop: "-15px", marginLeft: "17px" }}>
                    {isAuthenticated ? (
                      <>
                        <NavLink to={`/productsdata/${product.id}`}>
                          <button className="add">Add To Cart</button>
                        </NavLink>
                        <NavLink
                          to={`/order/${product.id}`}
                          state={{ UserEmail: location.state?.id }}
                        >
                          <button className="buynow">Buy Now</button>
                        </NavLink>
                      </>
                    ) : (
                      <NavLink to={`/productsdata/${product.id}`}>
                        <button className="add">Add To Cart</button>
                      </NavLink>
                    )}
                  </div>

                  </div>
                </div>
              </NavLink>
            </div>
          ))}
      </div>

      <div>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(
            (currentCategory
              ? data.filter((item) => item.category === currentCategory)
              : data
            ).length / 4
          )}
          marginPagesDisplayed={1}
          pageRangeDisplayed={10}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}
