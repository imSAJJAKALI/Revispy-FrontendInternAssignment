import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData) {
      setIsAuth(true); 
    } else {
      navigate("/login"); 
    }
  }, [navigate]); 

  
  if (!isAuth) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
