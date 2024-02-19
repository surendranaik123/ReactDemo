import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink, useParams } from 'react-router-dom';
import { addCart } from '../redux/Action/action';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Rating from "react-rating-stars-component";
import '../css/product.css'

const Productdata = () => {
  const state = useSelector(state => console.log(state));
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

console.log(state);

useEffect(() => {
    console.log('Product ID from route:', id);
  
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:9000/api/v1/productdata/${id}`);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const productData = await response.json();
        setProduct(productData);
        console.log('Fetched Product Data:', productData);
      } catch (error) {
        console.error('Error fetching product data:', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    getProduct();
  }, [id  ]);
  
  const addProduct = product => {
    console.log('Adding Product to Cart:', product);
    dispatch(addCart(product));
  };

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6 product" style={{marginRight:"200px"}}>
          <img src={product.image} alt="presentation" style={{ height: '400px', width: '450px', borderRadius: '1px' }} />
        </div>
        <div className="col-md-6" style={{marginLeft:"20px"}}>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '10px' }}>
            
            <h4>{product.category} </h4>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{product.title}</h3>
          </div>

          <div className='product-details-container' style={{ display: 'flex', marginBottom: '10px' }}>
            <h3 style={{ display: 'flex' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'blue', fontWeight: 'bold' }}>Price:</h2>
              <h2 style={{ fontWeight: 'bold', marginTop: '4px', fontSize: '1.3rem' }}>${product.price}</h2>
            </h3>

            <h3 style={{ display: 'flex', marginLeft: '30px' }} classNames='rate'>
              <h2 style={{ fontSize: '1.3rem', color: 'Red', fontWeight: 'bold' }} >Rating:</h2>
              <h2 style={{ fontWeight: 'bold', marginTop: '-3px', fontSize: '1.3rem' }}>
              <Rating
               
                      count={5}
                      value={product.rating} 
                      size={24}
                      activeColor="green"
                    />
              </h2>
            </h3>
          </div>

          <div>
            <p style={{ fontSize: '1.1rem' }}>{product.description}</p>
          </div>

          <div style={{ marginLeft: '13px' }}>
            <button className="add" onClick={() => addProduct(product)}>
              Add to Cart
            </button>
            <NavLink to="/cart">
              <button className="buy1">Go to Cart</button>
            </NavLink>
          </div>
        </div>
      </>
    );
  };

  return (
    <div >
      <Navbar />
      <div className="container py-5">
        <div className="row py-4">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
    </div>
  );
};

export default Productdata;
