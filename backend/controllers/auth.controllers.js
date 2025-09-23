import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/genToken.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (!mobile || mobile.length < 10) {
      return res.status(400).json({ message: "Mobile number must be at least 10 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      mobile,
      role,
      password: hashedPassword,
    });
    const token = genToken(newUser._id);
    res.cookie("token",token,{
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
        httpOnly:true
    })
    return res.status(201).json(newUser);

   
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const signIn = async (req, res) => {
  try {
    const {email, password} = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not  exists" });
    }
const isMatched=await bcrypt.compare(password,existingUser.password)
if(!isMatched){
    return res.status(400).json({ message: "Invalid credentials" });
} 


    const token = genToken(newUser._id);
    res.cookie("token",token,{
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
        httpOnly:true
    })
    return res.status(200).json(newUser);

   
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Sign in error" });
  }
};
export const signOut=async(req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"Signout successfully"}) 
    }
    catch(error){
        console.error("Signout error:", error);
        return res.status(500).json({ message: "Sign out error" });
    } 
  }

export default signUp;
