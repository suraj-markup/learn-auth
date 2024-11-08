const userModel=require('../Models/user');
const {hashPassword, matchPassword}=require('../utils/bcrypt');
const jwt=require('jsonwebtoken');
const generateToken =require('../utils/generateToken');

const signup =async (req,res)=>{
    const {name,email,password}=req.body;

    if(!name||!email||!password) return res.status(400).json({message:'Please provide all the fields'});

    if(password.length<6) return res.status(400).json({message:'Password must be atleast 6 characters long'});
    try{

        const userExist=await userModel.findOne({email});
        if(userExist) return res.status(400).json({message:"User already exists"});
        const hashedPassword=await hashPassword(password);
        const newUser=new userModel({name,email,password:hashedPassword});
        let response= (await newUser.save()).toObject();
        // delete response.password;
        console.log(response);
        res.status(200).json({message:"User created successfully ", data:response,success:true});

    }
    catch(err){
        res.status(500).json({message:"Error creating user", error:err.message,success:false});

    }
}


const login = async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password) return res.status(400).json({message:"Please enter email and password"});

    try {

        const user= await userModel.findOne({email});
        const errMsg="Auth failed email or password is incorrect";
        if(!user) return res.status(404).json({message:errMsg,success:false});

        const isMatch=await matchPassword(password,user.password);
        if(!isMatch) return res.status(404).json({message:"Invalid Credentials"});
        const jwtToken=generateToken(res,user._id);
        let response = user.toObject();
        console.log(response);
        delete response.password;
        res.status(200).json({
             message: "User logged in successfully",
             success:true,
             jwtToken,
             email,
             data: response 
            });


    }
    catch(err){
        return res.status(400).json({message: "Server error", error: err.message });
    }
}

const logout = async (req, res) => {
    res.clearCookie('authtoken', {
        httpOnly: true,
        secure: false, 
        sameSite: 'lax',
        path: '/',  
    });

    res.status(200).json({ message: 'Logged out successfully', success: true });
};
module.exports={signup,login,logout};