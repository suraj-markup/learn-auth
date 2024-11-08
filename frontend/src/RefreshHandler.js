    import React,{useEffect} from 'react';
    import {useLocation,useNavigate} from 'react-router-dom';
    import Cookies from 'js-cookie';

    const RefreshHandler = ({setIsAuthenticated}) => {
        const location=useLocation();
        const navigate=useNavigate();
        const token=Cookies.get('authtoken');
        console.log(token);

        useEffect(()=>{
            if(token){
                setIsAuthenticated(true);
                if(location.pathname==='/' ||
                    location.pathname==='/login'||
                    location.pathname==='/signup'){
                        navigate('/home',{replace:false});
                    }   
            }
        },[location,navigate,setIsAuthenticated,token]);

    return (
        null
    )
    }

    export default RefreshHandler;