import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import RefreshHandler from './RefreshHandler'; 
import { ToastContainer } from "react-toastify";
import { handleError } from "../src/utils/notification";
import {useLocation,useNavigate} from 'react-router-dom';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location=useLocation();
  const navigate=useNavigate();



  const checkAuth = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_API;
      const response = await fetch(`${backendUrl}/test`, {
        method: "GET",
        credentials: 'include',  // Automatically send cookies
      });

      const result = await response.json();

      // Redirect based on path if authenticated
      if (
        (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') &&
        result.success
      ) {
        navigate('/home', { replace: false });
      }

      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      console.log("Auth check result:", result); 

    } catch (err) {
      handleError('Error during auth check');
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();  
  }, [location.pathname]);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="h-screen">
      
      <RefreshHandler setisAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
