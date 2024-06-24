import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login,logout } from "./store/authSlice";

import  Header  from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { useRef } from "react";
import { Outlet } from 'react-router-dom'




function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const selectRef= useRef()

  useEffect(() => {
    authService
      .getCurrentStatus()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        }else{
        dispatch(logout())
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if(!loading){
    return (
      <>
     <Header /> 
        <Outlet/>
  <Footer/>
      </>
    )
  }else (null)

}

export default App;
