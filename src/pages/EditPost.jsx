import React, { useEffect, useState } from "react";
import PostForm from "../components/postform/PostForm";
import Service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      Service.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      console.log("nothing")
      navigate("/");
    }
  }, [slug, navigate]);

  return post? (
    <PostForm post={post} />
  ):null
}

export default EditPost;
