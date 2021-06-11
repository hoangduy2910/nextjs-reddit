import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

import { Post } from "../typings/post";
import { PostService } from "~/services/post-service";
import helpers from "~/utils/helpers";

const Home = ({ posts }) => {
  return (
    <div className="pt-12">
      <Head>
        <title>reddit: the front page of the internet</title>
      </Head>
      <div className="container pt-4 flex">
        {/* Posts */}
        <div className="w-160">
          {posts &&
            posts.map((post: Post) => (
              <div key={post.identifier} className="flex mb-4 bg-white rounded">
                {/* Vote */}
                <div className="w-10 text-center bg-gray-200 rounded-l">
                  <p>V</p>
                </div>

                {/* Post Data */}
                <div className="w-full p-2">
                  <div className="flex items-center">
                    <Link href={`/r/${post.community.name}`}>
                      <React.Fragment>
                        <img
                          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                          className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                        />
                        <a className="text-xs font-bold hover:underline cursor-pointer">
                          r/{post.community.name}
                        </a>
                      </React.Fragment>
                    </Link>
                    <p className="text-xs text-gray-600">
                      <span className="mx-1">•</span>
                      <span>Posted by</span>
                      <Link href={`/u/user/${post.user.userName}`}>
                        <a className="mx-1 hover:underline">
                          u/user/{post.user.userName}
                        </a>
                      </Link>
                      <Link
                        href={`/r/${post.community.name}/${post.identifier}/${post.slug}`}
                      >
                        <a className="mx-1 hover:underline">{post.createdAt}</a>
                      </Link>
                    </p>
                  </div>
                  <Link
                    href={`/r/${post.community.name}/${post.identifier}/${post.slug}`}
                  >
                    <a className="my-1 text-lg font-medium">{post.title}</a>
                  </Link>
                  {post.body && <p className="my-1 text-sm">{post.body}</p>}
                  <div className="flex">
                    <Link href="/">
                      <a>
                        <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-100">
                          <i className="fas fa-comment-alt fa-xs mr-1" />
                          <span className="font-bold">20 Comments</span>
                        </div>
                      </a>
                    </Link>
                    <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-100">
                      <i className="fas fa-share fa-xs mr-1" />
                      <span className="font-bold">Share</span>
                    </div>
                    <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-100">
                      <i className="fas fa-bookmark fa-xs mr-1" />
                      <span className="font-bold">Save</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let posts = [];

  const res = await PostService.GetListPost();
  if (res.success) {
    posts = res.data.map((post: Post) => ({
      ...post,
      createdAt: helpers.getRelativeTime(post.createdAt),
    }));
  }

  return {
    props: {
      posts,
    },
  };
};

export default Home;
