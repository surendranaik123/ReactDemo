const express = require("express");
const {
  signupUser,
  loginUser,
  verifyUser,
  postVideo,
  getVideo,
  forgotPassword,
  resetPassword,
  validateOtp
} = require("../controller/userController");

const {
  category, subcategory, catsub, video, subvideo
} = require("../controller/categoryController")

const userRouter = express.Router();

//userlogin
userRouter.post("/userLogin", loginUser);

//signup
userRouter.post("/userSignup", signupUser);

//email verification
userRouter.get("/verifyUser/:token", verifyUser);

//store video
userRouter.get("/postVideo", postVideo);

userRouter.get("/getVideo", getVideo);


//reset password
userRouter.get("/reset-password", forgotPassword);

//category
userRouter.get("/categories", category);
userRouter.post("/categories", catsub);

// //subcategory

userRouter.get("/categories/:categoryId/subcategories", subcategory)

userRouter.post("/categories/:categoryId/subcategories", catsub);

//video
userRouter.get('/subcategories/:subcategoryId/videos', video);
userRouter.post('/subcategories/:subcategoryId/videos', subvideo);

userRouter.post("/forgetpasswordOTP/:userId",  forgotPassword);

//reset-password
userRouter.post("/reset-password/:userId",resetPassword);

userRouter.post("/validateOtp/:userId",validateOtp)
module.exports = userRouter;
