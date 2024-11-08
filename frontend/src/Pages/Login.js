import React,{useState} from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { handleSuccess, handleError }from "../utils/notification";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate=useNavigate();

    const [loginInfo,setLoginInfo]=useState({
      
        email:"",
        password:""
    });

    const handleChange=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        const copylogininfo={...loginInfo};
        copylogininfo[name]=value;
        setLoginInfo(copylogininfo);
    }

    
    
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const{email,password}=loginInfo;
        if( !email || !password){
            return handleError("Please Provide all the credentials"); 
        }
        try{
            const backendUrl = process.env.REACT_APP_BACKEND_API;

            const response= await fetch(`${backendUrl}/auth/login`,{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo),
                credentials:'include'
            })
            
            console.log("result");
            const result= await response.json();
            const {success,message,email,jwtToken}=result;
            if(success){
                handleSuccess(message);
                setTimeout(() =>{
                    navigate('/home');
                },1000);
            }
            else{
                handleError(message);
            }
       
            console.log(result);

       

        }
        catch(err){
            handleError(err);

        }
    }

  return (
    <div className="h-screen flex flex-col justify-center  items-center">

    <div className="flex flex-col justify-center h-[75%] items-center w-6/12  m-auto gap-y-5">
      
        <h1 className="font-bold text-4xl">Log In</h1>
        <form className="" onSubmit={handleSubmit}>
          
          <div className="space-y-2 my-2">
            <label htmlFor="email" className="text-lg font-medium">E-Mail</label>
            <input
            onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter your email ..."
              className="border-2 border-gray-300 p-2 rounded-lg w-full"
              value={loginInfo.email}

            />
          </div>
          <div className="space-y-2 my-2">
            <label htmlFor="password" className="text-lg font-medium">Password</label>
            <input
            onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter your password ..."
              className="border-2 border-gray-300 p-2 rounded-lg w-full"
              value={loginInfo.password}

            />
          </div>

          <button type="submit" className="border-2 border-gray-300 p-2 rounded-lg w-full my-5 bg-sky-700 text-white font-bold text-lg hover:bg-sky-900">Login</button>
          <p className="text-center ">
            Doesn't have an account?  
            <Link to="/signup"><span className="mx-2">Sign Up</span></Link>
          </p>
        </form>
    </div>
        <ToastContainer />
    </div>
  );
};

export default Login;
