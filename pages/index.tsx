import React, { useState, useEffect } from "react";
import Head from "next/head";

import { Post } from "../typings/post";
import { PostService } from "~/services/post-service";
import post from "server/models/post";

const Home = (props) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {}, []);

  const getListPost = async () => {
    const [err, data] = await PostService.GetListPost();
    if (!err && data) {
      setPosts(data);
    }
  };

  return (
    <div className="pt-12">
      <Head>
        <title>reddit: the front page of the internet</title>
      </Head>
      <div className="container mx-auto pt-4 flex">
        <div className="w-96">
          {posts.map((post) => (
            <div key={post.indentifier}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
