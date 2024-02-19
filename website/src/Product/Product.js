import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink, useParams } from 'react-router-dom';
import { addCart } from '../redux/Action/action';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
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
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

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
  }, [id]);

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
        <div className="product col-md-6" style={{marginRight:"100px",marginLeft:"20px"}} >
          <img src={product.image} alt="presentation"style={{ height: '400px', width: '450px', borderRadius: '1px' }} />
        </div>

        <div className="col-md-6" style={{marginLeft:"5px"}}>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '10px' }}>
            {' '}
            <h4>{product.category} </h4>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{product.title}</h3>
          </div>

          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <h3 style={{ display: 'flex' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'blue', fontWeight: 'bold' }}>Price:</h2>
              <h2 style={{ fontWeight: 'bold', marginTop: '4px', fontSize: '1.3rem' }}>${product.price}</h2>
            </h3>

            <h3 style={{ display: 'flex', marginLeft: '30px' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'green', fontWeight: 'bold' }} className='produc'>Rating:</h2>
              <h2 style={{ fontWeight: 'bold', marginTop: '4px', fontSize: '1.3rem' }}>{product.rating && product.rating.rate} </h2>
            </h3>
          </div>

          <div>
            <p style={{ fontSize: '1.1rem' }}>{product.description}</p>
          </div>

          <div style={{ marginLeft: '13px' }}>
            <button className="add" onClick={() => addProduct(product)}>
              Add to Cart
            </button>
            {/* Ensure 'to' prop is specified with a valid route */}
            <NavLink to="/cart" className="nav-link" activeClassName="active" style={{marginLeft:"100px",marginTop:"-55px"}}>
              {/* Add a valid href attribute */}
              <button className="buy1">Go to Cart</button>
            </NavLink>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row py-4">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
    </div>
  );
};

export default Productdata;
