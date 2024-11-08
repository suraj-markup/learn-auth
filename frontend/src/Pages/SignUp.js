import React,{useState} from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { handleSuccess, handleError }from "../utils/notification";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  var a="";
    const navigate=useNavigate();

    const [signupInfo,setSignupInfo]=useState({
        name: "",
        email:"",
        password:""
    });

    const handleChange=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        const copysignupinfo={...signupInfo};
        copysignupinfo[name]=value;
        setSignupInfo(copysignupinfo);
    }

    
    
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const{name,email,password}=signupInfo;
        if(!name || !email || !password){
            return handleError("Please Provide all the credentials"); 
        }
        try{
            const backendUrl = process.env.REACT_APP_BACKEND_API;
          
            const response= await fetch(`${backendUrl}/auth/signup`,{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupInfo),
                credentials:'include'
            })
            
            
            const result= await response.json();
            const {success,message}=result;
            if(success){
                handleSuccess(message);
                setTimeout(() =>{
                    navigate('/login');
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
      
        <h1 className="font-bold text-4xl">Sign Up</h1>
        <form className="" onSubmit={handleSubmit}>
          <div className="space-y-2 my-2">
            <label htmlFor="name" className="text-lg font-medium">Name</label>
            <input
            onChange={handleChange}
              name="name"
              type="text"
              placeholder="Enter your name ..."
              autoFocus
              className="border-2 border-gray-300 p-2 rounded-lg w-full"
              value={signupInfo.name}
            />
          </div>
          <div className="space-y-2 my-2">
            <label htmlFor="email" className="text-lg font-medium">E-Mail</label>
            <input
            onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter your email ..."
              className="border-2 border-gray-300 p-2 rounded-lg w-full"
              value={signupInfo.email}

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
              value={signupInfo.password}

            />
          </div>

          <button type="submit" className="border-2 border-gray-300 p-2 rounded-lg w-full my-5 bg-sky-700 text-white font-bold text-lg hover:bg-sky-900">Sign Up</button>
          <p className="text-center ">
            Already have an account?  
            <Link to="/login"><span className="mx-2">Login</span></Link>
          </p>
        </form>
    </div>
        <ToastContainer />
    </div>
  );
};

export default SignUp;
