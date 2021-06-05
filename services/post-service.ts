import { BaseService } from "./base-service";
import { Post } from "~/typings/post";

export const PostService = {
  GetListPost: async () => {
    return await BaseService.Get("/posts");
  },
  CreatePost: async (post: Post) => {
    return await BaseService.Post("/posts", post);
  },
  DeletePost: async (postId) => {
    return await BaseService.Get("/posts");
  },
};
