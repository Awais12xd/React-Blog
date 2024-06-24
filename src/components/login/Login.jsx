import React , {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import { login as sliceLogin } from "../../store/authSlice";
import Input from "../input/Input";
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {useForm} from 'react-hook-form'
import './login.css'


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState("")
    const login = async(data) => {
        setError("")
            try{
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentStatus()
                console.log(userData)
                if(userData) dispatch(sliceLogin(userData))
                    navigate("/")
            }
            } catch (error) {
                setError(error.messege)
            }
        
    }
    return(
        <>
        <form className="login-cont" onSubmit={handleSubmit(login)}>
            <div className="cont-1">
                <h2>
                    BLOGIFY<span>.</span>
                </h2>
                <h3>Sign in to your account</h3>
                <p>Don't have an account? 
                <button
                type="submit"
                onClick={() =>  navigate("/signup")}
                > Sign up </button>
                    </p>
                    {error && <p className="">{error}</p>}

            </div>
            <div className="cont-2">
                <Input
                label='Email: '
                placeholder="Email Address"
                type="email"
                {...register("email" , {
                    required:true,
                    validate:{
                        matchPattern:(value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }

                })

                }
                />
                <Input 
                label="Password: "
                type="password"
                placeholder= "Password"
                {...register("password",{
                    required:true,
                })}
                />
                <button
               
                type="submit">
                    Sign in
                </button>
            </div>
        </form>
        </>
    )
}

export default Login;
