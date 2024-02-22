const { SignupUserModel } = require("../model/userModel");
const forgetPasswordOtpModel=require("../model/forgetPasswordOtpModel")
const videos = require("../model/storeVideoModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const bcrypt=require("bcrypt");


//create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//for login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await SignupUserModel.login(email, password);

    // create a token
    const token = createToken(user._id);
    user.token = token;
    user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//for signup
const signupUser = async (req, res) => {
  const { name, email, password, address, contact } = req.body;

  try {
    const user = await SignupUserModel.signup(
      email,
      password,
      name,
      address,
      contact
    );
    // create a token
    const token = createToken(user._id);
    user.token = token;
    user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dineshlogan31@gmail.com",
        pass: "pjkv fzll lpjh wgtn",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const verifyHtmlPage = fs.readFileSync(
      path.join(__dirname, "../public/pages/verify.html"),
      "utf-8"
    );

    const verifyHtmlContent = verifyHtmlPage.replace("{{token}}", token);

    const mailContent = {
      from: "dineshlogan31@gmail.com",
      to: email,
      subject: "Test Email",
      html: verifyHtmlContent,
    };

    transporter.sendMail(mailContent, (err, info) => {
      if (err) throw err;
      console.log("Email send successfully");
    });
    res.status(200).json({ user, Msg: "Email send successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.params;
  const data = await jwt.verify(token, process.env.SECRET);
  const user = await SignupUserModel.findOne({ _id: data._id }).exec();
  if (!user) {
    res.json({ Msg: "User is not exist" });
  }
  user.verified = true;
  await user.save();
  return res.redirect("http://localhost:3000/login");
  // res.json({ Msg: "Account Verified Successfully" });
};

const postVideo = async (req, res) => {
  const videoUrl = fs.readFileSync(
    path.resolve(
      __dirname,
      "../public/videos/Complete MongoDB Tutorial #3 - Collections & Documents.mp4"
    )
  );
  const storedVideo = await videos.create({ videoUrl });

  res.json({ Msg: "Video Stored Successfully" });
};

const getVideo = async (req, res) => {
  const userId = "6511823287c347cce56902ab";
  const video = await videos.find({ _id: userId });
  res.setHeader("Content-Type", "video/mp4");
  res.send(video[0].videoUrl);
};


const forgotPassword = async(req,res) => {

  const {recoveryEmail}=req.body
  const {userId}=req.params
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dineshlogan31@gmail.com",
      pass: "pjkv fzll lpjh wgtn",
    },
    tls: {
      rejectUnauthorized: false,
    }
  });
let OTP=Math.floor(Math.random()*10000);
while(OTP < 999)
{
  OTP=Math.floor(Math.random()*10000)
}

const forgetPasswordRecovey = fs.readFileSync(
  path.join(__dirname, "../public/pages/forgetPassword.html"),
  "utf-8"
);

const forgetPasswordHtml=forgetPasswordRecovey.replace("{{OTP}}",OTP)
  const mailContent = {
    from: "dineshlogan31@gmail.com",
    to: recoveryEmail,
    subject: "Test Email",
    html: forgetPasswordHtml,
  };

  transporter.sendMail(mailContent, (err, info) => {
    if (err) throw err;
    console.log("Email send successfully");
  });
  const emailData=await forgetPasswordOtpModel.create({_id:userId,OTP:OTP})
  setTimeout(async()=>{
   await  forgetPasswordOtpModel.deleteOne({_id:userId})
   console.log("Otp deleted Successfully")
  },100000)
  res.status(200).json({Msg: "Email send successfully",data:emailData});
}

const resetPassword=async (req,res)=>{
  const {password}=req.body
  const {userId}=req.params
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user=await SignupUserModel.findById({_id:userId})
  user.password=hash
  await user.save();
  res.json({Msg:"Password reset Successfully",user})
}

const validateOtp=async (req,res)=>{
  const {userId}=req.params
  const {otp}=req.body
 
  try {
    const user=await forgetPasswordOtpModel.findById({_id:userId});
   
    if(!user)
    {
       throw Error("OTP expired")
    }
  if(user.OTP=== otp)
  {
    res.status(200).json({Msg:"Otp validated Successfully"})
  }
  else{
    throw Error("Invalid OTP")
  }
  } catch (err) {
    if(err)
    {
      res.status(400).json(err.message)
    }
  }
}






module.exports = { signupUser, loginUser, verifyUser, forgotPassword,getVideo,postVideo ,resetPassword,validateOtp};
