// Generral
const SERVER_ERROR = "Something went wrong.";

// Token
const UNAUTHENTICATION = "Unauthentication.";
const TOKEN_INVALID = "Invalid Token.";

// User
const EMAIL_EMPTY = "Email must not be empty.";
const EMAIL_INVALID = "Invalid Email.";
const EMAIL_EXIST = "Email already existed.";

const USERNAME_EMPTY = "Username must not be empty.";
const USERNAME_EXIST = "Username already existed.";

const PASWORD_EMPTY = "Password must not be empty.";
const PASSWORD_MIN_LENGTH = "Password more than 6 character";
const PASSWORD_INVALID = "Invalid Password.";
const PASSWORD_NOT_MATCH = "Password and Confirm password do not match.";

const CONFIRM_PASWORD_EMPTY = "Confirm password must not be empty.";
const CONFIRM_PASWORD_MIN_LENGTH = "Confirm password more than 6 character.";

const USER_NOT_EXIST = "User does not exist.";

// Post
const POST_NOT_EXIST = "Post does not exist.";
const POST_TITLE_EMPTY = "Post title must not be empty.";
const POST_BODY_EMPTY = "Post body must not be empty.";

// Community
const COMMUNITY_NOT_EXIST = "Community does not exist.";
const COMMUNITY_NAME_EMPTY = "Community name must not be empty.";
const COMMUNITY_NAME_EXIST = "Community name already existed.";

// Comment
const COMMENT_BODY_EMPTY = "Comment body must not be empty.";

// Vote
const VOTE_VALUE_INVALID = "Vote value must be -1, 0 or 1.";
const VOTE_OBJECT_INVALID = "Invalid vote object";
const VOTE_NOT_EXIST = "Vote does not exis";

export default {
  UNAUTHENTICATION,
  TOKEN_INVALID,
  SERVER_ERROR,
  EMAIL_EMPTY,
  EMAIL_INVALID,
  EMAIL_EXIST,
  USERNAME_EMPTY,
  USERNAME_EXIST,
  PASWORD_EMPTY,
  PASSWORD_MIN_LENGTH,
  PASSWORD_INVALID,
  PASSWORD_NOT_MATCH,
  CONFIRM_PASWORD_EMPTY,
  CONFIRM_PASWORD_MIN_LENGTH,
  USER_NOT_EXIST,
  POST_NOT_EXIST,
  POST_TITLE_EMPTY,
  POST_BODY_EMPTY,
  COMMUNITY_NAME_EMPTY,
  COMMUNITY_NAME_EXIST,
  COMMUNITY_NOT_EXIST,
  COMMENT_BODY_EMPTY,
  VOTE_VALUE_INVALID,
  VOTE_OBJECT_INVALID,
  VOTE_NOT_EXIST,
};
