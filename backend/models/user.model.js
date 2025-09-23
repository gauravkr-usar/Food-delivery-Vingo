import mongoose from "mongoose";

const useSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","owner","deliveryBoy"],
        required:true
    }


},{timestamps:true}) 


const User=mongoose.model("User",useSchema);

export default User;