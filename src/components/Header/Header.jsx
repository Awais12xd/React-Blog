import React,{useRef} from "react"
import './header.css'
import { Link} from "react-router-dom";
import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import {useNavigate} from 'react-router-dom'
import { logout } from "../../store/authSlice";


function Header() {
 
  const navigate = useNavigate()
const authStatus = useSelector((state) => state.auth.status)
const dispatch = useDispatch()
const logoutHandler = () => {
    authService.logout().then(() => {
        dispatch(logout())
    })
  }

const navItems= [
  {
    name:'Home',
    slug:'/',
    active:true
  },
  {
    name: 'Login',
    slug: '/login',
    active:!authStatus
  },
  {
    name: 'Signup',
    slug: '/signup',
    active:!authStatus
  },
  {
    name: 'All posts',
    slug: '/all-posts',
    active:authStatus
  },
  {
    name: "Add Post",
    slug: "/add-post",
    active: authStatus,
}
]
const inputRef = useRef();

  return(
    <>
    <div className="max-width">
    <nav>
      
        <div className="logo-cont">
          <Link to='#' className="logo">
            BLOGIFY<span>.</span>
          </Link>
        </div>
        <div className="links">
          <ul>
            {
              navItems.map((item) => item.active? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                >
                {item.name}
                </button>
              </li>
              ):null)
            }
            {authStatus && (
              <li>
                <button onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      
    </nav>
    </div>
    </>
  )
}

export default Header;