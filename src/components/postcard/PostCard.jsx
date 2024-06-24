import React from 'react'
import Service from "../../appwrite/config"
import "./postcard.css"
import {Link} from 'react-router-dom'

function PostCard({$id, title, image}) {
    
  return (
    
    <div className='postcard'>
    <Link className='Link' to={`/post/${$id}`}>
            <div className="imgCont">
                <img src={Service.getFilePreview(image)} alt={title}
                 />

            </div>
            <h2
            className=' title'
            >{title}</h2>
    </Link>
    </div>
  )
}


export default PostCard