export interface Post {
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
  updatedAt: string;
}
