import React, { useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  console.log("sdgchsd",userData)
  useEffect(() => {
    if (slug) {
      console.log(slug)
      Service.getPost(slug).then((post) => {
        console.log(post)
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    Service.deletePost(post.$id).then((status) => {
      if (status) {
        Service.deleteFile(post.image);
        navigate("/");
      }
    });
  };
  console.log(post)
  return post? (
    <>
      <img src={Service.getFilePreview(post.image)} alt="" />
     <div className="edit-box">
     {isAuthor && (
      <div className="edit">
          <Link to={`/edit-post/${post.$id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={deletePost}>delete</button>
      </div>
        
      )}
     </div>
     <div className="content">
        {parse(post.content)}
     </div>
    </>
  ):null
}

export default Post;
