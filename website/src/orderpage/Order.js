import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/order.css";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Rating from "react-rating-stars-component";

const Order = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const { id } = useParams();
  const [placeDetails, setPlaceDetails] = useState({
    username: user ? user.fname : "Guest",
    name: "",
    addres: "",
    phoneno: "",
    productid: id,
    producttitle: "",
    productqty: 1,
    totalPrice: 0,

    image: "",
  });
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const [orderDetails, setOrderDetails] = useState({
    quantity: 1,
    totalPrice: 0,
  });

  // Create a new Date object representing the current date and time
  const currentDate = new Date();

  // Extract various components of the date
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const DeliveryDate = `${day + 5}-${month}-${year}`;

  const [image, setImage] = useState({ myFile: "" });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setImage({ ...image, myFile: base64 });
  };

  // const handleQuantityChange = (e) => {
  //   const newQuantity = parseInt(e.target.value, 10);
  //   const newTotalPrice = (newQuantity * product.price).toFixed(2);

  //   setOrderDetails({
  //     ...orderDetails,
  //     quantity: newQuantity,
  //     totalPrice: newTotalPrice,
  //   });

  //   setPlaceDetails({
  //     ...placeDetails,
  //     productqty: newQuantity,
  //     totalPrice: newTotalPrice,
  //   });
  // };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);

    // Calculate the new total price based on the product's price and quantity
    const newTotalPrice = (newQuantity * product.price).toFixed(2);

    // Update orderDetails and placeDetails with the new quantity and total price
    setOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      quantity: newQuantity,
      totalPrice: newTotalPrice,
    }));

    setPlaceDetails((prevPlaceDetails) => ({
      ...prevPlaceDetails,
      productqty: newQuantity,
      totalPrice: newTotalPrice,
    }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );

        setProduct(response.data);

        // Update placeDetails with product information
        setPlaceDetails((prevDetails) => ({
          ...prevDetails,
          producttitle: response.data.title,
          image: response.data.image,
          totalPrice: (response.data.price * orderDetails.quantity).toFixed(2),
        }));

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id, orderDetails.quantity, setPlaceDetails, setLoading]);

  useEffect(() => {
    if (product.price !== undefined) {
      const newTotalPrice = orderDetails.quantity * product.price;
      setPlaceDetails((prevDetails) => ({
        ...prevDetails,
        totalPrice: newTotalPrice.toFixed(2),
      }));
    }
  }, [orderDetails.quantity, product.price]);

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axios.post(`http://localhost:9000/api/v1/order`, placeDetails);
  //     console.log("ddd", placeDetails);
  //     alert("Success");
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert("An error occurred while submitting the form.");
  //   }
  // };

  const validateForm = () => {
    const errors = {};

    if (!placeDetails.username) {
      errors.username = "Username is required";
    }
    if (!placeDetails.name) {
      errors.name = "Name is required";
    }
    if (!placeDetails.addres) {
      errors.addres = "Address is required";
    }
    if (!placeDetails.phoneno) {
      errors.phoneno = "Phone number is required";
    }
    if (!placeDetails.productqty || placeDetails.productqty < 1) {
      errors.productqty = "Quantity should be at least 1";
    }

    if (
      !placeDetails.username &&
      !placeDetails.name &&
      !placeDetails.addres &&
      !placeDetails.phoneno &&
      (!placeDetails.productqty || placeDetails.productqty < 1)
    ) {
      alert("Please fill in at least one field");
    }

    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      if (errors.username) alert(errors.username);
      if (errors.name) alert(errors.name);
      if (errors.addres) alert(errors.addres);
      if (errors.phoneno) alert(errors.phoneno);
      if (errors.productqty) alert(errors.productqty);
      return;
    }

    try {
      await axios.post(`http://localhost:9000/api/v1/order`, placeDetails);
      alert("Success");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };
  
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div style={{ margin: "20px" }}>
      <Navbar />
      {/* <h5>UserName: "{UserName}"</h5> */}
      <div>
        <h3 className="h31">Order Page</h3>
      </div>
      <form onSubmit={handleFormSubmit} className="order-page">
        {/* User Details */}
        <div>
          <h6
            style={{
              color: "Red",
              textAlign: "center",
              padding: "10px",
              fontSize: "1.3rem",
              fontWeight: "bold",
            }}
          >
            User Details
          </h6>
        </div>
        <div className="mb-3">
          <label htmlFor="emailplaceDetails" className="form-label">
            UserName
          </label>
          <input
            type="username"
            name="username"
            value={placeDetails.username}
            onChange={(e) =>
              setPlaceDetails({
                ...placeDetails,
                [e.target.name]: e.target.value,
              })
            }
            className="form-control"
            id="username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            name="name"
            value={placeDetails.name}
            onChange={(e) =>
              setPlaceDetails({
                ...placeDetails,
                [e.target.name]: e.target.value,
              })
            }
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="addres" className="form-label">
            Address
          </label>
          <input
            name="addres"
            value={placeDetails.addres}
            onChange={(e) =>
              setPlaceDetails({
                ...placeDetails,
                [e.target.name]: e.target.value,
              })
            }
            type="text"
            className="form-control"
            id="addres"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneno" className="form-label">
            PhoneNo
          </label>
          <input
            name="phoneno"
            value={placeDetails.phoneno}
            onChange={(e) =>
              setPlaceDetails({
                ...placeDetails,
                [e.target.name]: e.target.value,
              })
            }
            type="text"
            className="form-control"
            id="phoneno"
          />
        </div>
        <div
          style={{
            borderBottom: "10px solid #f2f2f2",
            marginBottom: "20px",
            width: "100%",
          }}
        ></div>

        <div className="productde" style={{ display: "flex" }}>
          <h6
            style={{
              color: "green",
              textAlign: "center",
              padding: "10px",
              fontSize: "1.3rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Product Details
          </h6>
        </div>
        <div className="oder">
          <img
            src={product.image}
            alt={product.title} // Provide a meaningful description here
            className="img1"
            type="file"
            label="Image"
            name="myFile"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
          />
          <h5
            className="title1"
            onChange={(e) =>
              setPlaceDetails({
                ...placeDetails,
                [e.target.name]: e.target.value,
              })
            }
          >
            {product.title}
          </h5>
          <div className="price1">
            <div
              style={{
                color: "black",
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "-4px",
              }}
            >
              Price:$
            </div>
            <h5> {product.price}</h5>
          </div>

          <div className="rating1">
            <h1
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              Rating:
            </h1>
            <Rating
              count={5}
              value={product.rating.rate}
              size={24}
              activeColor="green"
            />
          </div>
        </div>
        <div className="qty">
          <label style={{ marginLeft: "20px", marginRight: "40px" }}>
            Quantity:
            <input
              style={{
                padding: "5px",
                paddingLeft: "15px",
                width: "60px",
                borderRadius: "10px",
              }}
              type="number"
              value={orderDetails.quantity}
              onChange={handleQuantityChange}
              min="1"
              name="quantity"
            />
          </label>
          <label>
            Total Price:
            <input
              style={{
                padding: "5px",
                paddingLeft: "15px",
                width: "80px",
                borderRadius: "5px",
              }}
              type="text"
              value={orderDetails.totalPrice}
              id="totalPrice"
              readOnly
            />
          </label>
        </div>
        <div
          className="date"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "20px",
          }}
        >
          <div className="delivery">
            <div style={{ display: "flex", width: "180px" }}>
              <label>Delivery by: </label>
              <h2
                style={{ marginTop: "3px" }}
                onChange={(e) =>
                  setPlaceDetails({
                    ...placeDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                {DeliveryDate}
              </h2>
              <div
                style={{
                  borderBottom: "25px solid #000",
                  width: "1%",
                  marginLeft: "10px",
                }}
              ></div>

              {/* <input
              name="date"
              value={DeliveryDate}
              onChange={(e) =>
                setPlaceDetails({
                  ...placeDetails,
                  [e.target.name]: e.target.value,
                })
              }
              className="form-control"
              id="date"
            /> */}
            </div>
            <div style={{ display: "flex", marginLeft: "10px" }}>
              <label style={{ textDecoration: "line-through" }}> $40</label>
              <label style={{ color: "green", marginLeft: "10px" }}>
                Free Delivery
              </label>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button type="submit" className="placeorder">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Order;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
