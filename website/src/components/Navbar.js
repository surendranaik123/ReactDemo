import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../css/header.css";
// import { UserContext } from "../App";
// import { Input } from "antd";
import {
  ShoppingCartOutlined,
  UsergroupAddOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { logout } from "../redux/Reducer/authSlice";
import img from "../assets/nav_logo.jpg";
// import img1 from "../assets/profilepic.svg";

import NavDropdown from "react-bootstrap/NavDropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  // const { Search } = Input;

  // const { state, dispatch } = useContext(UserContext);
  const state1 = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatchRedux = useDispatch();

  console.log("User Data:", user);
  console.log("User Data:", state1);

  const handleLogout = () => {
    dispatchRedux(logout());
    navigate("/");
  };

  const handlecart = () => {
    navigate("/cart");
  };
  const handleorder = () => {
    navigate(`/order?username=${user ? user.name : ""}`);
  };

  const [showProfileMenu, setShowProfileMenu] = useState(true);

  const handleProfileClick = () => {
    setShowProfileMenu(true);
  };

  const handleSettingClick = () => {
    setShowProfileMenu(false);
  };
  console.log(showProfileMenu);

  const [addMargin, setAddMargin] = useState(false);

  const handleClick = () => {
    setAddMargin(!addMargin); // Toggle the state to add/remove margin
  };


  return (
    <div>
       <nav
        style={{
          marginBottom: addMargin ? "350px" : "0px",
          backgroundColor: "lightgray",
        }}
      >
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn" onClick={handleClick}>
          <FontAwesomeIcon icon={faBars} />
        </label>
        <label style={{ display: "flex" }}>
          <img
            src={img}
            alt="logo"
            style={{
              height: "70px",
              width: "70px",
              borderRadius: "100px",
              marginTop: "10px",
              margin: "10px",
            }}
          />
          <label className="logo">E-com</label>
        </label>
        <ul className="ul">
          <li
            className="nav-item"
           
          >
            <NavLink className="nav-link active" aria-current="page" to="/">
              Home
            </NavLink>
          </li>

          <li className="nav-item" style={{ marginTop: "10px" }}>
            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>
          </li>
          <li className="nav-item" style={{ marginTop: "10px" }}>
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li
            className="nav-item"
            style={{ marginTop: "10px", marginRight: "30px" }}
          >
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li>

          <li>
            <NavLink to="/cart" className="cartnav">
              <ShoppingCartOutlined
                style={{ fontSize: "20px", marginTop: "-10px" }}
              />{" "}
              Cart ({state1.length})
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li>
              <NavLink
                to={`/order?username=${user ? user.fname : ""}`}
                className="ordernav"
              >
                <FireOutlined /> Order
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/login" className="loginnav">
                <UsergroupAddOutlined /> UserLogin
              </NavLink>
            </li>
          )}

          <li>
            <NavDropdown 
              title={user ? user.fname : "Guest"}
              id="basic-nav-dropdown"
              style={{ marginTop: "10px" }}
            >
              {!user && (
                <DropdownItem href="/login" className="custom-dropdown-item">
                  login with user credentials
                </DropdownItem>
              )}
              {user && (
                <>
                  <DropdownItem
                    onClick={handlecart}
                    className="customdetails-dropdown-item  inline-flex items-center  py-2 border  border-gray-500 text-base font-medium rounded-md text-black hover:bg-emerald-600"
                  >
                    MY Cart ({state1.length})
                  </DropdownItem>

                  <DropdownItem
                  className=" customdetails-dropdown-item  inline-flex items-center px-2 py-2 border  border-gray-500 text-base font-medium rounded-md text-black hover:bg-emerald-600"
                  >
                  <NavLink
                to={`/order?username=${user ? user.fname : ""}`} >
              
              
                    My Orders
                    </NavLink>
                  </DropdownItem>

                  <DropdownItem
                    onClick={handleSettingClick}
                    className=" customdetails-dropdown-item inline-flex items-center px-2 py-2 border  border-gray-500 text-base font-medium rounded-md text-black hover:bg-emerald-600"
                  >
                    Setting
                  </DropdownItem>
                  <DropdownItem
                    onClick={handleLogout}
                    className=" customdetails-dropdown-item inline-flex items-center px-2 py-2 border  border-gray-500 text-base font-medium rounded-md text-black hover:bg-emerald-600"
                  >
                    Logout
                  </DropdownItem>
                </>
              )}
            </NavDropdown>
          </li>
        </ul>
      </nav>
    </div>
    
  );
}

export default Navbar;
