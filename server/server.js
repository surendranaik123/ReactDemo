const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");

require("dotenv").config();

//create an app instance for express server
const app = express();

//express middlewares
app.use(express.json());
app.use(cors());

//routers
app.use("/", userRouter);

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listening the server
    app.listen(process.env.PORT, () => {
      console.log(
        `Database connected && Server is running on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
 

