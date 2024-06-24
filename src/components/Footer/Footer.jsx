import React, { useState } from "react";
import "./footer.css";
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Footer() {
    const authStatus = useSelector((state) => state.auth.status)
const navigate= useNavigate()

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
const [arrow,setArrow] = useState(">");
const [Msg ,setMsg] = useState("")
const msg = () => {
    alert("Thanks for sending Messege")
    setMsg("")
}
  return (
    <>
      <div className="footer-cont">
        <div className="footer-width">
          <div className="box-1 box">
            <div className="box-1-1">
              BLOGIFY<span>.</span>
            </div>
            <div className="box-1-2">
              A108 Adam Street New York,NY 5723654 United States
            </div>
            <div className="box-1-3">
              <span>Phone:</span>+8 9837 889374 <br />
              <span>Email:</span>Info@Example.com
            </div>
          </div>
          <div className="box box-2">
            <div className="box-2-1">
                Useful Links
            </div>
            <div className="box-2-2">
                <ul>
                {
              navItems.map((item) => item.active? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                >
               <span>{arrow}</span>{item.name}
                </button>
              </li>
              ):null)
            }
                </ul>
            </div>
          </div>
          <div className="box box-3">
            <div className="box-3-1">
                More Projects
            </div>
            <div className="box-3-2">
                <ul>
                    <li>
                    <a href="#"  rel="noopener noreferrer"><span>{arrow}</span> Generate Password</a>

                    </li>
                    <li>
                    <a href="#"  rel="noopener noreferrer"><span>{arrow}</span> Todo-List</a>

                    </li>
                    <li>
                    <a href="#"  rel="noopener noreferrer"><span>{arrow}</span> React Router</a>

                    </li>
                    <li>
                    <a href="#"  rel="noopener noreferrer"><span>{arrow}</span> Currency Convertor </a>

                    </li>
                </ul>
            </div>
          </div>
          <div className="box box-4">
            <div className="box-4-1">
                Contact Me
            </div>
            <div className="box-4-2">
                <input onChange={(e) => setMsg(e.target.value)} value={Msg} type="text" placeholder="Your text...." />
                <button onClick={msg}>
                    Send Messege
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
