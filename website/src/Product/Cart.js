import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addCart, delCart, remCart } from "../redux/Action/action";
import Navbar from "../components/Navbar";
// import { useLocation } from "react-router-dom";
import img from "../assets/cart _back.jpg";
import '../css/cart.css'
// Cart.js


const Cart = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(addCart(item));
  };
  const handleDel = (item) => {
    dispatch(delCart(item));
  };

  const handleRemove = (item) => {
    dispatch(remCart(item));
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };

  const cartItems = (product) => {
    return (
      <div style={{ backgroundImage: `url(${img})` }}>
        {state && state.length === 0 && emptyCart()}
        {state && state.length !== 0 && (
          <div className="cont" >
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.title}
                      height="70px"
                      width="70px"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn-incre"
                        onClick={() => handleDel(product)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        name="quantity"
                        className="form-control"
                        style={{ height: "35px", width: "100px" }}
                        value={product.qty}
                        readOnly
                      />
                      <button
                        className="btn-decre"
                        onClick={() => handleAdd(product)}
                      >
                        +
                      </button>
                      <NavLink to={`/order/${product.id}`} style={{marginLeft:"-170px",marginBottom:"100px"}}>
                        <button className="buy">Buy Now</button>
                      </NavLink>
                      <button   
                        className="btn-danger"
                        onClick={() => handleRemove(product)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <h3>
                Total Price: ${state.reduce(
                  (total, item) => total + item.qty * item.price,
                  0
                )}
              </h3>
              <NavLink to="cart-check-out" >
                <button className="btn btn-primary checkout">Check Out</button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    );
  };

  const buttons = () => {
    return (
      <div className="contain">
        <div className="row">{/* Add buttons if needed */}</div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div style={{textAlign:"center"}}>MY CART</div>
      {state && state.length !== 0 && state.map(cartItems)}
      {state && state.length !== 0 && buttons()}
    </>
  );
};

export default Cart;
