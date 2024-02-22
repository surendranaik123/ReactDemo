const { model, Schema, default: mongoose } = require("mongoose");

const forgetPasswordOtpSchema=new Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    OTP:{
        type:Number,
        required:true
    }
})

module.exports=model("forgetPasswordOtp",forgetPasswordOtpSchema)