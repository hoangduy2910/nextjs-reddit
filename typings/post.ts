interface IPost {
  identifier: string;
  title: string;
  slug: string;
  body: string;
  community: {
    name: string;
  };
  user: {
    userName: string;
  };
  createdAt: string;

  // Virtual Fields
  url: string;
  voteScore: number;
  totalComment: number;
  userVote: number;
}

export default IPost;
