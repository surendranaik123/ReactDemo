import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Rating from "react-rating-stars-component";
import '../css/product.css'

export default function ProductStore({ onSubmit }) {
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState({ myFile: "" });
  // const [rating, setRating] = useState([]); // Initialize with 0 stars
  const [rating, setRating] = useState([0, 0, 0, 0, 0]);

  const [discount, setDiscount] = useState(0);
  // const [discountprice, setDiscountprice] = useState(0);

  const calculateDiscountedPrice = () => {
    const discountedPrice = price - (price * discount) / 100;
    return discountedPrice;
  };

  const currentDate = new Date();

  // Extract various components of the date
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const discountedPrice = calculateDiscountedPrice();

      console.log("Sending data:", {
        id,
        image,
        category,
        title,
        description,
        rating,
        price,
        discount,
        discountedPrice,
        date,
      });

      const categoryResponse = await axios.post(
        "http://localhost:9000/api/v1/productssave",
        {
          id,
          category,
          image,
          price,
          title,
          description,
          rating,
          discount,
          discountedPrice,
          date,
        }
      );
      alert("Success");
      console.log("Response from server:", categoryResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setImage({ ...image, myFile: base64 });
  };

  return (
    <>
      <Container >
        <div class="min-h-screen bg-white flex productadd">
          <div class="flex-1 flex flex-col py-12 px-4 sm:px-4 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">
              <form className="space-y-6 " onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="category-name form-label ">ProductId</label>
                  <input
                    className="form-control"
                    type="id"
                    id="id"
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category-name form-label ">Category</label>
                  <input
                    className="form-control"
                    type="text"
                    id="category-name"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    required
                  />
                </div>

                <label htmlFor="file-upload" className="custom-file-upload">
                  Image
                </label>

                <input
                  type="file"
                  lable="Image"
                  name="myFile"
                  id="file-upload"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleFileUpload(e)}
                />

                <div>
                  <label htmlFor="category-imageUrl">Price</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="title">Title:</label>
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="title">Description:</label>
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                  />
                </div>

                <div>
                  <label>
                    Ratings
                    <Rating
                      count={5}
                      value={rating}
                      onChange={(newRating) => setRating(newRating)}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </label>
                </div>

                <div>
                  <label htmlFor="category-originalPrice">Original Price</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Original Price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="category-discount">Discount Percentage</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Discount Percentage"
                    value={discount}
                    onChange={(event) => setDiscount(event.target.value)}
                  />
                </div>

                <div>
                  <label>Discounted Price</label>
                  <h2> ${calculateDiscountedPrice()}</h2>
                </div>

                <button
                  type="submit"
                  class=" w-full  bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                  Add Products
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
      <div class="container">
        <span id="rateMe1"></span>
      </div>
    </>
  );
}

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
