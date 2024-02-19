import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import "../css/product.css"
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import { Input } from 'antd';
import Navbar from '../components/Navbar';
import { shuffle } from 'lodash';






const Products = () => {
  const { Search } = Input;
  const location = useLocation()
  const [data, setData] = useState([]);
  const [perpage, setPerpage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [user, setUser] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");

  console.log(data,user);
  // Extract the id parameter from the route
  const { id } = useParams();

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const items = [
    {
      label:<h5 className="btn1" onClick={() => filterProduct("")}>All Products</h5>,
      key: 'All Products',
    },

    {
      label:<h5 className="btn1" onClick={() => filterProduct("men's clothing")}>Men's Clothing</h5> ,
      key: 'Mens Clothing',
    },

    {
      label:<h5 className="btn1" onClick={() => filterProduct("women's clothing")}>Women's Clothing</h5>,
      key: 'Womens Clothing',
    },

    {
      label:<h5 className="btn1" onClick={() => filterProduct("jewelery")}>Jewelry</h5>,
      key: 'Jewelry',
    },

    {
      label:<h5 className="btn1" onClick={() => filterProduct("electronics")}>Electronic</h5>,
      key: 'Electronic',
    },
  ];

  const App = () => (
    <Dropdown menu={{items,onClick,}}>
      <button onClick={(e) => e.preventDefault()}>
        <Space>
          <button className='btn1'>Click menu item<DownOutlined /></button>
        </Space>
      </button>
    </Dropdown>
  );


  useEffect(() => {
    // Fetch product data from API
    axios.get('https://fakestoreapi.com/products')
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
      axios.get(`http://localhost:9000/api/v1/users/single/${id}`)
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
      filteredData = filteredData.filter((item) => item.category === currentCategory);
    }
  
    if (searchCategory) {
      filteredData = filteredData.filter((item) => item.category === searchCategory);
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
 <Navbar/>
      <div className='back'>
   
      <div class="search-container">
      <Search
            className="search"
            placeholder="Search by category"
            onSearch={onSearch}
            enterButton
            
          />
        </div>
     <div className='display' >
          <App/>

          <div className='home'>

         {perpage.map((product) => (<div>
         <div style={{marginLeft:"15px" ,fontWeight:"bold"}}>{product.name}</div> 
        <div className="card" style={{ width: '16rem',margin:"10px",backgroundColor:"lightgrey",height:"25rem" }} key={product._id}>
          <img src={product.image} className="card-img-top" alt="SubscriptionImage"  style={{borderRadius:"0px",height:"250px"}}/>
          <div className="card-body" style={{height:"40px"}}>
           <h4 style={{fontSize:"1.3rem"}}>{product.category}</h4>
          
         <div >
          <h4 style={{ margin: "auto 0",  flex: "1" ,marginTop:"15px" }}>Price:${product.price}</h4>
           <h5 style={{ margin: "auto 0",  textAlign: "right",marginTop:"-18px" }}>Rating: {product.rating.rate}</h5>
           </div> 
                <NavLink  style={{ margin: "auto 0",  flex: "1" ,marginTop:"15px" }} to={`/product/${product.id}`} >
                    <button  className='addtocart'>Add To Cart</button>
                </NavLink>
           
                  <NavLink to={`/order/${product.id}`} style={{ margin: "auto 0",  textAlign: "right",marginTop:"-18px" }}
                  state={{ UserEmail: location.state?.id }}>
                    <button  className='buynow'>Buy Now</button>
                   </NavLink>
         
          </div>
        </div>
        </div>))} 
        
          </div>


          <div>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil((currentCategory ? data.filter(item => item.category === currentCategory) : data).length / 4)}
              marginPagesDisplayed={1}
              pageRangeDisplayed={10}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Products;