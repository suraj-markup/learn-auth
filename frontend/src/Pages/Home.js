import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { handleSuccess, handleError } from "../utils/notification";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    // const [authToken, setAuthToken] = useState(null);
    const navigate = useNavigate();
    

    // useEffect(() => {
    //     const token = Cookies.get('authtoken');  // Use the correct cookie name
    //     setAuthToken(token);
    //     console.log("Token fetched from cookies:", token);  // For debugging
    // }, []);

    const handleLogout = async () => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_API;
            const response = await fetch(`${backendUrl}/auth/logout`, {
                method: 'GET',
                credentials: 'include',
            });

            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
               
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                handleError('Logout failed');
            }
        } catch (err) {
            handleError('Server error while logging out');
        }
    };

    const fetchProducts = async () => {
       

        try {
            const backendUrl = process.env.REACT_APP_BACKEND_API;
            const response = await fetch(`${backendUrl}/products`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${authToken}`,  // Use the token
                },
                credentials: 'include'
            });

            const result = await response.json();
            setProducts(result);
            console.log("Fetched products:", result);  // For debugging
        } catch (err) {
            handleError('Error fetching products');
        }
    };

    useEffect(() => {
        
            fetchProducts();  // Fetch products only after the token is available
        
    }, []);  // Run when authToken changes

    return (
        <div className='flex flex-col items-center justify-center'>
            <button 
                type="submit" 
                onClick={handleLogout} 
                className="border-2 border-gray-300 p-2 rounded-lg w-4/12 my-5 bg-sky-700 text-white font-bold text-lg hover:bg-sky-900"
            >
                Log Out
            </button>

            <div>
                {products.map((product, index) => (
                    <div key={index} className="flex  w-full ">
                        <h1 className="font-bold text-2xl">{product.name}</h1>
                        <p className="font-bold text-2xl">{product.description} : {product.price}</p>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Home;
