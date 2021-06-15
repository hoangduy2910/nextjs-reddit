import { GetServerSideProps } from "next";
import Head from "next/head";

import { PostService } from "~/services/post-service";
import Post from "~/typings/post";
import helpers from "~/utils/helpers";
import PostItem from "~/components/post-item";

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
              <PostItem key={post.identifier} post={post} />
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
