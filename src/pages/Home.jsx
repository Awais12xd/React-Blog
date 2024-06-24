import React, { useEffect, useState } from "react";
import Service from "../appwrite/config";
import PostCard from "../components/postcard/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <>
        <h1 style={{minHeight:"300px",textAlign:"Center", paddingTop:"100px"}}>Login to read the Posts.....</h1>
      </>
    );
  }
  return (
    <div >
        <div className="post-page">
          {posts.map((post) => (
            <div className="post-page-card" key={post.$id} >
              <PostCard {...post} />
            </div>
          ))}
        </div>
    </div>
  );
}

export default Home;
