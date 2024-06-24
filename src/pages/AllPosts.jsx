import React, { useState } from "react";
import PostCard from "../components/postcard/PostCard";
import Service from "../appwrite/config";
import "../pages.css"

function AllPosts() {
  const [posts, setPosts] = useState([]);

  Service.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });

  return (
    <>
      <div className="post-page" >
        {posts.map((post) => (
          <div  key={post.$id} className="post-page-card">
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </>
  );
}

export default AllPosts;
