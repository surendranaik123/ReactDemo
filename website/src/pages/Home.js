import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import {NavLink, useLocation, useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import { Input } from 'antd';
// import Navbar  from '../components/Navbar';
import Footer from '../components/Footer';
import { shuffle } from 'lodash';
import img from '../assets/women_cloth.webp'
import img1 from '../assets/pexels-photo-7621125.webp'
import img2 from '../assets/jewelery.jpg'
import img3 from '../assets/Electronics1.jpg'
import '../css/display.css';

const Home = () => {
  const { Search } = Input;
  const location = useLocation();
  const [data, setData] = useState([]);
  const [perpage, setPerpage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const navigate = useNavigate()
  console.log(data);

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const items = [
    {
      label: <h5 className="btn1" onClick={() => filterProduct("")}>All Products</h5>,
      key: 'All Products',
    },
    {
      label: <h5 className="btn1" onClick={() => filterProduct("men's clothing")}>Men's Clothing</h5>,
      key: 'Mens Clothing',
    },
    {
      label: <h5 className="btn1" onClick={() => filterProduct("women's clothing")}>Women's Clothing</h5>,
      key: 'Womens Clothing',
    },
    {
      label: <h5 className="btn1" onClick={() => filterProduct("jewelery")}>Jewelry</h5>,
      key: 'Jewelry',
    },
    {
      label: <h5 className="btn1" onClick={() => filterProduct("electronics")}>Electronic</h5>,
      key: 'Electronic',
    },
  ];

  const App = () => (
    <Dropdown menu={{ items, onClick }}>
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
  }, []);

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



  const filterProduct = (cat) => {
    setCurrentCategory(cat);
    setCurrentPage(0); // Reset to the first page when applying filter
  };

  const onSearch = (cat) => {
    setSearchCategory(cat);
    setCurrentPage(0); // Reset to the first page when applying filter
  };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const Product1 = () => {
    return (<>
      <div className='back'>
        <div className='display'>
          <App />

          <div className='home'>
            {perpage.map((product) => (
              <div className='product' key={product.id}>
                <h5 style={{ color: "blue" }}>{product.category}</h5>
                <img src={product.image} className="image" alt="presentation" />
                <h4>{product.title && product.title.substring(0, 15)}</h4>
                <h4>Price:${product.price}</h4>
                <h5>Rating: {product.rating.rate}</h5>
                <NavLink to={`/product/${product.id}`} >
                    <button className='add'>Add To Cart</button>
                  </NavLink>
                  <NavLink to={`/order/${product.id}`} state={{ UserEmail: location.state?.id }}>
                    <button className='buy'>Buy Now</button>
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
    </>)
  }

   const handleProducts=()=>{
    navigate('/products')
   }
  return (
    <>
    

      <div style={{ backgroundColor: "lightgray" }}>
        <center>
          <Search className="search" placeholder="Search by category" onSearch={onSearch}
            enterButton style={{ width: "450px", padding: "20px" }} />
        </center>
        <div className='dis'>
          <div className='hero'>
            <h1>NEW</h1><h1> COLLECTION</h1>
            <h5>DISCOVER YOUR OWN CLOTH</h5>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
              been the industry's standard dummy text ever since the 1500s.
            </p>
            <button style={{ borderRadius: "5px", padding: "5px", width: 'auto', height: "40px", color: "blue" }} onClick={handleProducts} >OUR NEW COLLECTION</button>
          </div>
          <img className='home_img' src={img1} alt='presentation' />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}  >
          <div className='men' >
            <button className='home_btn' onClick={() => filterProduct("men's clothing")}>Men Cloth</button>
          </div>
          <div className='men' style={{ backgroundImage: `url(${img})` }} >
            <button className='home_btn'  onClick={() => filterProduct("women's clothing")}>Women Cloth</button>
          </div>
          <div className='men'  style={{ backgroundImage: `url(${img2})` }}>

            <button className='home_btn' onClick={() => filterProduct("jewelery")}>jewelery</button>

          </div>
          <div className='men'  style={{ backgroundImage: `url(${img3})` }}>
            <button className='home_btn' onClick={() => filterProduct("electronics")}>electronics</button>
          </div>

        </div>

      </div>
      <Product1 />
      <Footer />
    </>
  );
};

export default Home;
