import React from "react";
import Link from "next/link";

import Post from "~/typings/post";
import ArrowUp from "~/public/icons/arrow-alt-up.svg";
import ArrowDown from "~/public/icons/arrow-alt-down.svg";

interface PostProps {
  post: Post;
}

const PostItem: React.FC<PostProps> = ({ post }) => {
  return (
    <div key={post.identifier} className="flex mb-4 bg-white rounded">
      {/* Vote */}
      <div className="w-10 py-3 text-center bg-gray-200 rounded-l cursor-pointer">
        {/* Up Vote */}
        <div className="w-6 mx-auto text-xs rounded hover:bg-gray-300">
          <ArrowUp
            className={`w-5 mx-auto fill-current opacity-90 hover:text-red-500 ${
              post.userVote === 1 ? "text-red-500" : "text-gray-400"
            }`}
          />
        </div>
        {/* Vote Score */}
        <p className="text-xs font-bold">{post.voteScore}</p>
        {/* Down Vote */}
        <div className="w-6 mx-auto text-xs rounded hover:bg-gray-300">
          <ArrowDown
            className={`w-5 mx-auto fill-current opacity-90 hover:text-blue-500 ${
              post.userVote === -1 ? "text-blue-500" : "text-gray-400"
            }`}
          />
        </div>
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
            <Link href={`/r/${post.url}`}>
              <a className="mx-1 hover:underline">{post.createdAt}</a>
            </Link>
          </p>
        </div>
        <Link href={`/r/${post.url}`}>
          <a className="my-1 text-lg font-medium">{post.title}</a>
        </Link>
        {post.body && <p className="my-1 text-sm">{post.body}</p>}
        <div className="flex">
          <Link href="/">
            <a>
              <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-100">
                <i className="fas fa-comment-alt fa-xs mr-1" />
                <span className="font-bold">{post.totalComment} Comments</span>
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
  );
};

export default PostItem;
