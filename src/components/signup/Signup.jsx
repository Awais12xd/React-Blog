import React, { useState } from "react";
import authService from "../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import Input from "../input/Input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import './signup.css'

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      
      if (userData) {
        const userData = await authService.getCurrentStatus();
        console.log(userData)
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      
    }
  };
  return (
    <>
      <form className="form-cont" onSubmit={handleSubmit(create)}>
        <div className="cont-1">
          <h2>
            BLOGIFY<span>.</span>
          </h2>
          <h3>Sign up to create account</h3>
          <p>
            Already have an account?
            <button type="submit" onClick={() => navigate("/login")}>
              Sign in
            </button>
          </p>
          {error && <p className="error">{error}</p>}
        </div>
        <div className="cont-2">
          <Input
            label="Full Name: "
            placeholder="Enter your full name"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            label="Email: "
            placeholder="Email Address"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />
          <button 
         
          type="submit">Create Account</button>
        </div>
      </form>
    </>
  );
}

export default Signup;
