import React from "react";

import { Post } from "typings/post";

const PostItem: React.FC<Post> = ({ body }) => {
  return (
    <div className="flex mb-4 bg-white rounded">
      {/* Vote Section - Left */}
      <div className="w-10 text-center bg-gray-200 rounded">
        <p>V</p>
      </div>

      {/* Post Section - Right */}
      <div className="w-full p-2">
        <p>{body}</p>
      </div>
    </div>
  );
};

export default PostItem;
