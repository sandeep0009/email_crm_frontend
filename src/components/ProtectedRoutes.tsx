import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


type ProtectedProps={
    children:React.ReactElement
}

const ProtectedRoutes=({children}:ProtectedProps)=>{
    const token=localStorage.getItem('token');
    const navigate=useNavigate();

    useEffect(()=>{
        if(!token){
            navigate('/signup')
        }

    },[navigate,token]);

    return children
    
}

export default ProtectedRoutes