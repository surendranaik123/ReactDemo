import React, { useState } from "react";
import "../../css/admindashboard.css";
import DashBoard from "../../pages/Dashboard";

import { OrderDetails } from "../../orderpage/OrderDetails";
import { Productadmin } from "../../Product/Productadmin";
import DashboardUser from "../User/DashboardUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../App";
import { logout } from "../../redux/Reducer/authSlice";
import ProductStore from "../../Product/ProductStore";
import { Dropdown } from "react-bootstrap";

const AdminDashBoard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showOrder, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("Home");

  // const { state, dispatch } = useContext(UserContext);
  const state1 = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatchRedux = useDispatch();

  console.log(state1, isAuthenticated);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const Headers = () => {
    return (
      <div className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-4 shadow">
        <h3 className="navbar-brand col-md-3 col-lg-2 me-0 px-2">
          Admin DashBoard
        </h3>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          onClick={toggleSidebar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          style={{ width: "73%" }}
          className="form-control form-control-dark "
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap" style={{ display: "flex" }}>
            <div
              style={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}
            >
              ({user ? user.fname : "Guest"})
            </div>
            <button
              className="nav-link px-3"
              onClick={handleLogout}
              style={{ color: "white", fontWeight: "bold" }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SideNavBar = () => {
    const handleItemClick = (itemName) => {
      setActiveNavItem(itemName);
      switch (itemName) {
        case "Dashboard":
          setShowDashboard(true);
          setShowOrders(false);
          setShowProducts(false);
          setShowCustomer(false);
          setShowIntegrations(false);
          break;
        case "Order":
          setShowDashboard(false);
          setShowOrders(true);
          setShowProducts(false);
          setShowCustomer(false);
          setShowIntegrations(false);
          break;
        case "Products":
          setShowDashboard(false);
          setShowOrders(false);
          setShowProducts(true);
          setShowCustomer(false);
          setShowIntegrations(false);
          break;
        case "Customers":
          setShowDashboard(false);
          setShowOrders(false);
          setShowProducts(false);
          setShowCustomer(true);
          setShowIntegrations(false);
          break;

        case "Integrations":
          setShowDashboard(false);
          setShowOrders(false);
          setShowProducts(false);
          setShowCustomer(false);
          setShowIntegrations(true);
          break;

        default:
          break;
      }
    };

    return (
      <div style={{ width: "220px", marginTop: "100px" }}>
        <nav
          id="sidebarMenu"
          className={`${isSidebarOpen ? "active" : ""} 
        col-md-2 col-lg-2 d-md-block bg-light sidebar`}
          style={{ height: "200px", width: "220px" }}
        >
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li
                className={`sidenav ${
                  activeNavItem === "Dashboard" ? "active" : ""
                }`}
                onClick={() => handleItemClick("Dashboard")}
              >
                <p
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "3px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-home"
                    aria-hidden="true"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span className="mx-2">DashBoard</span>
                </p>
              </li>

              <li
                className={`sidenav ${
                  activeNavItem === "Order" ? "active" : ""
                }`}
                onClick={() => handleItemClick("Order")}
              >
                <p
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "3px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-file"
                    aria-hidden="true"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                  <span className="mx-2">Orders</span>
                </p>
              </li>

              {/* <li
                className={`sidenav ${
                  activeNavItem === "Products" ? "active" : ""
                }`}
                onClick={() => handleItemClick("Products")}
              >
                <p
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "3px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-shopping-cart"
                    aria-hidden="true"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <span className="mx-2">Products</span>
                </p>
              </li> */}
                
                <li
                className={`sidenavproduct ${
                  activeNavItem === "Products" ? "active" : ""
                }`}
              >
                <div class="dropdown">
                  <button
                    class="sidenav"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-shopping-cart"
                      aria-hidden="true"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="mx-2" style={{paddingLeft:"-30px"}}>Products</span>
                  </button>
                  <ul class="dropdown-menu">
                    <li className="sidenav">
                      <a
                        class="dropdown-item"
                        onClick={() => handleItemClick("Products")}
                      >
                        ProductsData
                      </a>
                    </li>
                    <li className="sidenav">
                      <a
                        class="dropdown-item"
                        onClick={() => handleItemClick("Integrations")}
                      >
                       Product Add
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li
                className={`sidenav ${
                  activeNavItem === "Customers" ? "active" : ""
                }`}
                onClick={() => handleItemClick("Customers")}
              >
                <p
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "3px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-users"
                    aria-hidden="true"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span className="mx-2">Customers</span>
                </p>
              </li>

              <li
                className={`sidenav ${
                  activeNavItem === "Integrations" ? "active" : ""
                }`}
                onClick={handleLogout}
              >
                <p
                  href="#"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "3px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-layers"
                    aria-hidden="true"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  <span className="mx-2">Logout</span>
                </p>
              </li>

              {/* 
              <li
                className={`sidenav ${
                  activeNavItem === "Products" ? "active" : ""
                }`}
              >
                <Dropdown onSelect={(eventKey) => handleItemClick(eventKey)} >
                  <Dropdown.Toggle
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                    variant="link"
                    id="dropdown-basic"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-shopping-cart"
                      aria-hidden="true"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="mx-2">Products</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      eventKey="option1"
                      onClick={() => handleItemClick("Products")}
                    >
                      Product Data
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="option2"
                      onClick={() => handleItemClick("Integrations")}
                    >
                      Product ADD
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li> */}

              
            </ul>
          </div>
        </nav>
      </div>
    );
  };

  const handleLogout = () => {
    // Perform any necessary cleanup or API calls here.
    dispatchRedux(logout());
    navigate("/");
  };
  return (
    <div>
      <Headers />
      <SideNavBar />
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          marginLeft: "230px",
        }}
      >
        {!showDashboard &&
          !showOrder &&
          !showProducts &&
          !showCustomer &&
          !showIntegrations && (
            <p className="adminhome">Welcome To AdminDashBoard</p>
          )}
        {showDashboard && (
          <div className="dashb">
            <DashBoard />
          </div>
        )}

        {showOrder && (
          <div className="order">
            <OrderDetails />
          </div>
        )}
        {showProducts && (
          <h2 className="products">
            <Productadmin />
          </h2>
        )}
        {showCustomer && (
          <div style={{ marginTop: "-230px", height: "250px" }}>
            <DashboardUser />
          </div>
        )}
        {showIntegrations && (
          <h2 style={{ marginTop: "-290px" }}>
            <ProductStore />
          </h2>
        )}
      </h1>
    </div>
  );
};

export default AdminDashBoard;

// i need fabars ,click on fabars open dashboard,order,product, and logout
